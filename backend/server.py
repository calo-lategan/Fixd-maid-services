from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

resend.api_key = os.environ.get('RESEND_API_KEY', '')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ─── Models ────────────────────────────────────────────────────────────────────

class ContactSubmission(BaseModel):
    name: str
    phone: str
    service: str
    preferred_date: Optional[str] = ""
    preferred_time: Optional[str] = ""
    message: Optional[str] = ""


class ContactResponse(BaseModel):
    success: bool
    message: str
    calendar_link: Optional[str] = None


# ─── Helpers ───────────────────────────────────────────────────────────────────

def build_calendar_link(data: ContactSubmission) -> str:
    """Generate a Google Calendar 'add event' link for the booking."""
    import urllib.parse
    title = urllib.parse.quote(f"Fixd Maid Services — {data.service}")
    details = urllib.parse.quote(
        f"Service: {data.service}\nCustomer: {data.name}\nPhone: {data.phone}"
        + (f"\nNotes: {data.message}" if data.message else "")
    )
    location = urllib.parse.quote("Dubai Sports City, Dubai, UAE")
    date_str = data.preferred_date.replace("-", "") if data.preferred_date else ""
    time_str = data.preferred_time.replace(":", "").replace(" ", "") if data.preferred_time else ""

    if date_str and time_str:
        # Parse time (e.g. "09:00 AM" → "090000")
        try:
            from datetime import datetime as dt
            t = dt.strptime(data.preferred_time.strip(), "%I:%M %p")
            start = f"{date_str}T{t.strftime('%H%M%S')}"
            # Assume 3-hour booking
            from datetime import timedelta
            end_dt = dt.strptime(start, "%Y%m%dT%H%M%S") + timedelta(hours=3)
            end = end_dt.strftime("%Y%m%dT%H%M%S")
        except Exception:
            start = f"{date_str}T090000"
            end = f"{date_str}T120000"
    else:
        start = ""
        end = ""

    dates = f"{start}/{end}" if start and end else ""
    params = f"action=TEMPLATE&text={title}&details={details}&location={location}"
    if dates:
        params += f"&dates={dates}"
    return f"https://calendar.google.com/calendar/render?{params}"


async def send_email_notification(data: ContactSubmission):
    """Send email notification to business owner. Silently skips if not configured."""
    if not resend.api_key or not NOTIFICATION_EMAIL:
        logger.info("Email notification skipped — RESEND_API_KEY or NOTIFICATION_EMAIL not set.")
        return

    booking_info = ""
    if data.preferred_date:
        booking_info += f"<p><strong>Date:</strong> {data.preferred_date}</p>"
    if data.preferred_time:
        booking_info += f"<p><strong>Time:</strong> {data.preferred_time}</p>"

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:24px;border-radius:12px">
      <div style="background:#0284C7;padding:20px;border-radius:8px;margin-bottom:20px;text-align:center">
        <h2 style="color:white;margin:0;font-size:20px">New Booking Request — Fixd Maid Services</h2>
      </div>
      <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e2e8f0">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Service:</strong> {data.service}</p>
        {booking_info}
        {"<p><strong>Message:</strong> " + data.message + "</p>" if data.message else ""}
        <hr style="border:1px solid #e2e8f0;margin:16px 0">
        <p style="color:#64748b;font-size:13px">Submitted: {datetime.now(timezone.utc).strftime('%d %b %Y, %H:%M UTC')}</p>
      </div>
      <div style="text-align:center;margin-top:16px">
        <a href="https://wa.me/971509244492?text=Hi+{data.name.replace(' ', '+')}" 
           style="background:#25D366;color:white;padding:12px 24px;border-radius:24px;text-decoration:none;font-weight:bold">
          Reply on WhatsApp
        </a>
      </div>
    </div>
    """

    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": f"New Booking: {data.name} — {data.service}",
        "html": html,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent to {NOTIFICATION_EMAIL}")
    except Exception as e:
        logger.warning(f"Email notification failed: {e}")


# ─── Routes ────────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Fixd Maid Services API"}


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactSubmission):
    doc = data.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["id"] = str(uuid.uuid4())
    await db.contact_submissions.insert_one(doc)

    # Fire email notification (non-blocking)
    asyncio.create_task(send_email_notification(data))

    calendar_link = build_calendar_link(data)
    return {
        "success": True,
        "message": "Thank you! We'll contact you shortly.",
        "calendar_link": calendar_link,
    }


# ─── App setup ─────────────────────────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
