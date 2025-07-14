"use client";

import dynamic from "next/dynamic";

// Dynamically import the UserDashboard to prevent SSR issues
const UserDashboard = dynamic(() => import("@/components/userdash"), {
  ssr: false,
});

export default function UserDashboardPage() {
  return <UserDashboard />;
}
