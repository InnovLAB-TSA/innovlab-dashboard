import { OrderCreationFlow } from "@/components/affreteur/order-creation-flow"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function NewOrderPage() {
  return (
    <DashboardLayout userRole="affreteur">
      <OrderCreationFlow />
    </DashboardLayout>
  )
}
