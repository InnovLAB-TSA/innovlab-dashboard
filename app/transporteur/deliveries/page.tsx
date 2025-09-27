import { MyDeliveries } from "@/components/transporteur/my-deliveries"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function TransporteurDeliveriesPage() {
  return (
    <DashboardLayout userRole="transporteur">
      <MyDeliveries />
    </DashboardLayout>
  )
}
