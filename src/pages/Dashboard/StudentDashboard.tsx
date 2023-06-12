import Stat, { StatCell } from '../../components/Stat/Stat'
import './style.css'
import { useStore } from '../../data/stores/store'
import { DashboardProfile } from './DashboardProfile'
import { IUser } from '../../data/stores/authStore'

function StudentDashboard() {
  const { authStore } = useStore()
  const { user } = authStore

  return (
      <div className='flex flex-col-reverse gap-3 lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))]'>
        <DashboardStat user={user} />
        <DashboardProfile user={user} />
      </div>
  )
}

export default StudentDashboard

interface IDashboardStatProps {
  user: IUser | null
}

export const DashboardStat = ({ user }: IDashboardStatProps) => {
  const levels = [
    {
      level: "100",
      semesters: [
        {
          name: "Alpha",
          progess: 60
        },
        {
          name: "Omega",
          progess: 70
        }
      ]
    },
    {
      level: "200",
      semesters: [
        {
          name: "Alpha",
          progess: 55
        },
        {
          name: "Omega",
          progess: 70
        }
      ]
    },
    {
      level: "300",
      semesters: [
        {
          name: "Alpha",
          progess: 60
        },
        {
          name: "Omega",
          progess: 70
        }
      ]
    },
    {
      level: "400",
      semesters: [
        {
          name: "Alpha",
          progess: 60
        },
        {
          name: "Omega",
          progess: 70
        }
      ]
    },
    {
      level: "500",
      semesters: [
        {
          name: "Alpha",
          progess: 60
        },
        {
          name: "Omega",
          progess: 80
        }
      ]
    }
  ]

  return (
    <div className='col-span-10 space-y-4 lg:space-x-4'>
      <div className='space-y-2'>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, {user?.firstName} {user?.lastName}!
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            pick a level to view, download or upload document
          </p>
      </div>
      <div className='flex flex-wrap justify-around gap-5'>
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
      </div>
    </div>
  )
}
