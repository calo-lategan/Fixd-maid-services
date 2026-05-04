from fastapi import FastAPI, APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os, asyncio, logging, resend, jwt, requests, uuid
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
JWT_SECRET = os.environ.get('JWT_SECRET', 'fixd_secret')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Fixd@Admin2024')

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ─── Auth ──────────────────────────────────────────────────────────────────────

def create_token(data: dict) -> str:
    payload = {**data, "exp": datetime.now(timezone.utc) + timedelta(hours=24)}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

async def require_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Not authorized")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


# ─── Models ────────────────────────────────────────────────────────────────────

class AdminLoginRequest(BaseModel):
    password: str

class ContactSubmission(BaseModel):
    name: str
    phone: str
    service: str
    preferred_date: Optional[str] = ""
    preferred_time: Optional[str] = ""
    message: Optional[str] = ""

class SettingsUpdate(BaseModel):
    phone: Optional[str] = "050 924 4492"
    whatsapp: Optional[str] = "971509244492"
    notification_email: Optional[str] = ""
    business_hours: Optional[str] = "Open · Closes 8 PM"
    address: Optional[str] = "Stadium Point Building, Office 512, Dubai Sports City, Dubai"

class PasswordChange(BaseModel):
    new_password: str

class GoogleCredentials(BaseModel):
    client_id: str
    client_secret: str


# ─── Helpers ───────────────────────────────────────────────────────────────────

DEFAULT_SETTINGS = {
    "phone": "050 924 4492",
    "whatsapp": "971509244492",
    "notification_email": "",
    "business_hours": "Open · Closes 8 PM",
    "address": "Stadium Point Building, Office 512, Dubai Sports City, Dubai",
}

async def get_settings() -> dict:
    doc = await db.settings.find_one({"key": "business"}, {"_id": 0})
    return doc.get("value", DEFAULT_SETTINGS) if doc else DEFAULT_SETTINGS

def build_calendar_link(data: ContactSubmission) -> str:
    import urllib.parse
    title = urllib.parse.quote(f"Fixd Maid Services — {data.service}")
    details = urllib.parse.quote(f"Service: {data.service}\nCustomer: {data.name}\nPhone: {data.phone}")
    location = urllib.parse.quote("Dubai Sports City, Dubai, UAE")
    date_str = data.preferred_date.replace("-", "") if data.preferred_date else ""
    time_str = ""
    if date_str and data.preferred_time:
        try:
            t = datetime.strptime(data.preferred_time.strip(), "%I:%M %p")
            start = f"{date_str}T{t.strftime('%H%M%S')}"
            from datetime import timedelta as td
            end = (datetime.strptime(start, "%Y%m%dT%H%M%S") + td(hours=3)).strftime("%Y%m%dT%H%M%S")
            time_str = f"&dates={start}/{end}"
        except Exception:
            pass
    return f"https://calendar.google.com/calendar/render?action=TEMPLATE&text={title}&details={details}&location={location}{time_str}"

async def create_gcal_event(data: ContactSubmission):
    from google.oauth2.credentials import Credentials
    from googleapiclient.discovery import build
    from google.auth.transport.requests import Request as GRequest
    try:
        doc = await db.settings.find_one({"key": "gcal_tokens"}, {"_id": 0})
        gcred = await db.settings.find_one({"key": "google_credentials"}, {"_id": 0})
        if not doc or not gcred:
            return
        tokens = doc["value"]
        creds = Credentials(
            token=tokens.get("access_token"),
            refresh_token=tokens.get("refresh_token"),
            token_uri="https://oauth2.googleapis.com/token",
            client_id=gcred["value"]["client_id"],
            client_secret=gcred["value"]["client_secret"],
        )
        if creds.expired and creds.refresh_token:
            creds.refresh(GRequest())
            await db.settings.update_one({"key": "gcal_tokens"}, {"$set": {"value.access_token": creds.token}})

        date_str = data.preferred_date or datetime.now(timezone.utc).strftime("%Y-%m-%d")
        time_val = data.preferred_time or "09:00 AM"
        try:
            t = datetime.strptime(time_val.strip(), "%I:%M %p")
            start_dt = f"{date_str}T{t.strftime('%H:%M:%S')}+04:00"
            from datetime import timedelta as td
            end_t = (t + td(hours=3)).strftime("%H:%M:%S")
            end_dt = f"{date_str}T{end_t}+04:00"
        except Exception:
            start_dt = f"{date_str}T09:00:00+04:00"
            end_dt = f"{date_str}T12:00:00+04:00"

        service = build("calendar", "v3", credentials=creds)
        event = {
            "summary": f"Fixd Booking — {data.service} ({data.name})",
            "description": f"Customer: {data.name}\nPhone: {data.phone}\nService: {data.service}" + (f"\nNotes: {data.message}" if data.message else ""),
            "location": "Dubai, UAE",
            "start": {"dateTime": start_dt},
            "end": {"dateTime": end_dt},
        }
        service.events().insert(calendarId="primary", body=event).execute()
        logger.info("Google Calendar event created")
    except Exception as e:
        logger.warning(f"Calendar event creation failed: {e}")

async def send_email_notification(data: ContactSubmission):
    settings = await get_settings()
    email_to = settings.get("notification_email", "")
    if not resend.api_key or not email_to:
        return
    booking_rows = ""
    if data.preferred_date:
        booking_rows += f"<tr><td><b>Date</b></td><td>{data.preferred_date}</td></tr>"
    if data.preferred_time:
        booking_rows += f"<tr><td><b>Time</b></td><td>{data.preferred_time}</td></tr>"
    html = f"""<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:24px;border-radius:12px">
      <div style="background:#0284C7;padding:20px;border-radius:8px;margin-bottom:20px;text-align:center">
        <h2 style="color:white;margin:0">New Booking — Fixd Maid Services</h2>
      </div>
      <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e2e8f0">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#64748b;width:120px"><b>Name</b></td><td>{data.name}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b"><b>Phone</b></td><td>{data.phone}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b"><b>Service</b></td><td>{data.service}</td></tr>
          {booking_rows}
          {"<tr><td style='padding:6px 0;color:#64748b'><b>Message</b></td><td>" + data.message + "</td></tr>" if data.message else ""}
        </table>
        <hr style="border:1px solid #e2e8f0;margin:16px 0">
        <p style="color:#64748b;font-size:12px">Submitted: {datetime.now(timezone.utc).strftime('%d %b %Y, %H:%M UTC')}</p>
      </div>
      <div style="text-align:center;margin-top:16px">
        <a href="https://wa.me/{settings.get('whatsapp','971509244492')}?text=Hi+{data.name.replace(' ','+')}%2C+confirming+your+booking+for+{data.service.replace(' ','+')}"
           style="background:#25D366;color:white;padding:12px 24px;border-radius:24px;text-decoration:none;font-weight:bold;font-size:14px">
          Reply on WhatsApp
        </a>
      </div>
    </div>"""
    try:
        await asyncio.to_thread(resend.Emails.send, {
            "from": SENDER_EMAIL, "to": [email_to],
            "subject": f"New Booking: {data.name} — {data.service}", "html": html,
        })
        logger.info(f"Email sent to {email_to}")
    except Exception as e:
        logger.warning(f"Email failed: {e}")


# ─── Public Routes ─────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Fixd Maid Services API"}

@api_router.get("/settings")
async def public_settings():
    s = await get_settings()
    return {k: s[k] for k in ["phone", "whatsapp", "business_hours", "address"]}

@api_router.post("/contact")
async def submit_contact(data: ContactSubmission):
    doc = data.model_dump()
    doc.update({"created_at": datetime.now(timezone.utc).isoformat(), "id": str(uuid.uuid4()), "status": "new"})
    await db.contact_submissions.insert_one(doc)
    asyncio.create_task(send_email_notification(data))
    asyncio.create_task(create_gcal_event(data))
    return {"success": True, "message": "Booking received!", "calendar_link": build_calendar_link(data)}


# ─── Admin Auth ────────────────────────────────────────────────────────────────

@api_router.post("/admin/login")
async def admin_login(req: AdminLoginRequest):
    doc = await db.settings.find_one({"key": "admin_password"})
    stored = doc["value"] if doc else ADMIN_PASSWORD
    if req.password != stored:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"token": create_token({"role": "admin"}), "success": True}

@api_router.post("/admin/change-password")
async def change_password(req: PasswordChange, _=Depends(require_admin)):
    await db.settings.update_one({"key": "admin_password"}, {"$set": {"value": req.new_password}}, upsert=True)
    return {"success": True}


# ─── Admin Settings ────────────────────────────────────────────────────────────

@api_router.get("/admin/settings")
async def admin_get_settings(_=Depends(require_admin)):
    return await get_settings()

@api_router.put("/admin/settings")
async def admin_update_settings(data: SettingsUpdate, _=Depends(require_admin)):
    await db.settings.update_one({"key": "business"}, {"$set": {"value": data.model_dump()}}, upsert=True)
    return {"success": True}


# ─── Admin Contacts ────────────────────────────────────────────────────────────

@api_router.get("/admin/contacts")
async def admin_get_contacts(_=Depends(require_admin)):
    contacts = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return contacts

@api_router.put("/admin/contacts/{contact_id}")
async def update_contact_status(contact_id: str, body: dict, _=Depends(require_admin)):
    await db.contact_submissions.update_one({"id": contact_id}, {"$set": {"status": body.get("status", "new")}})
    return {"success": True}


# ─── Google Calendar OAuth ─────────────────────────────────────────────────────

@api_router.get("/admin/calendar/status")
async def cal_status(_=Depends(require_admin)):
    gcred = await db.settings.find_one({"key": "google_credentials"})
    tokens = await db.settings.find_one({"key": "gcal_tokens"})
    return {
        "credentials_set": bool(gcred),
        "connected": bool(tokens and tokens.get("value", {}).get("refresh_token")),
    }

@api_router.post("/admin/calendar/credentials")
async def save_cal_credentials(data: GoogleCredentials, _=Depends(require_admin)):
    await db.settings.update_one({"key": "google_credentials"},
        {"$set": {"value": {"client_id": data.client_id, "client_secret": data.client_secret}}}, upsert=True)
    return {"success": True}

@api_router.get("/admin/calendar/connect")
async def cal_connect(token: str):
    try:
        jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(401, "Invalid token")
    gcred = await db.settings.find_one({"key": "google_credentials"})
    if not gcred:
        raise HTTPException(400, "Google credentials not configured")
    c = gcred["value"]
    BACKEND = os.environ.get("REACT_APP_BACKEND_URL", "")
    params = {
        "client_id": c["client_id"],
        "redirect_uri": f"{BACKEND}/api/admin/calendar/callback",
        "response_type": "code",
        "scope": "https://www.googleapis.com/auth/calendar",
        "access_type": "offline",
        "prompt": "consent",
        "state": token,
    }
    auth_url = "https://accounts.google.com/o/oauth2/v2/auth?" + "&".join(f"{k}={requests.utils.quote(str(v))}" for k, v in params.items())
    return RedirectResponse(auth_url)

@api_router.get("/admin/calendar/callback")
async def cal_callback(code: str, state: str = ""):
    gcred = await db.settings.find_one({"key": "google_credentials"})
    if not gcred:
        raise HTTPException(400, "Credentials not configured")
    c = gcred["value"]
    BACKEND = os.environ.get("REACT_APP_BACKEND_URL", "")
    FRONTEND = os.environ.get("FRONTEND_URL", BACKEND)
    resp = requests.post("https://oauth2.googleapis.com/token", data={
        "code": code, "client_id": c["client_id"], "client_secret": c["client_secret"],
        "redirect_uri": f"{BACKEND}/api/admin/calendar/callback", "grant_type": "authorization_code",
    }).json()
    if "error" in resp:
        return RedirectResponse(f"{FRONTEND}/admin?cal_error={resp['error']}")
    await db.settings.update_one({"key": "gcal_tokens"}, {"$set": {"value": resp}}, upsert=True)
    return RedirectResponse(f"{FRONTEND}/admin?cal_connected=true")

@api_router.delete("/admin/calendar/disconnect")
async def cal_disconnect(_=Depends(require_admin)):
    await db.settings.delete_one({"key": "gcal_tokens"})
    return {"success": True}


# ─── App setup ─────────────────────────────────────────────────────────────────

app.include_router(api_router)
app.add_middleware(CORSMiddleware, allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"], allow_headers=["*"])

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
