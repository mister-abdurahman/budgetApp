function Drawer({ children }: { children: JSX.Element[] | JSX.Element }) {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="h-screen w-screen drawer-content overflow-y-hidden" style={{overflowX: "clip"}}>
                {children}
            </div>
            <DrawerSideBar>
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </DrawerSideBar>
        </div>
    )
}

export default Drawer

export const DrawerSideBar = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100">
                {children}
            </ul>

        </div>
    )
}
