import { HiSortDescending } from "react-icons/hi"
import Avatar from "../../components/Avatar"
import List, { ListRow } from "../../components/List/List"
import { useStore } from "../../data/stores/store"
import TextInput from "../../components/Form/TextInput"
import { Form, Formik } from "formik"
import { BiPlusCircle, BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import StudentCreate from "./StudentCreate"
import { BsLink } from "react-icons/bs"

function Student() {
    const { studentStore } = useStore()
    const { load_students, select_student_by_id, studentArrays } = studentStore

    useEffect(() => {
        load_students();
    }, [load_students])

    const [isOpen, setIsOpen] = useState(false)

    const handleModal = (state: boolean, id?: number) => {
        select_student_by_id(id || 0)
        setIsOpen(state);
    }
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

                        <div className="flex gap-5">
                            <TextInput label='' id='search' name='search' placeholder="search" type="TextIconInput" icon={<BiSearch />} />
                            <Button
                                type="button"
                                onClick={() => handleModal(true)}
                                icon={<BiPlusCircle className="w-5 h-5" />}
                            >
                                <p className="text-sm font-medium">Create</p>
                            </Button>
                        </div>
                        <div className="flex items-center gap-3">
                            <HiSortDescending size={20} />
                            {/* <Dropdown title="Status" dropDownStyle="dropdown-end" className="capitalize rounded-sm btn-sm">
                                <CheckboxGroup name="Status" data={["all", "Completed", "Uncompleted"]} />
                            </Dropdown> */}
                        </div>



                    </Form>
                </Formik>
                <List>
                    {studentArrays.map((student, index) => {
                        return (
                            <ListRow key={index}>
                                <Avatar imageUrl={student.imageUrl} size="xs" />
                                <div className="flex flex-wrap items-center flex-1 gap-2 my-auto lg:gap-6 lg:flex-nowrap">
                                    <div className="w-40">
                                        <h1 className="font-bold text-gray-800 capitalize lg:font-semibold lg:text-sm">{student.firstName} {student.lastName}</h1>
                                        <h1 className="text-sm text-gray-400-100">{student.username}</h1>
                                    </div>
                                    <h1 className="text-sm font-semibold text-gray-800 capitalize">{student.collegeName}</h1>
                                    <h1 className="text-sm font-semibold text-gray-800 capitalize">{student.departmentName}</h1>
                                    <h1 className="text-sm font-semibold text-gray-800 capitalize">{student.programName}</h1>
                                    {/* <div className="text-xs badge badge-success">completed</div> */}

                                    {/* <div className="text-xs badge badge-error">uncompleted</div> */}
                                </div>
                                <Link
                                    to={`/students/${student.userId}`}
                                >
                                    <Button
                                    className="justify-center w-full md:lg:w-fit"
                                        icon={<BsLink className="w-5 h-5" />}
                                    >
                                        <p className="text-sm font-medium">View</p>
                                    </Button>
                                </Link>
                            </ListRow>
                        )
                    })}
                </List>
                <Modal page={<StudentCreate handleModal={handleModal} />} isOpen={isOpen} />
            </div>
        </div>
    )
}

export default observer(Student)