import Avatar from "../../components/Avatar"
import { IUser } from "../../data/stores/authStore"

interface DashboardProfileProps {
    user: IUser | null
}

export const DashboardProfile = ({ user }: DashboardProfileProps) => {
    return (
        <div className='col-span-4'>
            <div className='flex flex-col items-center w-full gap-3 p-10 bg-white shadow-md rounded-3xl'>
                <div>
                    <Avatar size='lg' imageUrl={user?.imageUrl} />
                </div>
                <div className='space-y-2'>
                    <h1 className='text-3xl text-[1.8rem] font-bold capitalize'>{user?.firstName} {user?.lastName}</h1>
                    {/* <h3 className='text-xl font-semibold'>{user?.matriculationNumber}</h3>
                    <p className='capitalize'>{user?.college}</p> */}
                </div>
                <button className='btn btn-sm btn-block'>edit</button>
            </div>
        </div>
    )
}
