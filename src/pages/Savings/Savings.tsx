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
// import AdvisorEdit from "./AdvisorEdit";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import { BsLink } from "react-icons/bs";
import UserInfo from "../../components/UserInfo/UserInfo";
import MUITable, { Column } from "../../components/Table/Table";
import SavingsDetails from "./SavingsDetails";

export function Savings() {
  const {
    authStore: { user },
    savingsStore: { load_savings, savings, savingsArrays },
  } = useStore();
  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, savingsArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()

  useEffect(() => {
    load_savings();
  }, [load_savings]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (state: boolean, id?: string) => {
    // set_budget_modal(state);
    setIsOpen(true);
  };

  const handleCloseModal = (state: boolean) => {
    // set_budget_modal(state);
    setIsOpen(false);
  };

  const columns: Column[] = [
    { id: "description", label: "Description", minWidth: 170 },
    { id: "amount", label: "Amount", minWidth: 170 },
    { id: "budgetId", label: "Budget Id", minWidth: 170 },
  ];

  return (
    <div className="space-y-3">
      {/* <UserInfo type="vertical" handleModal={handleOpenModal} user={user} /> */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
        <div className="grow">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
            <span className="capitalize">Savings</span>{" "}
          </h1>
        </div>
        <Button onClick={() => handleOpenModal(true, user.id)} className="">
          Create Savings
        </Button>
      </div>
      <MUITable columns={columns} rows={savingsArrays} />
      <Modal
        page={
          <SavingsDetails
            handleModal={handleCloseModal}
            title={"New Savings"}
            isDetail={true}
          />
        }
        isOpen={isOpen}
      />
    </div>
  );
}

export default observer(Savings);
