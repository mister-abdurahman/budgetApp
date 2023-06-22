import { useEffect, useState } from "react";
import { useStore } from "../../data/stores/store";
import UserInfo from "../../components/UserInfo/UserInfo";
import { HiOutlineUsers } from "react-icons/hi";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function Dashboard() {
  const {
    authStore: { user },

  } = useStore()

  useEffect(() => {
    console.log(user);
  }, [user])


  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = (state: boolean, id?: string) => {
    setIsOpen(state);
  }

  const handleCloseModal = (state: boolean) => {
    setIsOpen(state);
  }
  return (
    <div className='space-y-6'>
      <UserInfo type="vertical" handleModal={handleOpenModal} user={user} />

      <div className="grid grid-cols-3 gap-5">
        <div className="grid items-center overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-3 p-5 bg-white">
            <div className="grid w-12 h-12 text-white rounded-lg bg-neutral place-items-center"><HiOutlineUsers size={20} /></div>
            <div className="grow">
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
            <Link to='/students'><Button>View All</Button></Link>
          </div>
        </div>

        <div className="grid items-center overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-3 p-5">
            <div className="grid w-12 h-12 text-white rounded-lg bg-success place-items-center"><HiOutlineUsers size={20} /></div>
            <div className="grow">
              <div className="text-sm text-gray-500">Student with complete document</div>
            </div>
            <Link to='/students'><Button>View All</Button></Link>
          </div>
        </div>

        <div className="grid items-center overflow-hidden bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-3 p-5 bg-white">
            <div className="grid w-12 h-12 text-white rounded-lg bg-rose-600 place-items-center"><HiOutlineUsers size={20} /></div>
            <div className="grow">
              <div className="text-sm text-gray-500">Student with uncomplete <br /> document</div>
            </div>
            <Link to='/students'><Button>View All</Button></Link>
          </div>
        </div>

      </div>


      {/* <Modal page={<Edit handleModal={handleCloseModal} title={"Profile"} isDetail={true} />} isOpen={isOpen} /> */}
    </div>
  )
}

export default Dashboard