"use client";

import { useState, useEffect } from "react";

export default function BookingPage() {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("");

  const userId = "665d3b88269a4392ebc66cef"; // dummy patient user ID

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/")
      .then((res) => res.json())
      .then((data) => {
        const therapistsOnly = data.filter((u: any) => u.role === "therapist");
        setTherapists(therapistsOnly);
      });
  }, []);

  const handleBooking = async () => {
    const res = await fetch("http://127.0.0.1:8000/bookings/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        item_id: selectedTherapist,
        start_time: startTime,
        end_time: endTime,
      }),
    });

    if (res.ok) {
      setStatus("✅ Booking successful!");
    } else {
      const err = await res.json();
      setStatus("❌ " + err.detail);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Book a Session</h1>

      <select
        className="border p-2 w-full"
        value={selectedTherapist}
        onChange={(e) => setSelectedTherapist(e.target.value)}
      >
        <option value="">Select Therapist</option>
        {therapists.map((t: any) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      <div>
        <label className="block">Start Time</label>
        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div>
        <label className="block">End Time</label>
        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </main>
  );
}
