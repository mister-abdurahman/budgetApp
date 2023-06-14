import { useEffect, useState } from "react";
import { useStore } from "../../data/stores/store";
import UserInfo from "../../components/UserInfo/UserInfo";
import Modal from "../../components/Modal";
import AdvisorEdit from "../Advisor/AdvisorEdit";
import { HiOutlineUsers } from "react-icons/hi";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function AdvisorDashboard() {
  const {
    authStore: { user },
    levelStore: { load_levels },
    studentStore: { studentStat, load_students, get_student_stat },
    advisorStore: { get_advisor_by_user_id },
  } = useStore()

  useEffect(() => {
    get_student_stat();
    load_levels();
    load_students()
  }, [get_student_stat, load_levels, load_students])


  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = (state: boolean, id?: string) => {
    get_advisor_by_user_id(id || "");
    setIsOpen(state);
  }

  const handleCloseModal = (state: boolean) => {
    setIsOpen(state);
  }
  return (
    <div className='space-y-6'>
      <UserInfo type="vertical" handleModal={handleOpenModal} user={user} />

      <div className="grid grid-cols-3 gap-5">
        <div className="rounded-lg overflow-hidden shadow-md bg-white grid items-center">
          <div className="bg-white p-5 flex gap-3 items-center">
            <div className="bg-neutral text-white rounded-lg grid place-items-center h-12 w-12"><HiOutlineUsers size={20} /></div>
            <div className="grow">
              <div className="text-sm text-gray-500">Total Students</div>
              <div className="text-lg font-bold text-gray-900 sm:text-3xl">{studentStat?.allStudent}</div>
            </div>
            <Link to='/students'><Button>View All</Button></Link>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-md bg-white grid items-center">
          <div className="p-5 flex gap-3 items-center">
            <div className="bg-success text-white rounded-lg grid place-items-center h-12 w-12"><HiOutlineUsers size={20} /></div>
            <div className="grow">
              <div className="text-sm text-gray-500">Student with complete document</div>
              <div className="text-lg font-bold text-gray-900 sm:text-3xl">{studentStat?.completed}</div>
            </div>
            <Link to='/students'><Button>View All</Button></Link>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-md bg-white grid items-center">
          <div className="bg-white p-5 flex gap-3 items-center">
            <div className="bg-rose-600 text-white rounded-lg grid place-items-center h-12 w-12"><HiOutlineUsers size={20} /></div>
            <div className="grow">
              <div className="text-sm text-gray-500">Student with uncomplete <br /> document</div>
              <div className="text-lg font-bold text-gray-900 sm:text-3xl">{studentStat?.uncompleted}</div>
            </div>
            <Link to='/students'><Button>View All</Button></Link>
          </div>
        </div>
        
      </div>


      <Modal page={<AdvisorEdit handleModal={handleCloseModal} title={"Profile"} isDetail={true} />} isOpen={isOpen} />
    </div>
  )
}

export default AdvisorDashboard