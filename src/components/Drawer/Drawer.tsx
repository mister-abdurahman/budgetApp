import { Logo } from "../../layout/Home/Home";

function Drawer({ children, sideMenu }: { children: JSX.Element[] | JSX.Element; sideMenu: JSX.Element[] | JSX.Element }) {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="overflow-y-hidden drawer-content" style={{overflowX: "clip"}}>
                {children}
            </div>
            <DrawerSideBar>
                {sideMenu}
            </DrawerSideBar>
        </div>
    )
}

export default Drawer

export const DrawerSideBar = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className="z-50 drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <Logo />
            <ul className="h-screen p-4 space-y-2 menu w-80 bg-base-100 ">
                <li className="py-6"><Logo /></li>
                {children}
            </ul>

        </div>
    )
}
