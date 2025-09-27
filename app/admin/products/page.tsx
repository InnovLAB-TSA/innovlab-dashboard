import { ProductsManagement } from "@/components/admin/products-management"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AdminProductsPage() {
  return (
    <DashboardLayout userRole="admin">
      <ProductsManagement />
    </DashboardLayout>
  )
}
