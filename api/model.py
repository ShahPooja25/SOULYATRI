from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional

# ---------- USER ----------
class User(BaseModel):
    id: Optional[str] = Field(default=None)
    name: str
    email: EmailStr
    password: str  # 🔐 password field added
    role: str  # "therapist" or "patient"
    therapist_id: Optional[str] = None

# ---------- ITEM ----------
class Item(BaseModel):
    id: Optional[str] = Field(default=None)
    name: str
    description: str

# ---------- BOOKING ----------
class Booking(BaseModel):
    id: Optional[str] = Field(default=None)
    user_id: str
    item_id: str
    start_time: datetime
    end_time: datetime

# ---------- JOURNAL ----------
class Journal(BaseModel):
    id: Optional[str] = Field(default=None)
    user_id: str
    therapist_id: str
    content: str
    created_at: Optional[datetime] = None

# ---------- AI Request ----------
class AIRequest(BaseModel):
    message: str
