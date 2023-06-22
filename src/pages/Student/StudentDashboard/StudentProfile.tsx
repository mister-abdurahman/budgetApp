import { MdSchool } from "react-icons/md"
import Avatar from "../../../components/Avatar"
import { IStudent } from "../../../data/stores/studentStore"
import { BiBuildingHouse, BiCertification } from "react-icons/bi"
import { observer } from "mobx-react-lite"
import StudentCreate from "../StudentCreate"
import Modal from "../../../components/Modal"
import { useStore } from "../../../data/stores/store"
import { useState } from "react"

interface StudentProfileProps {
    user: IStudent
}

export const StudentProfile = observer(({ user }: StudentProfileProps) => {
    const {
        userStore: { select_user_by_id },
    } = useStore()
    
    const [isOpen, setIsOpen] = useState(false)

    const handleModal = (state: boolean, id?: string) => {
        select_user_by_id(id || "")
        setIsOpen(state);
    }
    return (
        <div className='col-span-5'>
            <div className='flex flex-col w-full gap-3 p-7 bg-white shadow-md rounded-3xl'>
                <div className="grid place-items-center">
                    <Avatar size='lg' imageUrl={user?.imageUrl} />
                </div>
                <div className='space-y-2'>
                    <h1 className='text-3xl text-[1.8rem] font-bold capitalize'>{user?.firstName} {user?.lastName}</h1>
                    <h3 className='text-lg font-semibold'>{user?.studentNumber}</h3>
                    <p className='p-4 font-semibold capitalize rounded-lg shadow-md'><MdSchool />{user?.collegeName} College</p>
                    <p className='p-4 font-semibold capitalize rounded-lg shadow-md'><BiBuildingHouse />{user?.departmentName} Department</p>
                    <p className='p-4 font-semibold capitalize rounded-lg shadow-md'><BiCertification />{user?.programName}</p>
                </div>
                <button className='btn btn-sm btn-block btn-neutral' onClick={() => handleModal(true)}>edit</button>
            </div>
            <Modal page={<StudentCreate handleModal={handleModal} />} isOpen={isOpen} />
        </div>
    )
})
