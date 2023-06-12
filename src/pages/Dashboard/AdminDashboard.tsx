import { FaUsers } from "react-icons/fa"
import { useStore } from "../../data/stores/store"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"

function AdminDashboard() {
    const {
        authStore: { user },
        userStore: { userArrays, menus, load_users },
    } = useStore()

    useEffect(() => {
        load_users()
    }, [load_users])

    const ROLES = {
        admin: "admin",
        student: "student",
        advisor: "advisor",
    }

    return (
        <div className='space-y-6'>
            <div className='space-y-2'>
                <h1 className="text-2xl font-bold text-gray-900 capitalize sm:text-3xl">
                    Welcome Back, {user?.firstName} {user?.lastName}!
                </h1>
                <p className="mt-1.5 text-sm text-gray-500">
                    pick a level to view, download or upload document
                </p>
            </div>
            <div className="grid grid-cols-12 gap-4">
                {menus.map((x, index) => {
                    return (
                        <div key={index} className="flex col-span-3 gap-4 p-2 bg-white rounded-md shadow-lg">
                            <div className="grid w-12 h-12 text-white rounded-md bg-neutral place-items-center"><FaUsers size={30} /></div>
                            <div className="grow">{x.title}</div>
                            <div className="self-end font-bold">{x.total}</div>
                        </div>
                    )
                })}
                <div className="flex col-span-3 gap-4 p-2 bg-white rounded-md shadow-lg">
                    <div className="grid w-12 h-12 text-white rounded-md bg-neutral place-items-center"><FaUsers size={30} /></div>
                    <div className="grow">All Users</div>
                    <div className="self-end font-bold">10</div>
                </div>
            </div>
        </div>
    )
}

export default observer(AdminDashboard)