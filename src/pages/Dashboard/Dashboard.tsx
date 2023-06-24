import { useEffect, useState } from "react";
import { useStore } from "../../data/stores/store";
import UserInfo from "../../components/UserInfo/UserInfo";
import Modal from "../../components/Modal/Modal";
import ProfileDetail from "../Profile/ProfileDetail";
import { BsWalletFill } from "react-icons/bs";
import { MdSavings } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import LinearProgressWithLabel from "../../components/LinearProgress/LinearProgress";
import List, { ListRow } from "../../components/List/List";
import { observer } from "mobx-react-lite";
import { Chart } from "../../components/Chart/Chart";

function Dashboard() {
  const {
    authStore: { user },
    budgetStore: { get_total_budget, total_budget },
  } = useStore();

  useEffect(() => {
    get_total_budget();
    console.log(user);
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (state: boolean, id?: string) => {
    console.log(id);
    setIsOpen(state);
  };

  const handleCloseModal = (state: boolean) => {
    setIsOpen(state);
  };

  // const columns: Column[] = [
  //   { id: "description", label: "Description", minWidth: 170 },
  //   { id: "amount", label: "Amount", minWidth: 170 },
  //   { id: "budgetId", label: "Budget Id", minWidth: 170 },
  //   // {
  //   //   id: 'density',
  //   //   label: 'Density',
  //   //   minWidth: 170,
  //   //   align: 'right',
  //   //   format: (value: number) => value.toFixed(2),
  //   // },
  // ];

  return (
    <div className="space-y-6">
      <UserInfo type="vertical" handleModal={handleOpenModal} user={user} />

      <div className="flex flex-wrap grid-cols-3 gap-5">
        <div className="grid items-center overflow-hidden bg-white rounded-lg shadow-md w-80">
          <div className="flex items-center gap-3 p-5 bg-white">
            <div className="grid w-12 h-12 text-white rounded-lg bg-neutral place-items-center">
              <MdSavings size={20} />
            </div>
            <div className="grow">
              <div className="font-semibold text-gray-500 text-md">Savings</div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {total_budget.savings}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid items-center overflow-hidden bg-white rounded-lg shadow-md w-80">
          <div className="flex items-center gap-3 p-5">
            <div className="grid w-12 h-12 text-white rounded-lg bg-success place-items-center">
              <MdSavings size={20} />
            </div>
            <div className="grow">
              <div className="font-semibold text-gray-500 text-md">Income</div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {total_budget.incomes}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid items-center overflow-hidden bg-white rounded-lg shadow-md w-80">
          <div className="flex items-center gap-3 p-5 bg-white">
            <div className="grid w-12 h-12 text-white rounded-lg bg-rose-600 place-items-center">
              <FaMoneyBill size={20} />
            </div>
            <div className="grow">
              <div className="font-semibold text-gray-500 text-md">
                Expenses
              </div>
              <div className="text-lg font-semibold text-gray-700"></div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {total_budget.expenses}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 space-y-5">
          <div className="p-2 px-4 text-white rounded-md bg-neutral-700 max-w-96">
            <h1>Budget Left</h1>
            <LinearProgressWithLabel value={30} />
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-md">Recent Budget</div>

            <List className="w-96">
              <ListRow className="font-semibold">
                <BsWalletFill size={20} className="text-neutral" />
                <div className="grow">
                  <h1>May - 2013</h1>
                </div>
                <h1>2000</h1>
              </ListRow>
              <ListRow className="font-semibold">
                <BsWalletFill size={20} className="text-neutral" />
                <div className="grow">
                  <h1>June - 2013</h1>
                </div>
                <h1>2000</h1>
              </ListRow>
            </List>

            <Modal
              page={
                <ProfileDetail
                  handleModal={handleCloseModal}
                  title={"Profile"}
                />
              }
              isOpen={isOpen}
            />
          </div>
        </div>
        <div className="flex-1 bg-white p-4 rounded-md">
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default observer(Dashboard);
