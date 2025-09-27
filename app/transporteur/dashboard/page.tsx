import { TransporteurDashboard } from "@/components/transporteur/transporteur-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function TransporteurDashboardPage() {
  return (
    <DashboardLayout userRole="transporteur">
      <TransporteurDashboard />
    </DashboardLayout>
  )
}
