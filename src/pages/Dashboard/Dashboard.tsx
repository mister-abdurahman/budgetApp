import Stat, { StatCell } from '../../components/Stat/Stat'
import './style.css'
import Avatar from '../../components/Avatar/Avatar'
import { useStore } from '../../stores/store'

function Dashboard() {
  const { authStore } = useStore()
  const { user } = authStore

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, {user?.firstName} {user?.lastName}!
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            pick a level to view, download or upload document
          </p>
        </div>
      </div>
      <div className='flex flex-col-reverse gap-3 lg:grid lg:grid-cols-12'>
        <DashboardStat />
        <DashboardProfile />
      </div>
    </div>
  )
}

export default Dashboard



export const DashboardStat = () => {
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
    <div className='col-span-9 space-y-4 lg:space-x-4'>
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
  )
}

export const DashboardProfile = () => {
  const { authStore } = useStore()
  const { user } = authStore
  return (
    <div className='col-span-3'>
      <div className='flex flex-col items-center w-full gap-3 p-10 bg-gray-100 shadow-md rounded-3xl'>
        <div>
          <Avatar size='lg' imageUrl={user?.imageUrl} />
        </div>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>{user?.firstName} {user?.lastName}</h1>
          <h3 className='text-xl font-semibold'>{user?.matriculationNumber}</h3>
          <p className='capitalize'>{user?.college}</p>
        </div>
        <button className='btn btn-sm btn-block'>edit</button>
      </div>
    </div>
  )
}

