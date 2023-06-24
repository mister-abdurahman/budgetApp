import { useStore } from "../../data/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import MUITable, { Column } from "../../components/Table/Table";
import BudgetDetails from "./BudgetDetails";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function Budget() {
  const {
    budgetStore: {
      load_budgets,
      delete_budget,
      budgetArrays,
      set_budget_modal,
      modal: bdModal,
    },
  } = useStore();
  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, savingsArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()

  const navigation = useNavigate();

  useEffect(() => {
    load_budgets();
  }, [load_budgets]);

  const handleOpenModal = (state: boolean) => {
    set_budget_modal(state);
  };

  const handleCloseModal = (state: boolean) => {
    set_budget_modal(state);
  };

  const handleDeleteBudget = (id: number) => {
    console.log(typeof id);
    delete_budget(id).then(() => navigation(0));
  };

  const columns: Column[] = [
    {
      id: "action",
      align: "left",
      label: "S/N",
      minWidth: 120,
      render: (index, row) => {
        console.log(row);
        return <h1>{index + 1}</h1>;
      },
    },
    { id: "description", label: "Description", minWidth: 180 },
    { id: "amount", label: "Amount", minWidth: 100 },
    {
      id: "action",
      align: "right",
      label: "Action",
      minWidth: 140,
      render: (index, row) => {
        console.log(index);
        return (
          <Button
            onClick={() => handleDeleteBudget(row.id)}
            icon={<MdDelete size={20} />}
          >
            Delete
          </Button>
        );
      },
    },
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
        <Button onClick={() => handleOpenModal(true)} className="">
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
