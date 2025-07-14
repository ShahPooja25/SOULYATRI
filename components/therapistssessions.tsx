"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TherapistSessionRecordsProps {
  onBack?: () => void;
}

interface SessionRecord {
  id: number;
  clientName: string;
  sessionDate: string;
  sessionType: string;
  numberOfSessions: number;
  videoRecording: string;
  suggestedExercises: string;
  report: string;
  notesSummary: string;
  download: string;
}

const TherapistSessionRecords: React.FC<TherapistSessionRecordsProps> = ({
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("all");

  const sessionRecords: SessionRecord[] = [
    {
      id: 1,
      clientName: "Sophia Carter",
      sessionDate: "2024-07-20",
      sessionType: "Video",
      numberOfSessions: 5,
      videoRecording: "View",
      suggestedExercises: "Breathing exercises, mindfulness app",
      report: "Download",
      notesSummary: "Reviewed progress on anxiety management techniques.",
      download: "Download",
    },
    {
      id: 2,
      clientName: "Ethan Bennett",
      sessionDate: "2024-07-18",
      sessionType: "In-Person",
      numberOfSessions: 3,
      videoRecording: "N/A",
      suggestedExercises: "Career assessment tools, time management tools",
      report: "Download",
      notesSummary:
        "Discussed career goals and strategies for work-life balance.",
      download: "Download",
    },
    {
      id: 3,
      clientName: "Olivia Hayes",
      sessionDate: "2024-07-15",
      sessionType: "Video",
      numberOfSessions: 7,
      videoRecording: "View",
      suggestedExercises:
        "Communication skills workshop, relationship workbook",
      report: "Download",
      notesSummary:
        "Explored relationship dynamics and communication patterns.",
      download: "Download",
    },
    {
      id: 4,
      clientName: "Liam Foster",
      sessionDate: "2024-07-12",
      sessionType: "In-Person",
      numberOfSessions: 2,
      videoRecording: "N/A",
      suggestedExercises:
        "Grief support group information, coping strategies guide",
      report: "Download",
      notesSummary: "Addressed grief and loss, developed coping mechanisms.",
      download: "Download",
    },
    {
      id: 5,
      clientName: "Ava Morgan",
      sessionDate: "2024-07-10",
      sessionType: "Video",
      numberOfSessions: 4,
      videoRecording: "View",
      suggestedExercises: "Stress reduction techniques, sleep hygiene tips",
      report: "Download",
      notesSummary:
        "Developed strategies for managing stress and improving sleep.",
      download: "Download",
    },
  ];

  const filteredRecords = sessionRecords.filter((record) => {
    const matchesSearch = record.clientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      sessionType === "all" ||
      record.sessionType.toLowerCase() === sessionType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-white p-6">
      {onBack && (
        <Button variant="outline" onClick={onBack} className="mb-4">
          ← Back
        </Button>
      )}

      <h2 className="text-2xl font-semibold mb-4">Session Records</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2"
        />
        <select
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="all">All Types</option>
          <option value="video">Video</option>
          <option value="in-person">In-Person</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Client</th>
              <th className="p-2">Date</th>
              <th className="p-2">Type</th>
              <th className="p-2">Sessions</th>
              <th className="p-2">Video</th>
              <th className="p-2">Exercises</th>
              <th className="p-2">Summary</th>
              <th className="p-2">Report</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-t">
                <td className="p-2">{record.clientName}</td>
                <td className="p-2">{record.sessionDate}</td>
                <td className="p-2">{record.sessionType}</td>
                <td className="p-2 text-center">{record.numberOfSessions}</td>
                <td className="p-2 text-blue-600 underline cursor-pointer">
                  {record.videoRecording}
                </td>
                <td className="p-2">{record.suggestedExercises}</td>
                <td className="p-2">{record.notesSummary}</td>
                <td className="p-2 text-blue-600 underline cursor-pointer">
                  {record.report}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRecords.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No session records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TherapistSessionRecords;
