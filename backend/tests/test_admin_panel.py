"""Backend tests for Fixd Admin Panel - admin login, contacts, settings, calendar"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = "Fixd@Admin2024"

@pytest.fixture(scope="module")
def token():
    resp = requests.post(f"{BASE_URL}/api/admin/login", json={"password": ADMIN_PASSWORD})
    assert resp.status_code == 200
    return resp.json()["token"]

@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}

# Admin Login
class TestAdminLogin:
    def test_login_correct_password(self):
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"password": ADMIN_PASSWORD})
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "token" in data
        assert len(data["token"]) > 10

    def test_login_wrong_password(self):
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"password": "wrongpass"})
        assert resp.status_code == 401
        data = resp.json()
        assert "detail" in data

    def test_login_empty_password(self):
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"password": ""})
        assert resp.status_code == 401

# Public Settings
class TestPublicSettings:
    def test_get_public_settings(self):
        resp = requests.get(f"{BASE_URL}/api/settings")
        assert resp.status_code == 200
        data = resp.json()
        assert "phone" in data
        assert "whatsapp" in data
        assert "business_hours" in data
        assert "address" in data
        # notification_email should NOT be in public settings
        assert "notification_email" not in data

# Admin Settings
class TestAdminSettings:
    def test_get_settings_requires_auth(self):
        resp = requests.get(f"{BASE_URL}/api/admin/settings")
        assert resp.status_code == 401

    def test_get_settings_with_auth(self, auth_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/settings", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "phone" in data
        assert "whatsapp" in data
        assert "notification_email" in data

    def test_update_settings(self, auth_headers):
        payload = {
            "phone": "050 999 1234",
            "whatsapp": "971509991234",
            "notification_email": "test@example.com",
            "business_hours": "Open 9AM-6PM",
            "address": "Dubai, UAE"
        }
        resp = requests.put(f"{BASE_URL}/api/admin/settings", json=payload, headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["success"] is True

        # Verify persisted
        get_resp = requests.get(f"{BASE_URL}/api/admin/settings", headers=auth_headers)
        assert get_resp.status_code == 200
        data = get_resp.json()
        assert data["phone"] == "050 999 1234"
        assert data["notification_email"] == "test@example.com"

    def test_restore_settings(self, auth_headers):
        """Restore original settings"""
        payload = {
            "phone": "050 924 4492",
            "whatsapp": "971509244492",
            "notification_email": "",
            "business_hours": "Open · Closes 8 PM",
            "address": "Stadium Point Building, Office 512, Dubai Sports City, Dubai"
        }
        resp = requests.put(f"{BASE_URL}/api/admin/settings", json=payload, headers=auth_headers)
        assert resp.status_code == 200

# Admin Contacts
class TestAdminContacts:
    def test_get_contacts_requires_auth(self):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert resp.status_code == 401

    def test_get_contacts_with_auth(self, auth_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)

    def test_contact_submission_and_retrieve(self, auth_headers):
        # Submit contact
        contact = {
            "name": "TEST_Admin Panel Test",
            "phone": "0501234567",
            "service": "Standard Cleaning",
            "preferred_date": "2025-03-01",
            "preferred_time": "10:00 AM",
            "message": "Test booking"
        }
        post_resp = requests.post(f"{BASE_URL}/api/contact", json=contact)
        assert post_resp.status_code == 200
        data = post_resp.json()
        assert data["success"] is True
        assert "calendar_link" in data
        assert "calendar.google.com" in data["calendar_link"]

        # Verify it appears in admin contacts
        get_resp = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        contacts = get_resp.json()
        names = [c["name"] for c in contacts]
        assert "TEST_Admin Panel Test" in names

# Calendar Status
class TestCalendarStatus:
    def test_calendar_status(self, auth_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/calendar/status", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "credentials_set" in data
        assert "connected" in data
        assert isinstance(data["credentials_set"], bool)
        assert isinstance(data["connected"], bool)

    def test_calendar_status_requires_auth(self):
        resp = requests.get(f"{BASE_URL}/api/admin/calendar/status")
        assert resp.status_code == 401
