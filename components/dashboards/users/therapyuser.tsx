"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type Therapist = {
  id: string;
  name: string;
  email: string;
  specialization?: string;
  image?: string;
  bgColor?: string;
};

const TherapistBooking = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await fetch("http://localhost:8000/therapists");
        const data = await res.json();
        const coloredData = data.map((t: Therapist, idx: number) => ({
          ...t,
          bgColor: ["bg-orange-100", "bg-blue-100", "bg-gray-100", "bg-teal-100"][idx % 4],
          image: t.image || "https://via.placeholder.com/100",
        }));
        setTherapists(coloredData);
      } catch (err) {
        console.error("Failed to load therapists", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const filteredTherapists = therapists.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Therapy Session</h2>

      <Input
        placeholder="Search for therapists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {loading ? (
        <p className="text-center">Loading therapists...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredTherapists.map((therapist) => (
            <Card
              key={therapist.id}
              onClick={() => setSelectedTherapist(therapist)}
              className={`cursor-pointer transition-transform duration-200 hover:scale-105 ${
                selectedTherapist?.id === therapist.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader className={therapist.bgColor}>
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="rounded-full h-16 w-16 mx-auto mb-2 object-cover"
                />
                <CardTitle className="text-center">{therapist.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">{therapist.specialization || "Therapist"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTherapist && (
        <>
          <h3 className="text-xl font-semibold mb-4">
            Book with {selectedTherapist.name}
          </h3>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="mb-2 text-muted-foreground">Select Time:</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>

              <Button
                disabled={!selectedDate || !selectedTime}
                className="w-full"
                onClick={() => {
                  // Placeholder: You can wire this to your POST /book API
                  alert(
                    `Booking confirmed with ${selectedTherapist.name} on ${format(
                      selectedDate!,
                      "PPP"
                    )} at ${selectedTime}`
                  );
                }}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TherapistBooking;
