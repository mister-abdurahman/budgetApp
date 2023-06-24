import { RiDashboardLine } from "react-icons/ri";
import { FaCoins, FaMoneyBill } from "react-icons/fa";
import { useStore } from "../../data/stores/store";
import { HiLogout } from "react-icons/hi";
import Drawer from "../../components/Drawer/Drawer";
import { NavLink } from "react-router-dom";
import Navbar, { NavbarCenterMenu, NavbarMenu } from "../Navbar/Navbar";
import Dropdown from "../../components/Dropdown/Dropdown";
import { BsWalletFill } from "react-icons/bs";
import { GiDart } from "react-icons/gi";
import placeHolder from "../../assets/profile-image-placeholder.png";
import { MdSavings } from "react-icons/md";
import "./style.css";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal";
import BudgetDetails from "../../pages/Budget/BudgetDetails";
import { observer } from "mobx-react-lite";
import { Chart } from "../../components/Chart/Chart";

function Home({ children }: { children: JSX.Element[] | JSX.Element }) {
  const {
    authStore,
    budgetStore: { modal, set_budget_modal },
  } = useStore();
  const { signOut } = authStore;

  const sideMenu = [
    {
      name: "dashboard",
      url: "/dashboard",
      icon: <RiDashboardLine size={20} />,
    },
    {
      name: "budgets",
      url: "/budgets",
      icon: <BsWalletFill size={20} />,
    },
    {
      name: "savings",
      url: "/savings",
      icon: <MdSavings size={20} />,
    },
    {
      name: "incomes",
      url: "/incomes",
      icon: <FaMoneyBill size={20} />,
    },
    {
      name: "expenses",
      url: "/expenses",
      icon: <FaCoins size={20} />,
    },
  ];

  return (
    <>
      <Drawer
        sideMenu={
          <>
            {sideMenu.map((x, index) => {
              return (
                <NavLink
                  key={index}
                  to={x.url}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 px-4 py-2 text-gray-100 bg-gray-600 rounded-lg"
                      : "flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
                  }
                >
                  {x.icon}
                  <span className="text-sm font-medium capitalize ">
                    {" "}
                    {x.name}{" "}
                  </span>
                </NavLink>
              );
            })}
          </>
        }
      >
        <div className="w-screen h-screen cs-grid">
          <Navbar className="col-span-12">
            <HiLogout
              onClick={() => signOut()}
              className="text-3xl lg:hidden"
            />
            <NavbarCenterMenu>
              <Button
                className="py-2 ml-4 font-semibold"
                onClick={() => set_budget_modal(true)}
              >
                Create Budget
              </Button>
            </NavbarCenterMenu>
            <NavbarMenu>
              {/* <MdNotifications size={25} /> */}
              {/* <Dropdown
                dropDownStyle="dropdown-end"
                icon={<BsGearWide size={25} />}
                isButton={false}
              ></Dropdown> */}
              <Dropdown
                dropDownStyle="dropdown-end"
                icon={<UserInfo />}
                isButton={false}
              >
                <li onClick={() => signOut()}>
                  <a>
                    <HiLogout /> Sign out
                  </a>
                </li>
              </Dropdown>
            </NavbarMenu>
          </Navbar>
          <SideNav className="sticky self-start hidden space-y-2 bg-neutral-700 lg:block">
            <Logo />
            {sideMenu.map((x, index) => {
              const menu = (
                <NavLink
                  key={index}
                  to={x.url}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center text-xl gap-6 px-4 py-3 text-neutral bg-white"
                      : "flex items-center gap-6 px-4 py-3 text-white hover:bg-gray-100 hover:text-gray-700"
                  }
                >
                  {x.icon}
                  <span className="text-sm font-medium capitalize ">
                    {" "}
                    {x.name}{" "}
                  </span>
                </NavLink>
              );

              return menu;
            })}
          </SideNav>
          <main className="h-full p-6 overflow-y-auto bg-gray-100">
            {children}
          </main>
          <Footer />
        </div>
        <Modal
          page={
            <BudgetDetails
              handleModal={set_budget_modal}
              title={"New Budget"}
              isDetail={true}
            />
          }
          isOpen={modal}
        />
      </Drawer>
    </>
  );
}
export default observer(Home);

export const Logo = (props: any) => {
  return (
    <div
      {...props}
      className={`flex items-center justify-center gap-2 font-bold stroke-2 text-white m-4 p-4 mb-10 ${props.className}`}
    >
      <GiDart size={30} />{" "}
      <span className="text-lg text-white">MoneySmart</span>
    </div>
  );
};

export const SideNav = (props: ISideNav) => {
  const { children, className } = props;
  // const { authStore } = useStore()
  // const { user } = authStore

  return (
    <aside
      {...props}
      className={`flex h-full flex-col justify-between border-e ${className}`}
    >
      <div className="">
        <nav aria-label="Main Nav" className="flex flex-col space-y-1">
          {children}
        </nav>
      </div>
    </aside>
  );
};

export const UserInfo = () => {
  const { authStore } = useStore();
  const { user } = authStore;

  return (
    <button
      type="button"
      className="flex items-center transition rounded-lg group shrink-0"
    >
      <span className="sr-only">Menu</span>
      <img
        alt="Man"
        src={user?.imageUrl || placeHolder}
        className="object-cover w-10 h-10 rounded-full"
      />

      <p className="hidden text-xs text-left ms-2 sm:block">
        <strong className="block font-medium capitalize">
          {user?.lastName} {user?.firstName}
        </strong>

        <span className="text-gray-500"> {user?.userName} </span>
      </p>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden w-5 h-5 text-gray-500 transition ms-4 group-hover:text-gray-700 sm:block"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

interface ISideNav extends React.HTMLAttributes<HTMLDivElement> {
  children?: any;
}

export const Footer = () => {
  return (
    <footer className="sticky inset-x-0 bottom-0 grid col-span-12 p-1 text-white border-t border-gray-100 bg-neutral-700 place-items-center h-fit">
      <p className="hidden text-xs text-left ms-2 sm:grid sm:place-items-center">
        {/* <strong className="block font-medium">MoneySmart Innovatives</strong> */}
        <span className="flex items-end gap-1 text-base-100">
          {/* <BiCopyright /> */}
          {/* copyright 2023 */}
        </span>
      </p>
    </footer>
  );
};
