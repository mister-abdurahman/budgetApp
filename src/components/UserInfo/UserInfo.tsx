import Avatar from '../Avatar/Avatar'
import { HiUserCircle } from "react-icons/hi";


export interface IUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element[] | JSX.Element | string
}

function UserInfo(props: IUserInfoProps) {
    return (
        <div {...props} className={`p-4 space-y-5 bg-white ${props.className}`}>
            <div className='flex items-center gap-5 lg:flex-col lg:items-start'>
                <Avatar size='xl'/>
                <div className='flex-1 space-y-3'>
                    <div>
                        <h1 className='text-xl font-bold lg:text-2xl'>Onibudo Victor</h1>
                        <h1 className='text-xl text-gray-500 lowercase'>holutahyour</h1>
                    </div>
                    <span className="badge">Admin</span>
                </div>
            </div>
            <button className="gap-2 font-bold rounded-sm btn btn-outline btn-success btn-sm btn-block">
                <HiUserCircle className='text-xl' />
                Edit
            </button>
        </div>
    )
}

export default UserInfo