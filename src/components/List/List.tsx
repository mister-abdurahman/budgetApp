
function List({ children }: { children: JSX.Element[] | JSX.Element }) {
    return (
        <div className="flex flex-col gap-2">{children}</div>
    )
}

export default List

export const ListRow = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className="flex flex-wrap items-center justify-between w-full gap-4 px-4 py-2 overflow-hidden bg-white rounded-sm shadow-md">{children}</div>
    )
}
