import { HiMenuAlt2 } from 'react-icons/hi'

function Navbar({ children }: { children: JSX.Element[] | JSX.Element }) {
    return (
        <div className="w-full bg-white navbar h-2 shadow-sm justify-between items-center">
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                    <HiMenuAlt2 size={30} />
                </label>
            </div>
            {children}
        </div>
    )
}

export default Navbar

export const NavbarMenu = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal flex justify-between items-center gap-1">
                {/* <!-- Navbar menu content here --> */}
                {children}
            </ul>
        </div>
    )
}

export const NavbarCenterMenu = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 px-1">
                {children}
            </ul>
        </div>
    )
}