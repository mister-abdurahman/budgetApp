import { MdArrowDropDown, MdNotifications } from 'react-icons/md';
import './style.css'
import Drawer from '../../components/Drawer/Drawer';
import Navbar, { NavbarCenterMenu, NavbarMenu } from '../Navbar/Navbar';
import { HiLogout, HiPlus } from 'react-icons/hi';
import { BsGearWide } from 'react-icons/bs';
import Dropdown from '../../components/Dropdown/Dropdown';
import './style.css';
import LogoImage from '../../assets/covenant-university-logo-desktop.png'
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/store';
import React from 'react';



function Home({ children }: { children: JSX.Element[] | JSX.Element }) {
    const { authStore } = useStore()
    const { signOut, user } = authStore
    return (
        <>
            <Drawer>
                <Navbar>
                    <Logo />
                    <MdNotifications className='text-3xl lg:hidden' />
                    <NavbarCenterMenu>
                        <button className='font-semibold btn btn-md btn-ghost'><Link to="/dashboard">Dashboard</Link></button>
                        <button className='font-semibold btn btn-md'><Link to="/upload">  Upload</Link></button>
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
                <div className='m-6 mx-12'>
                    {children}
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
            src={user?.imageUrl}
            className="object-cover w-10 h-10 rounded-full"
          />

          <p className="hidden text-xs text-left ms-2 sm:block">
            <strong className="block font-medium">{user?.lastName} {user?.firstName}</strong>

            <span className="text-gray-500"> {user?.username} </span>
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hidden w-5 h-5 text-gray-500 transition ms-4 group-hover:text-gray-700 sm:block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
    )
}
