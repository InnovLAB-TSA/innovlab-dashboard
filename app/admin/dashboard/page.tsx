import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout userRole="admin">
      <AdminDashboard />
    </DashboardLayout>
  )
}
