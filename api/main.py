from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import User, Item, Booking, Journal, AIRequest
from datetime import datetime
from typing import List
from firebase_admin import credentials, firestore, initialize_app
import requests
import os

# Firebase Init
cred = credentials.Certificate(("soulyatri.json"))
initialize_app(cred)
db = firestore.client()

# FastAPI App
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load Knowledge Base
with open("knowledge_Base_soulyatri.md", "r", encoding="utf-8") as f:
    KNOWLEDGE_BASE = f.read()

TOGETHER_API_KEY = os.environ.get("TOGETHER_API_KEY", "tgp_v1_KFMUp7rN189kPSvQBCdhzBnoQqc5XZ3Ox5Zqw2nN48A")

def serialize_doc(doc):
    data = doc.to_dict()
    data["id"] = doc.id
    return data

# -------- USERS --------
@app.post("/users/", response_model=User)
def create_user(user: User):
    existing = db.collection("users").where("email", "==", user.email).get()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    doc_ref = db.collection("users").add(user.dict(exclude={"id"}))
    user.id = doc_ref[1].id
    return user

@app.post("/login")
def login(email: str, password: str):
    users = db.collection("users")
    query = users.where("email", "==", email).stream()
    for doc in query:
        user = doc.to_dict()
        if user["password"] == password:
            return {
                "id": doc.id,
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/users/", response_model=List[User])
def get_all_users():
    docs = db.collection("users").get()
    return [User(**serialize_doc(doc)) for doc in docs]

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: str):
    doc = db.collection("users").document(user_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**serialize_doc(doc))

@app.get("/therapists/", response_model=List[User])
def get_all_therapists():
    docs = db.collection("users").where("role", "==", "therapist").get()
    therapists = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        data["password"] = ""  # Or None, or just leave it out
        therapists.append(User(**data))
    return therapists

@app.get("/therapists/{therapist_id}/patients", response_model=List[User])
def get_patients_for_therapist(therapist_id: str):
    docs = db.collection("users").where("role", "==", "patient").where("therapist_id", "==", therapist_id).get()
    return [User(**serialize_doc(doc)) for doc in docs]

# -------- ITEMS --------
@app.post("/items/", response_model=Item)
def create_item(item: Item):
    doc_ref = db.collection("items").add(item.dict(exclude={"id"}))
    item.id = doc_ref[1].id
    return item

@app.get("/items/", response_model=List[Item])
def get_all_items():
    docs = db.collection("items").get()
    return [Item(**serialize_doc(doc)) for doc in docs]

@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: str):
    doc = db.collection("items").document(item_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Item not found")
    return Item(**serialize_doc(doc))

# -------- BOOKINGS --------
@app.post("/bookings/", response_model=Booking)
def create_booking(booking: Booking):
    bookings = db.collection("bookings") \
        .where("item_id", "==", booking.item_id) \
        .where("start_time", "<", booking.end_time.isoformat()) \
        .where("end_time", ">", booking.start_time.isoformat()) \
        .get()

    if bookings:
        raise HTTPException(status_code=400, detail="Time slot already booked")

    booking_dict = booking.dict(exclude={"id"})
    booking_dict["start_time"] = booking.start_time.isoformat()
    booking_dict["end_time"] = booking.end_time.isoformat()
    doc_ref = db.collection("bookings").add(booking_dict)
    booking.id = doc_ref[1].id
    return booking

@app.get("/bookings/", response_model=List[Booking])
def get_all_bookings():
    docs = db.collection("bookings").get()
    return [Booking(**serialize_doc(doc)) for doc in docs]

@app.get("/bookings/{booking_id}", response_model=Booking)
def get_booking(booking_id: str):
    doc = db.collection("bookings").document(booking_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Booking not found")
    return Booking(**serialize_doc(doc))

# -------- JOURNALS --------
@app.post("/journals/", response_model=Journal)
def create_journal(journal: Journal):
    journal_dict = journal.dict(exclude={"id"})
    journal_dict["created_at"] = datetime.utcnow().isoformat()
    doc_ref = db.collection("journals").add(journal_dict)
    journal.id = doc_ref[1].id
    return journal

@app.get("/journals/", response_model=List[Journal])
def get_all_journals():
    docs = db.collection("journals").get()
    return [Journal(**serialize_doc(doc)) for doc in docs]

# -------- AVAILABILITY --------
@app.get("/items/{item_id}/availability")
def check_availability(item_id: str, start_time: datetime, end_time: datetime):
    conflicts = db.collection("bookings") \
        .where("item_id", "==", item_id) \
        .where("start_time", "<", end_time.isoformat()) \
        .where("end_time", ">", start_time.isoformat()) \
        .get()
    return {"available": len(conflicts) == 0}

# -------- AI CHAT --------
@app.post("/ask-ai")
def ask_ai(req: AIRequest):
    system_prompt = f"""
You are SoulYatriBot, a warm, empathetic mental health assistant. Strictly use the following knowledge base. Don’t invent information.

Knowledge Base:
\"\"\"
{KNOWLEDGE_BASE}
\"\"\"
"""
    payload = {
        "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": req.message}
        ]
    }

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post("https://api.together.xyz/v1/chat/completions", json=payload, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="AI request failed")

    result = response.json()
    reply = result["choices"][0]["message"]["content"]
    return {"reply": reply}
