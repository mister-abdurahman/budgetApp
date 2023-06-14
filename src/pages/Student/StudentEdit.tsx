import { useEffect, useState } from "react"
import { useStore } from "../../data/stores/store"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom";
import { DashboardProfile } from "../Dashboard/DashboardProfile";
import Card from "../Card";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";
import { StudentProfile } from "../StudentDashboard/StudentProfile";

function StudentEdit() {
  const { studentId } = useParams()
  const { userStore, studentDocumentStore, studentStore } = useStore()
  const { user } = userStore
  const { get_student_by_user_id, student } = studentStore
  const { get_student_document_by_userId, studentDocumentGroupArrays} = studentDocumentStore

  useEffect(() => {
    get_student_by_user_id(studentId || "")
    get_student_document_by_userId(studentId || "")

  }, [get_student_document_by_userId, studentId])

  const [level, setLevel] = useState("100")
  console.log(level);

  return (
    <div className="space-y-5">
      <CheckboxGroup header="Level" name="Level" data={uploads.map(x => `${x.level}`)} position="horizontal" type="radio" action={setLevel} />
      <div className='flex flex-col-reverse gap-3 lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))]'>
        <div className="flex flex-wrap justify-around col-span-9 gap-4">
          {studentDocumentGroupArrays.map((upload) => {
            if (upload["level"] === level) {
              return upload.documents.map((x, index) => <Card key={index} header={x.documentName} details={x.documentDetail} />)
            }
          })}          
        </div>
        <StudentProfile user={student} />
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