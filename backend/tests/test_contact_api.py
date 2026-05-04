import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Contact API tests for Fixd Maid Services

class TestContactAPI:
    """Tests for /api/contact endpoint"""

    def test_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert "message" in r.json()

    def test_contact_submission_success(self):
        payload = {
            "name": "TEST_John Doe",
            "phone": "+971501234567",
            "service": "Home Cleaning",
            "message": "I need weekly cleaning"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        assert "message" in data

    def test_contact_submission_no_message(self):
        """message is optional"""
        payload = {
            "name": "TEST_Jane Doe",
            "phone": "+971509876543",
            "service": "Deep Cleaning"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        assert r.json()["success"] is True

    def test_contact_submission_missing_required(self):
        """Missing required fields should return 422"""
        payload = {"name": "TEST_Missing"}
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_contact_submission_persisted(self):
        """Verify submitted contact appears in /api/contacts"""
        unique_name = "TEST_Persist_Check"
        payload = {
            "name": unique_name,
            "phone": "+971500000001",
            "service": "Office Cleaning",
            "message": "Persistence test"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200

        # Verify persisted
        contacts_r = requests.get(f"{BASE_URL}/api/contacts")
        assert contacts_r.status_code == 200
        contacts = contacts_r.json()
        names = [c["name"] for c in contacts]
        assert unique_name in names
