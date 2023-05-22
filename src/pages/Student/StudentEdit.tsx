import { useEffect } from "react"
import { useStore } from "../../stores/store"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom";
import { DashboardProfile } from "../Dashboard/DashboardProfile";
import Card from "../Card";

function StudentEdit() {
  const { studentId } = useParams()
  const { userStore } = useStore()
  const { load_users, get_user_by_id, user } = userStore

  useEffect(() => {
    load_users();
    get_user_by_id(studentId || null)
  }, [load_users, get_user_by_id, studentId])

  return (
    <>
      <div className='flex flex-col-reverse gap-3 lg:grid lg:grid-cols-12'>
        <div className="flex flex-wrap col-span-9 gap-3">
          <Card header="O level Result" details="Dowload student o level result " />
          <Card header="Jamb Result" details="Dowload student o level result " />
          <Card header="Jamb Acceptance Letter" details="Dowload student o level result " />
          <Card header="Convenant University Acceptance letter" details="Dowload student o level result " />
          <Card header="Birth certificate" details="Dowload student o level result " />
          <Card header="Academic reference letter" details="Dowload student o level result " />
          <Card header="matriculation oath" details="Dowload student o level result " />
        </div>
        <DashboardProfile user={user} />
      </div>
    </>
  )
}

export default observer(StudentEdit)