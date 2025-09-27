import { UsersManagement } from "@/components/admin/users-management"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AdminUsersPage() {
  return (
    <DashboardLayout userRole="admin">
      <UsersManagement />
    </DashboardLayout>
  )
}
