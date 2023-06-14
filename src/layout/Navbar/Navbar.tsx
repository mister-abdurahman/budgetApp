import { HiMenuAlt2 } from 'react-icons/hi'

interface INavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children: JSX.Element[] | JSX.Element
}

function Navbar(props: INavbarProps) {
    const { children } = props
    return (
        <header {...props} className={`sticky z-40 inset-x-0 top-0 items-center justify-between h-2 gap-3 bg-white shadow-sm w-ful navbar ${props.className}`}>
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                    <HiMenuAlt2 size={30} />
                </label>
            </div>
            {children}
        </header>
    )
}

export default Navbar

export const NavbarMenu = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className="flex-none hidden lg:block">
            <ul className="flex items-center justify-between gap-3 menu menu-horizontal">
                {/* <!-- Navbar menu content here --> */}
                {children}
            </ul>
        </div>
    )
}

export const NavbarCenterMenu = ({ children }: { children: JSX.Element[] | JSX.Element | null }) => {
    return (
        <div className="flex-1 hidden gap-2 navbar-start lg:flex">
            {children}
            <ul className="gap-1 px-1 menu menu-horizontal">
            </ul>
        </div>
    )
}