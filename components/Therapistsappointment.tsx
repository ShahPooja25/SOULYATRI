"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TherapistsAppointmentProps {
  onBack?: () => void;
}

interface Appointment {
  id: number;
  clientName: string;
  date: string;
  time: string;
  status: string;
  mode: string;
  sessionCount: number;
  notes: string;
}

const TherapistsAppointment = ({ onBack }: TherapistsAppointmentProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const appointments: Appointment[] = [
    {
      id: 1,
      clientName: "Priya Sharma",
      date: "2024-07-08",
      time: "10:00 AM",
      status: "Confirmed",
      mode: "Video",
      sessionCount: 5,
      notes: "Discuss stress coping strategies",
    },
    {
      id: 2,
      clientName: "Aarav Mehta",
      date: "2024-07-09",
      time: "02:00 PM",
      status: "Pending",
      mode: "In-Person",
      sessionCount: 3,
      notes: "Evaluate relationship dynamics",
    },
    {
      id: 3,
      clientName: "Riya Kapoor",
      date: "2024-07-10",
      time: "11:30 AM",
      status: "Completed",
      mode: "Video",
      sessionCount: 7,
      notes: "Feedback on anxiety management",
    },
  ];

  const filteredAppointments = appointments.filter((appt) =>
    appt.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAppointment = (id: number): void => {
    setSelectedAppointmentId(id);
  };

  const handleViewDetails = (): void => {
    if (selectedAppointmentId !== null) {
      const appointment = appointments.find((appt) => appt.id === selectedAppointmentId);
      if (appointment) {
        alert(
          `Client: ${appointment.clientName}\nDate: ${appointment.date}\nTime: ${appointment.time}\nStatus: ${appointment.status}\nMode: ${appointment.mode}\nSessions: ${appointment.sessionCount}\nNotes: ${appointment.notes}`
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <Input
          placeholder="Search by client name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.map((appt) => (
          <div
            key={appt.id}
            className={`p-4 rounded-lg shadow-sm border ${
              selectedAppointmentId === appt.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handleSelectAppointment(appt.id)}
          >
            <p className="font-semibold">{appt.clientName}</p>
            <p className="text-sm text-gray-600">{appt.date} at {appt.time}</p>
            <p className="text-sm">Status: {appt.status}</p>
            <p className="text-sm">Mode: {appt.mode}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <Button onClick={handleViewDetails} disabled={selectedAppointmentId === null}>
          View Details
        </Button>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default TherapistsAppointment;
