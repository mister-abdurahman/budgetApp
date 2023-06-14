import { useStore } from "../../data/stores/store"
import AdminDashboard from "./AdminDashboard"
import AdvisorDashboard from "./AdvisorDashboard"
import StudentDashboard from "../StudentDashboard/StudentDashboard"

function Dashboard() {
  const { authStore: { hasRole } } = useStore()

  const ROLES = {
    admin: "admin",
    student: "student",
    advisor: "advisor",
  }

  if (hasRole(ROLES.admin)) {
    return <AdminDashboard />
  }else if (hasRole(ROLES.advisor)) {
    return <AdvisorDashboard />
  }else if (hasRole(ROLES.student)) {
    return <StudentDashboard />
  }else{
    return <div>Unauthorized</div>
  }  
}

export default Dashboard