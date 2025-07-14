import dynamic from "next/dynamic";

const AdminDashboard = dynamic(
  () => import("@/components/dashboards/admin/Admindash"),
  {
    ssr: false,
  },
);

export default function AdminPage() {
  return <AdminDashboard />;
}
