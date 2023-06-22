import { useStore } from "../../data/stores/store";
import { Form, Formik } from "formik";
import { BiPlusCircle, BiSearch } from "react-icons/bi";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import { BsLink } from "react-icons/bs";
import UserInfo from "../../components/UserInfo/UserInfo";
import MUITable, { Column } from "../../components/Table/Table";
import BudgetDetails from "./BudgetDetails";

export function Budgets() {
  const {
    authStore: { user },
    budgetStore: { load_budgets, budgetArrays },
  } = useStore();
  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, savingsArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()

  useEffect(() => {
    load_budgets();
  }, [load_budgets]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (state: boolean, id?: string) => {
    setIsOpen(state);
  };

  const handleCloseModal = (state: boolean) => {
    setIsOpen(state);
  };

  const columns: Column[] = [
    { id: "description", label: "Description", minWidth: 170 },
    { id: "amount", label: "Amount", minWidth: 170 },
    { id: "budgetId", label: "Budget Id", minWidth: 170 },
  ];

  return (
    <div className="space-y-3">
      {/* <UserInfo type="vertical" handleModal={handleOpenModal} user={user} /> */}
      <div className="bg-white rounded-lg p-4 flex gap-3 items-center shadow-sm">
        <div className="grow">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            <span className="capitalize">Budget</span>{" "}
          </h1>
        </div>
        <Button onClick={() => handleOpenModal(true, user.id)} className="">
          Create Budget
        </Button>
      </div>
      <MUITable columns={columns} rows={budgetArrays} />
      <Modal
        page={
          <BudgetDetails
            handleModal={handleCloseModal}
            title={"New Budget"}
            isDetail={true}
          />
        }
        isOpen={isOpen}
      />
    </div>
  );
}

export default observer(Budgets);
