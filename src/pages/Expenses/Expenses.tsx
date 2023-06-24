import { useStore } from "../../data/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import { BsLink } from "react-icons/bs";
import MUITable, { Column } from "../../components/Table/Table";
import ExpenseDetails from "./ExpenseDetails";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function Expenses() {
  const {
    expenseStore: {
      load_expenses,
      select_expense_by_id,
      expenseArrays,
      delete_expense,
    },
    budgetStore: { load_budgets },
  } = useStore();

  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, incomeArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()

  const navigation = useNavigate();

  useEffect(() => {
    load_expenses();
    load_budgets();
  }, [load_expenses]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (state: boolean, id?: number) => {
    // set_budget_modal(state);
    console.log(state);
    select_expense_by_id(id || 0);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    // set_budget_modal(state);
    setIsOpen(false);
  };

  const handleDeleteExpense = (id: number) => {
    delete_expense(id).then(() => navigation(0));
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
          <>
            <Button
              className="m-4"
              onClick={() => handleOpenModal(true, row.id)}
              icon={<BsLink className="w-5 h-5" />}
            >
              View
            </Button>
            <Button
              onClick={() => handleDeleteExpense(row.id)}
              icon={<MdDelete size={20} />}
            >
              Delete
            </Button>
          </>
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
            <span className="capitalize">Expenses</span>{" "}
          </h1>
        </div>
        <Button onClick={() => handleOpenModal(true)} className="">
          Create Expenses
        </Button>
      </div>
      <MUITable columns={columns} rows={expenseArrays} />
      <Modal
        page={
          <ExpenseDetails
            handleModal={handleCloseModal}
            title={"New Expenses"}
            isDetail={true}
          />
        }
        isOpen={isOpen}
      />
    </div>
  );
}

export default observer(Expenses);
