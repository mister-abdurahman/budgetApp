
function List({ children }: { children: JSX.Element[] | JSX.Element }) {
    return (
        <div className="flex flex-col gap-2">{children}</div>
    )
}

export default List

export const ListRow = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className="p-4 shadow-md flex justify-between gap-2 items-center bg-white">{children}</div>
    )
}
