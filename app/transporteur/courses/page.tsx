import { AvailableCourses } from "@/components/transporteur/available-courses"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function TransporteurCoursesPage() {
  return (
    <DashboardLayout userRole="transporteur">
      <AvailableCourses />
    </DashboardLayout>
  )
}
