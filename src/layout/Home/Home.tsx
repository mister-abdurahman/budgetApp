import { MdArrowDropDown } from 'react-icons/md';
import { BiCopyright } from 'react-icons/bi';
import { RiDashboardLine } from 'react-icons/ri';
import { FaUserGraduate } from 'react-icons/fa';
import './style.css'
import Drawer from '../../components/Drawer/Drawer';
import Navbar, { NavbarCenterMenu, NavbarMenu } from '../Navbar/Navbar';
import { HiLogout, HiPlus, HiUserGroup } from 'react-icons/hi';
import { BsGearWide } from 'react-icons/bs';
import Dropdown from '../../components/Dropdown/Dropdown';
import './style.css';
import LogoImage from '../../assets/covenant-university-logo-desktop.png'
import placeHolder from '../../assets/profile-image-placeholder.png'
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../../data/stores/store';



function Home({ children }: { children: JSX.Element[] | JSX.Element }) {
    const { authStore } = useStore()
    const { signOut, hasRole } = authStore



    const sideMenu = [
        {
            name: "dashboard",
            url: "/dashboard",
            icon: <RiDashboardLine size={20} />,
            roles: ["admin", "advisor", "student"]
        },
        {
            name: "users",
            url: "/users",
            icon: <HiUserGroup size={20} />,
            roles: ["admin"]
        },
        {
            name: "admins",
            url: "/admins",
            icon: <HiUserGroup size={20} />,
            roles: ["admin"]
        },
        {
            name: "advisors",
            url: "/advisors",
            icon: <HiUserGroup size={20} />,
            roles: ["admin"]
        },
        {
            name: "students",
            url: "/students",
            icon: <FaUserGraduate size={20} />,
            roles: ["admin", "advisor"]

        },

    ]



    return (
        <>
            <Drawer sideMenu={
                <>                    
                    {sideMenu.map((x, index) => {
                        const menu = <NavLink
                            key={index}
                            to={x.url}
                            className={({ isActive }) =>
                                isActive ? "flex items-center gap-2 px-4 py-2 text-gray-100 bg-gray-600 rounded-lg" : "flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
                            }
                        >
                            {x.icon}
                            <span className="text-sm font-medium capitalize "> {x.name} </span>
                        </NavLink>
                        const isValid = () => {
                            let result = false;
                            x.roles.forEach(x => {
                                if (hasRole(x)) {
                                    result = true
                                }
                            })

                            return result
                        }

                        return isValid() ? menu : null
                    })}
                </>
            }>
                <div className='w-screen h-screen cs-grid'>
                    <Navbar className='col-span-12'>
                        <Logo />
                        <HiLogout onClick={() => signOut()} className='text-3xl lg:hidden' />
                        <NavbarCenterMenu>
                            <button className='font-semibold btn btn-md btn-ghost'><Link to="/dashboard">Dashboard</Link></button>
                            {hasRole("student") ? <button className='font-semibold btn btn-md btn-neutral'><Link to="/upload">Upload</Link></button> : <></>}
                        </NavbarCenterMenu>
                        <NavbarMenu>
                            {/* <MdNotifications size={25} /> */}
                            <Dropdown
                                dropDownStyle="dropdown-end"
                                icon={<BsGearWide size={25} />}
                                isButton={false}
                            >
                            </Dropdown>
                            <Dropdown
                                dropDownStyle="dropdown-end"
                                icon={<UserInfo />}
                                isButton={false}
                            >
                                <li onClick={() => signOut()}><a><HiLogout /> Sign out</a></li>
                            </Dropdown>
                        </NavbarMenu>
                    </Navbar>
                    <SideNav className='sticky self-start hidden bg-neutral lg:block'>
                        <div className='space-y-2 rounded-xl'>

                            {sideMenu.map((x, index) => {
                                const menu = <NavLink
                                    key={index}
                                    to={x.url}
                                    className={({ isActive }) =>
                                        isActive ? "flex items-center gap-2 px-4 py-2 text-neutral bg-white" : "flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                                    }
                                >
                                    {x.icon}
                                    <span className="text-sm font-medium capitalize "> {x.name} </span>
                                </NavLink>
                                const isValid = () => {
                                    let result = false;
                                    x.roles.forEach(x => {
                                        if (hasRole(x)) {
                                            result = true
                                        }
                                    })

                                    return result
                                }

                                return isValid() ? menu : null
                            })}
                        </div>



                    </SideNav>
                    <main className='p-6 overflow-y-auto bg-gray-100 '>
                        {children}
                    </main>
                    <Footer />
                </div>
            </Drawer>
        </>
    )
}

export default Home;

interface ILogoProps extends React.AllHTMLAttributes<HTMLDivElement> {
    children?: JSX.Element[] | JSX.Element
}

export const Logo = (props: ILogoProps) => {

    return (
        <div {...props} className={`flex items-center w-fit ${props.className}`}>
            <img className='h-7' src={LogoImage} />
            <h1 className='text-xl font-bold capitalize w-fit lg:px-2 lg:mx-2'>SRMS</h1>
        </div>
    )
}

export const NavAddIcon = () => {
    return (
        <div className='flex items-center justify-center'>
            <HiPlus size={20} />
            <MdArrowDropDown />
        </div>
    )
}

export const UserInfo = () => {
    const { authStore } = useStore()
    const { user } = authStore

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
                <strong className="block font-medium capitalize">{user?.lastName} {user?.firstName}</strong>

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
    )
}

interface ISideNav extends React.HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element[] | JSX.Element
}

export const SideNav = (props: ISideNav) => {
    const { children, className } = props
    // const { authStore } = useStore()
    // const { user } = authStore

    return (
        <aside {...props} className={`flex h-full flex-col justify-between border-e ${className}`}>
            <div className="">
                <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1">
                    {children}
                </nav>
            </div>
        </aside>
    )
}

export const Footer = () => {
    return (
        <footer className="sticky inset-x-0 bottom-0 grid col-span-12 p-1 text-white border-t border-gray-100 bg-neutral place-items-center">
            <p className="hidden text-xs text-left ms-2 sm:grid sm:place-items-center">
                <strong className="block font-medium">Designed By Awogo Blessing</strong>
                <span className="flex items-end gap-1 text-base-100"><BiCopyright />copyright 2023 - {new Date().getFullYear()}</span>
            </p>
        </footer>
    )
}