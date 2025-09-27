import { AffreteurDashboard } from "@/components/affreteur/affreteur-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AffreteurDashboardPage() {
  return (
    <DashboardLayout userRole="affreteur">
      <AffreteurDashboard />
    </DashboardLayout>
  )
}
