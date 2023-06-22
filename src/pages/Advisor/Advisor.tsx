import { HiSortDescending } from "react-icons/hi";
import Avatar from "../../components/Avatar";
import Dropdown from "../../components/Dropdown";
import List, { ListRow } from "../../components/List/List";
import { useStore } from "../../data/stores/store";
import TextInput from "../../components/Form/TextInput";
import { Form, Formik } from "formik";
import { BiPlusCircle, BiSearch } from "react-icons/bi";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AdvisorEdit from "./AdvisorEdit";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import { BsLink } from "react-icons/bs";

function Advisor() {
  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, savingsArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()

  // useEffect(() => {
  //     load_advisors();
  //     load_levels();
  // }, [load_advisors, load_levels])

  const savingsArrays = [
    { id: "1", name: "Ileya savings", date: "2-12-2020" },
    { id: "2", name: "New House", date: "2-12-2020" },
    { id: "3", name: "Wedding Plan", date: "2-12-2020" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (state: boolean, id?: number) => {
    // state && select_advisor_by_id(id || 0)
    setIsOpen(state);
  };

  return (
    <div className="">
      <div className="space-y-4">
        <h4 className="">Savings</h4>
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="flex items-center justify-between gap-2">
            <div className="flex gap-5">
              <TextInput
                label=""
                id="search"
                name="search"
                placeholder="search"
                type="TextIconInput"
                icon={<BiSearch />}
              />
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
              <Dropdown
                title="Level"
                dropDownStyle="dropdown-end"
                className="capitalize rounded-sm btn-sm"
              >
                {/* <CheckboxGroup name="Level" data={[1,2,3].map(x => x)} /> */}
              </Dropdown>
            </div>
          </Form>
        </Formik>
        <List>
          {savingsArrays.map((advisor, index) => {
            return (
              <ListRow key={index}>
                {/* <Avatar imageUrl={advisor.imageUrl} size="xs" /> */}
                <div className="flex flex-wrap items-center flex-1 gap-6 my-auto lg:gap-6 lg:flex-nowrap">
                  <div className="w-40">
                    <h1 className="font-bold text-gray-800 capitalize lg:font-semibold lg:text-sm">
                      {advisor.name}
                    </h1>
                    <h1 className="text-sm text-gray-400-100">
                      {advisor.date}
                    </h1>
                  </div>
                  <div className="text-xs badge badge-neutral">Advisor</div>
                  <h1 className="text-sm font-semibold text-gray-800 capitalize">
                    {advisor.name}
                  </h1>
                  {/* <h1 className="text-sm font-semibold text-gray-800 capitalize">{advisor.departmentName}</h1>
                                    <h1 className="text-sm font-semibold text-gray-800 capitalize">{advisor.programName}</h1> */}

                  {/* <div className="text-xs badge badge-error">uncompleted</div> */}
                </div>
                <Button
                  className="justify-center btn-wide lg:w-fit"
                  onClick={() => handleModal(true, 21)}
                  icon={<BsLink className="w-5 h-5" />}
                >
                  <p className="text-sm font-medium">View</p>
                </Button>
              </ListRow>
            );
          })}
        </List>
        <Modal
          page={<AdvisorEdit handleModal={handleModal} />}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
}

export default observer(Advisor);
