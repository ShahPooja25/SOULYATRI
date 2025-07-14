"use client";

import dynamic from "next/dynamic";

// Dynamically import the dashboard with SSR disabled
const TherapistDashboard = dynamic(() => import("@/components/therapistsdashboard"), {
  ssr: false,
});

export default function TherapistDashboardPage() {
  return <TherapistDashboard />;
}
