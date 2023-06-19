import { useEffect, useState } from "react"
import { useStore } from "../../data/stores/store"
import { observer } from "mobx-react-lite"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Card from "../Card";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";
import { BsPlus } from "react-icons/bs";
import { StudentProfile } from "../Student/StudentDashboard/StudentProfile";
import { HiRefresh } from "react-icons/hi";
import { BiDownArrowCircle } from "react-icons/bi";

function UploadEdit() {
  const { studentId } = useParams()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const { studentStore, studentDocumentStore, authStore } = useStore()
  const { user } = authStore
  const { get_student_by_user_id, student } = studentStore
  const { get_student_document_by_userId, upload_document, studentDocumentGroupArrays } = studentDocumentStore

  const [level, setLevel] = useState("100")
  const [documentID, setDocumentID] = useState(0)

  useEffect(() => {
    get_student_by_user_id(user?.id || "")
    get_student_document_by_userId(user?.id || "")

  }, [get_student_by_user_id, get_student_document_by_userId, searchParams, studentId, user?.id])

  const handleOnChange = (e: any) => {

    upload_document(documentID, e)
    .then(() => navigate(0))
  }

  return (
    <div className="space-y-5">
      <CheckboxGroup header="Level" name="Level" data={uploads.map(x => `${x.level}`)} position="horizontal" type="radio" action={setLevel} />
      <div className='flex flex-col-reverse gap-3 lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))]'>
        <div className="flex flex-wrap justify-around col-span-9 gap-4">
          {studentDocumentGroupArrays.map((upload) => {
            if (upload["level"] === level) {
              const files = upload.documents.map((document, index) => {                
                return <Card key={index} header={document.documentName} details={document.documentDetail}>

                  <input onChange={(e) => handleOnChange(e)} type="file"  id="upload" className="hidden" />
                  <label  onClick={() => setDocumentID(document.id || 0)} className="mt-5 btn btn-sm btn-block outline-dashed outline-offset-8" htmlFor="upload">{(document.documentUrl === null) ? <>Upload <BsPlus /></> : <>Re-Upload <HiRefresh /></>} </label>
                  {(document.documentUrl !== null) ? <a className="mt-5 btn btn-sm btn-block btn-success" href={document.documentUrl} download rel="noopener noreferrer" target="_blank">Download <BiDownArrowCircle /></a> : <></>}
                </Card>
              }
              )

              return files
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

export default observer(UploadEdit)