import { useStore } from "../../data/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import MUITable, { Column } from "../../components/Table/Table";
import BudgetDetails from "./BudgetDetails";
import { MdDelete, MdSavings } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { BsLink } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";

export function Budget() {
  const {
    budgetStore: {
      load_budgets,
      select_budget_by_id,
      delete_budget,
      budgetArrays,
      set_budget_modal,
      modal: bdModal,
    },
  } = useStore();

  useEffect(() => {
    load_budgets();
  }, [load_budgets]);

  const handleOpenModal = (state: boolean, id?: number) => {
    console.log(id);
    
    select_budget_by_id(id || 0);
    set_budget_modal(state);
    
  };

  const handleCloseModal = (state: boolean) => {
    set_budget_modal(state);
  };

  const handleDeleteBudget = (id: number) => {
    console.log(typeof id);
    delete_budget(id);
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
    {
      id: "description", label: "Description", minWidth: 180, render: (index, data) => {
        console.log(index);
        
        return (
          <div className="flex items-center gap-3">
            <GiWallet className="text-neutral" size={20}  />
            {data.description}
          </div>
        );
      },
    },
    {
      id: "total_expenses", label: "Total Expenses", minWidth: 180, render: (index, data) => {
        console.log(index);

        return (
          <div className="flex items-center gap-3">
            <FaCoins className="text-neutral" size={20} />
            {data.totalExpenses}
          </div>
        )
      }
    },
    {
      id: "total_expenses", label: "Total Incomes", minWidth: 180, render: (index, data) => {
        console.log(index);
        return (
          <div className="flex items-center gap-3">
            <BiMoney className="text-neutral" size={20} />
            {data.totalIncome}
          </div>
        )
      }
    },
    {
      id: "total_expenses", label: "Total Savings", minWidth: 180, render: (index, data) => {
        return (
          <div className="flex items-center gap-3">
            <MdSavings className="text-neutral" size={20} />
            {data.totalSavings}
          </div>
        )
      }
    },
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
              className="m-2"
              onClick={() => handleOpenModal(true, row.id)}
              icon={<BsLink className="w-5 h-5" />}
            >
              View
            </Button>
            <Button
              onClick={() => handleDeleteBudget(row.id)}
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
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-2xl">
            <GiWallet className="text-neutral" size={30} />
            <span className="capitalize">Budget</span>
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
