import { useEffect, useState } from "react"
import { useStore } from "../../stores/store"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom";
import { DashboardProfile } from "../Dashboard/DashboardProfile";
import Card from "../Card";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";

function StudentEdit() {
  const { studentId } = useParams()
  const { userStore } = useStore()
  const { load_users, get_user_by_id, user } = userStore

  useEffect(() => {
    load_users();
    get_user_by_id(studentId || null)
  }, [load_users, get_user_by_id, studentId])

  const [level, setLevel] = useState("100")
  console.log(level);

  return (
    <div className="space-y-5">
      <CheckboxGroup name="Level" data={uploads.map(x => `${x.level}`)} position="horizontal" type="radio" action={setLevel} />
      <div className='flex flex-col-reverse gap-3 lg:grid lg:grid-cols-12'>
        <div className="flex flex-wrap col-span-9 gap-3">
          {uploads.map((upload) => {
            if (upload["level"] === level) {
              return upload.documents.map((x, index) => <Card key={index} header={x.header} details={x.details} />)
            }
          })}
          {/* <Card header="Jamb Result" details="Dowload student jamb result " />
          <Card header="Jamb Acceptance Letter" details="Dowload student jamb acceptance letter " />
          <Card header="Convenant University Acceptance letter" details="Dowload student o level result " />
          <Card header="Birth certificate" details="Dowload student o level result " />
          <Card header="Academic reference letter" details="Dowload student o level result " />
          <Card header="matriculation oath" details="Dowload student o level result " /> */}
        </div>
        <DashboardProfile user={user} />
      </div>
    </div>
  )
}

interface IUpload {
  level: string;
  documents: { header: string, details: string }[]
}

export const uploads: IUpload[] = [
  {
    level: "100",
    documents: [
      {
        header: "O level Result",
        details: "Download student o level result"
      },
      {
        header: "Jamb Result",
        details: "Download student jamb result"
      },
      {
        header: "Jamb Acceptance Letter",
        details: "Download student jamb acceptance letter",
      },
      {
        header: "CU Acceptance letter",
        details: "Download student convenant university acceptance letter"
      },
      {
        header: "Birth certificate",
        details: "Download student Birth certificate"
      },
      {
        header: "Academic reference letter",
        details: "Download student academic reference letter"
      },
      {
        header: "matriculation oath",
        details: "Download student matriculation oath "
      },
    ]
  },
  {
    level: "200",
    documents: [
      {
        header: "Alpha Semester Course Registration",
        details: "Download student course registration"
      },
      {
        header: "Omega Semester Course Registration",
        details: "Download student course registration"
      },
    ]
  },
  {
    level: "300",
    documents: [
      {
        header: "Alpha Semester Course Registration",
        details: "Download student course registration"
      },
      {
        header: "Omega Semester Course Registration",
        details: "Download student course registration"
      },
    ]
  },
  {
    level: "400",
    documents: [
      {
        header: "Alpha Semester Course Registration",
        details: "Download student course registration"
      },
      {
        header: "Omega Semester Course Registration",
        details: "Download student course registration"
      },
    ]
  },
  {
    level: "500",
    documents: [
      {
        header: "Alpha Semester Course Registration",
        details: "Download student course registration"
      },
      {
        header: "Omega Semester Course Registration",
        details: "Download student course registration"
      },
    ]
  }
]

export default observer(StudentEdit)