import { useStore } from "../../data/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import MUITable, { Column } from "../../components/Table/Table";
import BudgetDetails from "./BudgetDetails";

export function Budget() {
  const {
    authStore: { user },
    budgetStore: {
      load_budgets,
      budgetArrays,
      set_budget_modal,
      modal: bdModal,
    },
  } = useStore();
  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, savingsArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()

  useEffect(() => {
    load_budgets();
  }, [load_budgets]);

  const handleOpenModal = (state: boolean, id?: string) => {
    set_budget_modal(state);
  };

  const handleCloseModal = (state: boolean) => {
    set_budget_modal(state);
  };

  const columns: Column[] = [
    { id: "description", label: "Description", minWidth: 170 },
    { id: "amount", label: "Amount", minWidth: 170 },
    // { id: "budgetId", label: "Budget Id", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 170 },
  ];

  return (
    <div className="space-y-3">
      {/* <UserInfo type="vertical" handleModal={handleOpenModal} user={user} /> */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
        <div className="grow">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
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
        isOpen={bdModal}
      />
    </div>
  );
}

export default observer(Budget);
