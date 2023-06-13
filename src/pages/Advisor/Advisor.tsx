import { HiSortDescending } from "react-icons/hi"
import Avatar from "../../components/Avatar"
import Dropdown from "../../components/Dropdown"
import List, { ListRow } from "../../components/List/List"
import { useStore } from "../../data/stores/store"
import TextInput from "../../components/Form/TextInput"
import { Form, Formik } from "formik"
import { BiDetail, BiPlusCircle, BiSearch } from "react-icons/bi"
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import AdvisorEdit from "./AdvisorEdit"
import Modal from "../../components/Modal"
import Button from "../../components/Button/Button"

function Advisor() {
    const {
        advisorStore: { load_advisors, select_advisor_by_id, advisorArrays },
        levelStore: { load_levels, levelArrays },
    } = useStore()

    useEffect(() => {
        load_advisors();
        load_levels();
    }, [load_advisors, load_levels])

    const [isOpen, setIsOpen] = useState(false)

    const handleModal = (state: boolean, id?: number) => {
        select_advisor_by_id(id || 0)
        setIsOpen(state);
    }


    return (
        <div className="">
            <div className="space-y-4">
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
                            <Dropdown title="Level" dropDownStyle="dropdown-end" className="capitalize rounded-sm btn-sm">
                                <CheckboxGroup name="Level" data={levelArrays.map(x => x.name)} />
                            </Dropdown>
                        </div>



                    </Form>
                </Formik>
                <List>
                    {advisorArrays.map((advisor, index) => {
                        return (
                            <ListRow key={index}>
                                <Avatar imageUrl={advisor.imageUrl} size="xs" />
                                <div className="flex items-center flex-1 gap-6 my-auto">
                                    <div className="w-40">
                                        <h1 className="text-sm font-semibold text-gray-800 capitalize">{advisor.firstName} {advisor.lastName}</h1>
                                        <h1 className="text-sm text-gray-400-100">{advisor.username}</h1>
                                    </div>
                                    <div className="text-xs badge badge-neutral">Advisor</div>
                                    <h1 className="text-sm font-semibold text-gray-800 capitalize">{advisor.collegeName}</h1>
                                    <h1 className="text-sm font-semibold text-gray-800 capitalize">{advisor.departmentName}</h1>
                                    <h1 className="text-sm font-semibold text-gray-800 capitalize">{advisor.programName}</h1>

                                    {/* <div className="text-xs badge badge-error">uncompleted</div> */}
                                </div>
                                <Button
                                    onClick={() => handleModal(true,advisor.id)}
                                    icon={<BiDetail className="w-5 h-5" />}
                                >
                                    <p className="text-sm font-medium">View</p>
                                </Button>


                            </ListRow>
                        )
                    })}
                </List>
                <Modal page={<AdvisorEdit handleModal={handleModal} />} isOpen={isOpen} />
            </div>
        </div>
    )
}

export default observer(Advisor)