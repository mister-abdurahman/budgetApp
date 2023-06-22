import './style.css'
import { useStore } from '../../../data/stores/store'
import { IStudent } from '../../../data/stores/studentStore'
import { MdDocumentScanner } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { StudentProfile } from './StudentProfile'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

function StudentDashboard() {
  const {
    authStore: { user },
    studentStore: { student, get_student_by_user_id, }
  } = useStore()

  useEffect(() => {
    get_student_by_user_id(user.id)

  }, [get_student_by_user_id, user.id])


  return (
    <div className='flex flex-col-reverse gap-5 lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))]'>
      <DashboardStat user={student} />
      <StudentProfile user={student} />
    </div>
  )
}

export default observer(StudentDashboard)

interface IDashboardStatProps {
  user: IStudent
}

export const DashboardStat = ({ user }: IDashboardStatProps) => {
  const {
    studentStore: { MENUS }
  } = useStore()


  return (
    <div className='col-span-9 space-y-4 lg:space-x-4'>
      <div className='space-y-2'>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Welcome Back, {user?.firstName} {user?.lastName}!
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          pick a level to view, download or upload document
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {MENUS.map((x, index) => (
          <Link key={index} className="flex gap-4 p-2 bg-white rounded-md shadow-lg w-80" to={x.url}>
            <div className="grid w-20 h-20 text-white rounded-md bg-neutral place-items-center aspect-square"><MdDocumentScanner size={30} /></div>
            <div className="grow">
              <h1 className="text-2xl font-bold grow">{x.title}</h1>
              <p className="mt-1.5 text-sm text-gray-500">
                download or upload document for alpha and omega semester
              </p>
            </div>
          </Link>
        ))}
        {/* <CloudinaryWidgetUpload /> */}
      </div>
      {/* <div className='flex flex-wrap justify-around gap-5'>
        {levels.map((level, index) => {
          return (
            <Stat key={index}>
              {level.semesters.map((semester, index) => {
                return (
                  <StatCell key={index} title={`${level.level} level`} value={`${semester.name}`} desc="" icon={<div className="radial-progress cs-progress">{semester.progess.toString()}%</div>
                  } />
                )
              })}
            </Stat>
          )
        })}
      </div> */}
    </div>
  )
}

// export const levels = [
//   {
//     level: "100",
//     semesters: [
//       {
//         name: "Alpha",
//         progess: 60
//       },
//       {
//         name: "Omega",
//         progess: 70
//       }
//     ]
//   },
//   {
//     level: "200",
//     semesters: [
//       {
//         name: "Alpha",
//         progess: 55
//       },
//       {
//         name: "Omega",
//         progess: 70
//       }
//     ]
//   },
//   {
//     level: "300",
//     semesters: [
//       {
//         name: "Alpha",
//         progess: 60
//       },
//       {
//         name: "Omega",
//         progess: 70
//       }
//     ]
//   },
//   {
//     level: "400",
//     semesters: [
//       {
//         name: "Alpha",
//         progess: 60
//       },
//       {
//         name: "Omega",
//         progess: 70
//       }
//     ]
//   },
//   {
//     level: "500",
//     semesters: [
//       {
//         name: "Alpha",
//         progess: 60
//       },
//       {
//         name: "Omega",
//         progess: 80
//       }
//     ]
//   }
// ]
