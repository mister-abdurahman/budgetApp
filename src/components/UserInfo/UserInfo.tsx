import { IUser } from '../../data/stores/userStore';
import Avatar from '../Avatar/Avatar'
import { HiUserCircle } from "react-icons/hi";
import Button from '../Button';

export interface IUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element[] | JSX.Element | string;
    type: string;
    handleModal: (state: boolean, id: string) => void;
    user: IUser;
}

function UserInfo(props: IUserInfoProps) {
   
    switch (props.type) {
        case "vertical":
            return <VerticalUserInfo user={props.user} handleModal={props.handleModal} />
        case "horizontal":
            return <HorizontalUserInfo {...props} />
        default:
            return <HorizontalUserInfo {...props} />
    }
}

export default UserInfo

export const VerticalUserInfo = ({ user, handleModal }: { user: IUser, handleModal: (state: boolean, id: string) => void }) => {
    return (
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <h1 className="inline-grid w-20 h-20 text-4xl font-extrabold text-white uppercase rounded-full bg-neutral place-items-center">
                {user?.firstName[0]}{user?.lastName[0]}
            </h1>
            <div className="grow">
                <p className="mt-1.5 text-sm text-gray-500">
                    Welcome Back!
                </p>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    <span className="capitalize">{user?.firstName}</span> <span className="capitalize">{user?.lastName}</span>
                </h1>
                {/* <div>
                    {user.roles?.map((x, index) => <div key={index} className="text-sm text-gray-500 capitalize">{x}</div>)}
                </div> */}
            </div>
            <Button onClick={() => handleModal(true, user.id)} className="">View Profile</Button>
        </div>
    )
}

export const HorizontalUserInfo = (props: IUserInfoProps) => {
    return (
        <div {...props} className={`p-4 space-y-5 bg-white ${props.className}`}>
            <div className='flex items-center gap-5 lg:flex-col lg:items-start'>
                <Avatar size='xl' />
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