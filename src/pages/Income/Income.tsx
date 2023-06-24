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
import IncomeDetails from "./IncomeDetails";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function Incomes() {
  const {
    authStore: { user },
    incomeStore: {
      load_incomes,
      select_income_by_id,
      incomeArrays,
      delete_income,
    },
    budgetStore: { load_budgets, budgetArrays },
  } = useStore();
  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, incomeArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()
  const navigation = useNavigate();

  useEffect(() => {
    load_incomes();
    load_budgets();
  }, [load_incomes]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (state: boolean, id?: number) => {
    // set_budget_modal(state);
    select_income_by_id(id || 0);
    setIsOpen(true);
  };

  const handleCloseModal = (state: boolean) => {
    // set_budget_modal(state);
    setIsOpen(false);
  };

  const handleDeleteIncome = (id: number) => {
    delete_income(id).then(() => navigation(0));
  };

  const columns: Column[] = [
    {
      id: "action",
      align: "left",
      label: "S/N",
      minWidth: 120,
      render: (index, row) => <h1>{index + 1}</h1>,
    },
    { id: "description", label: "Description", minWidth: 180 },
    { id: "amount", label: "Amount", minWidth: 100 },
    {
      id: "action",
      align: "right",
      label: "Action",
      minWidth: 140,
      render: (index, row) => (
        <>
          <Button
            className="m-4"
            onClick={() => handleOpenModal(true, row.id)}
            icon={<BsLink className="w-5 h-5" />}
          >
            View
          </Button>
          <Button
            onClick={() => handleDeleteIncome(row.id)}
            icon={<MdDelete size={20} />}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {/* <UserInfo type="vertical" handleModal={handleOpenModal} user={user} /> */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
        <div className="grow">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
            <span className="capitalize">Incomes</span>{" "}
          </h1>
        </div>
        <Button onClick={() => handleOpenModal(true)} className="">
          Create Incomes
        </Button>
      </div>
      <MUITable columns={columns} rows={incomeArrays} />
      <Modal
        page={
          <IncomeDetails
            handleModal={handleCloseModal}
            title={"New Incomes"}
            isDetail={true}
          />
        }
        isOpen={isOpen}
      />
    </div>
  );
}

export default observer(Incomes);
