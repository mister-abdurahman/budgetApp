import { FaUsers } from "react-icons/fa";
import { useStore } from "../../../data/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import UserEdit from "../../User/UserEdit";
import Modal from "../../../components/Modal";
import UserInfo from "../../../components/UserInfo/UserInfo";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const {
    authStore: { user },
    // userStore: { menus, load_users, select_user_by_id, filter_user_by_role },
  } = useStore();

  // useEffect(() => {
  //     load_users()
  // }, [load_users])

  const [isOpen, setIsOpen] = useState(false);

  // const handleModal = (state: boolean, id?: string) => {
  //     select_user_by_id(id || "")
  //     setIsOpen(state);
  // }

  return (
    <div className="space-y-6">
      <UserInfo type="vertical" handleModal={handleModal} user={user} />
      <div className="grid grid-cols-12 gap-4">
        {menus.map((x, index) => {
          return (
            <Link
              to={x.url}
              key={index}
              className="flex col-span-4 gap-4 p-2 bg-white rounded-md shadow-lg"
            >
              <div className="grid w-12 h-12 text-white rounded-md bg-neutral place-items-center">
                <FaUsers size={30} />
              </div>
              <div className="grow">{x.title}</div>
              <div className="self-end font-bold">
                {filter_user_by_role(x.role).length}
              </div>
            </Link>
          );
        })}
      </div>
      <Modal
        page={<UserEdit handleModal={handleModal} title={"Profile"} />}
        isOpen={isOpen}
      />
    </div>
  );
}

export default observer(AdminDashboard);
