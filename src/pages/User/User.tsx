import { HiSortDescending } from "react-icons/hi"
import Avatar from "../../components/Avatar"
import Dropdown from "../../components/Dropdown"
import List, { ListRow } from "../../components/List/List"
import { useStore } from "../../stores/store"
import TextInput from "../../components/Form/TextInput"
import { Form, Formik } from "formik"
import { BiDetail, BiSearch } from "react-icons/bi"
import { BsCheck2Circle } from "react-icons/bs"
import { Link } from "react-router-dom"

function User() {
    const { authStore } = useStore()
    const { userArrays } = authStore

    const header = [
        {
            name: "Avatar",
            value: "text",
        },
        {
            name: "Name",
            value: "subjectCategory"
        },
        {
            name: "Registration Number",
            value: "registrationNumber"
        },
        {
            name: "Program",
            value: "questionCategory"
        },
    ]

    return (
        <div className="">
            <div className="space-y-2">
                <Formik
                    initialValues={{}}
                    onSubmit={(
                        values,
                        { setSubmitting }
                    ) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    <Form className="flex items-center justify-between gap-2"
                    >
                        <div className="flex items-center gap-5">
                            <TextInput label='' id='search' name='search' placeholder="search" type="TextIconInput" icon={<BiSearch />} />
                            <Dropdown title="Users" dropDownStyle="dropdown-end" className="capitalize rounded-sm btn-sm">
                                <fieldset className="block space-y-2">
                                    <legend className="sr-only">Users</legend>

                                    <div>
                                        <input
                                            type="checkbox"
                                            name="Status"
                                            value="All"
                                            id="All"
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />

                                        <label
                                            htmlFor="All"
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                                        >
                                            <BsCheck2Circle className="hidden w-5 h-5" />

                                            <p className="text-sm font-medium">All</p>
                                        </label>
                                    </div>

                                    <div>
                                        <input
                                            type="checkbox"
                                            name="Status"
                                            value="Admin"
                                            id="Admin"
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />

                                        <label
                                            htmlFor="Admin"
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                                        >
                                            <BsCheck2Circle className="hidden w-5 h-5" />

                                            <p className="text-sm font-medium">Admin</p>
                                        </label>
                                    </div>

                                    <div>
                                        <input
                                            type="checkbox"
                                            name="Status"
                                            value="Adviser"
                                            id="Adviser"
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />

                                        <label
                                            htmlFor="Adviser"
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                                        >
                                            <BsCheck2Circle className="hidden w-5 h-5" />
                                            <p className="text-sm font-medium">Adviser</p>
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="Status"
                                            value="Student"
                                            id="Student"
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />

                                        <label
                                            htmlFor="Student"
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                                        >
                                            <BsCheck2Circle className="hidden w-5 h-5" />
                                            <p className="text-sm font-medium">Student</p>
                                        </label>
                                    </div>
                                </fieldset>
                            </Dropdown>
                        </div>
                        <div className="flex items-center gap-3">

                            <HiSortDescending size={20} />
                            <Dropdown title="Status" dropDownStyle="dropdown-end" className="capitalize rounded-sm btn-sm">
                                <fieldset className="block space-y-2">
                                    <legend className="sr-only">Status</legend>

                                    <div>
                                        <input
                                            type="checkbox"
                                            name="Status"
                                            value="All"
                                            id="All"
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />

                                        <label
                                            htmlFor="All"
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                                        >
                                            <BsCheck2Circle className="hidden w-5 h-5" />

                                            <p className="text-sm font-medium">All</p>
                                        </label>
                                    </div>

                                    <div>
                                        <input
                                            type="checkbox"
                                            name="Status"
                                            value="Completed"
                                            id="Completed"
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />

                                        <label
                                            htmlFor="Completed"
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                                        >
                                            <BsCheck2Circle className="hidden w-5 h-5" />

                                            <p className="text-sm font-medium">Completed</p>
                                        </label>
                                    </div>

                                    <div>
                                        <input
                                            type="checkbox"
                                            name="Status"
                                            value="Uncompleted"
                                            id="Uncompleted"
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />

                                        <label
                                            htmlFor="Uncompleted"
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                                        >
                                            <BsCheck2Circle className="hidden w-5 h-5" />
                                            <p className="text-sm font-medium">Uncompleted</p>
                                        </label>
                                    </div>
                                </fieldset>
                            </Dropdown>
                        </div>



                    </Form>
                </Formik>
                <List>
                    {userArrays.map((user, index) => {
                        return (
                            <ListRow key={index}>
                                <Avatar imageUrl={user.imageUrl} size="xs" />
                                <div className="flex items-center flex-1 gap-4 my-auto">
                                    <div>
                                        <h1 className="text-sm font-semibold text-gray-800 capitalize">{user.firstName} {user.lastName}</h1>
                                        <h1 className="text-sm text-gray-400-100">{user.username}</h1>
                                    </div>
                                    {/* <div className="text-xs badge badge-error">uncompleted</div> */}
                                </div>
                                <Link
                                    to={`/student/${user.id}`}
                                    className="flex items-center justify-center gap-2 px-3 py-2 text-white bg-gray-500 rounded-md cursor-pointer borderborder-gray-500 hover:border-gray-200"
                                >
                                    <BiDetail className="w-5 h-5" />
                                    <p className="text-sm font-medium">View</p>
                                </Link>
                                {/* <Dropdown
                                        buttonStyle="btn-ghost btn-circle"
                                        dropDownStyle="dropdown-end" icon={<HiDotsVertical size={20}
                                        />}>
                                        <div
                                            className="flex items-center justify-center gap-2 px-3 py-2 text-white bg-gray-500 rounded-md cursor-pointer borderborder-gray-500 hover:border-gray-200"
                                        >
                                            <BiDetail className="w-5 h-5" />

                                            <p className="text-sm font-medium">View</p>
                                        </div>
                                    </Dropdown> */}
                            </ListRow>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}

export default User