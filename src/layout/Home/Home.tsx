import { MdArrowDropDown, MdNotifications, MdUploadFile } from 'react-icons/md';
import './style.css'
import Drawer from '../../components/Drawer/Drawer';
import Navbar, { NavbarCenterMenu, NavbarMenu } from '../Navbar/Navbar';
import { HiDocumentReport, HiPlus } from 'react-icons/hi';
import Avatar from '../../components/Avatar/Avatar';
import Dropdown from '../../components/Dropdown/Dropdown';
import './style.css';
import LogoImage from '../../assets/covenant-university-logo-desktop.png'
import { Link } from 'react-router-dom';



function Home({ children }: { children: JSX.Element[] | JSX.Element | any }) {
    return (
        <>
            <Drawer>
                <Navbar>
                    <Logo />
                    <MdNotifications className='text-3xl lg:hidden' />
                    <NavbarCenterMenu>
                        <li className='font-semibold'><Link to="/dashboard"><HiDocumentReport /> Dashboard</Link></li>
                        <li className='font-semibold'><Link to="/upload"><MdUploadFile />  Upload</Link></li>
                    </NavbarCenterMenu>
                    <NavbarMenu>
                        {/* <MdNotifications size={25} /> */}
                        <Dropdown
                            dropDownStyle="dropdown-end"
                            icon={<NavAddIcon />}
                            isButton={false}
                        >
                        </Dropdown>
                        <Dropdown
                            dropDownStyle="dropdown-end"
                            icon={<Avatar size='xs' />}
                            isButton={false}
                        >
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

export const Logo = () => {
    return (
        <div className='flex items-center'>
            <img className='h-8' src={LogoImage} />
            <h1 className='font-bold capitalize text-3xl lg:flex-1 lg:px-2 lg:mx-2'>SRMS</h1>
        </div>
    )
}

export const NavAddIcon = () => {
    return (
        <div className='flex justify-center items-center'>
            <HiPlus size={20} />
            <MdArrowDropDown />
        </div>
    )
}
