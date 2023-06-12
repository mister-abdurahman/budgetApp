import { HiSortDescending } from "react-icons/hi"
import Avatar from "../../components/Avatar"
import Dropdown from "../../components/Dropdown"
import List, { ListRow } from "../../components/List/List"
import { useStore } from "../../data/stores/store"
import TextInput from "../../components/Form/TextInput"
import { Form, Formik } from "formik"
import { BiDetail, BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"
import CheckboxGroup from "../../components/CheckboxGroup"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import Button from "../../components/Button"

function User() {
    const { userStore } = useStore()
    const { userArrays, load_users } = userStore

    useEffect(() => {
        let isCurrent = true

        if (isCurrent) {
            load_users()
        }

        return () => {
            isCurrent = false;
        }
    }, [load_users])


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
                        </div>
                        <div className="flex items-center gap-3">
                            <HiSortDescending size={20} />
                            <Dropdown title="Users" dropDownStyle="dropdown-end" className="capitalize rounded-sm btn-sm">
                                <CheckboxGroup name="users" data={["All", "Admin", "Adviser", "Student"]} />
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
                                    {user.roles?.map(role => <div className="lowercase badge badge-neutral">{role}</div>)}
                                </div>
                                <Link
                                    to={`/students/${user.id}`}
                                >
                                    <Button icon={<BiDetail className="w-5 h-5" />}>View</Button>
                                </Link>
                            </ListRow>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}

export default observer(User)