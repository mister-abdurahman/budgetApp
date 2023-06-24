import { useStore } from "../../data/stores/store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import MUITable, { Column } from "../../components/Table/Table";
import SavingsDetails from "./SavingsDetails";
import { MdDelete, MdSavings } from "react-icons/md";
import { BsLink } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";

export function Savings() {
  const {
    savingsStore: {
      load_savings,
      savingsArrays,
      delete_savings,
      select_savings_by_id,
    },
    budgetStore: { load_budgets },
  } = useStore();

  useEffect(() => {
    load_savings();
    load_budgets("getCompleteData=false");
  }, [load_budgets, load_savings]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (state: boolean, id?: number) => {
    select_savings_by_id(id || 0);
    setIsOpen(state);
  };

  const handleCloseModal = (state: boolean) => {
    setIsOpen(state);
  };

  const handleDeleteSavings = (id: number) => {
    delete_savings(id);
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
      id: "budget",
      label: "BudgetId",
      minWidth: 180,
      render: (index, data) => {
        console.log(index);
        return (
          <div className="flex items-center gap-3">
            <GiWallet className="text-neutral" size={20} />
            {data.budget.description}
          </div>
        );
      },
    },
    {
      id: "description",
      label: "Description",
      minWidth: 180,
      render: (index, data) => {
        console.log(index);
        return (
          <div className="flex items-center gap-3">
            <MdSavings className="text-neutral" size={20} />
            {data.description}
          </div>
        );
      },
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
      render: (index, data) => {
        console.log(index);
        return (
          <div className="flex items-center gap-3">
            &#8358;
            {data.amount}
          </div>
        );
      },
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
              onClick={() => handleDeleteSavings(row.id)}
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
            <MdSavings className="text-neutral" size={30} />
            <span className="capitalize">Savings</span>{" "}
          </h1>
        </div>
        <Button onClick={() => handleOpenModal(true)} className="">
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
