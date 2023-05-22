function Drawer({ children }: { children: JSX.Element[] | JSX.Element }) {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="overflow-y-hidden drawer-content" style={{overflowX: "clip"}}>
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
            <ul className="p-4 menu w-80 bg-base-100">
                {children}
            </ul>

        </div>
    )
}
