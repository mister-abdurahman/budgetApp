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

export function Savings() {
  const {
    authStore: { user },
    savingsStore: { load_savings, savings },
  } = useStore();
  // const {
  //     advisorStore: { load_advisors, select_advisor_by_id, savingsArrays },
  //     levelStore: { load_levels, levelArrays },
  // } = useStore()

  useEffect(() => {
    load_savings();
  }, [user]);

  const budgetArray = [
    { id: "1", name: "Ileya savings", date: "2-12-2020" },
    { id: "2", name: "New House", date: "2-12-2020" },
    { id: "3", name: "Wedding Plan", date: "2-12-2020" },
  ];

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
    <>
      <UserInfo type="vertical" handleModal={handleOpenModal} user={user} />
      <br />
      <MUITable columns={columns} rows={budgetArrays} />
    </>
  );
}

export default observer(Savings);
