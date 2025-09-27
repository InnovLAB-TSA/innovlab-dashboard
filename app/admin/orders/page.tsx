import { OrdersManagement } from "@/components/admin/orders-management"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AdminOrdersPage() {
  return (
    <DashboardLayout userRole="admin">
      <OrdersManagement />
    </DashboardLayout>
  )
}
