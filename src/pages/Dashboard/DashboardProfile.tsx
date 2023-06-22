import Avatar from "../../components/Avatar"
import { IUser } from "../../data/stores/userStore"

interface DashboardProfileProps {
    user: IUser
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
                    <h3 className='text-lg font-semibold'>{user?.userName}</h3>
                    {/* <p className='p-4 font-semibold capitalize rounded-lg shadow-md'><MdSchool />{user?.collegeName} College</p>
                    <p className='p-4 font-semibold capitalize rounded-lg shadow-md'><BiBuildingHouse />{user?.departmentName} Department</p>
                    <p className='p-4 font-semibold capitalize rounded-lg shadow-md'><BiCertification />{user?.programName}</p> */}
                </div>
                <button className='btn btn-sm btn-block btn-neutral'>edit</button>
            </div>
        </div>
    )
}
