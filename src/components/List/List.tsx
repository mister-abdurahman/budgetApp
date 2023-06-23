
function List({ children, className }: { children: any, className?: string }) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
    )
}

export default List

export const ListRow = ({ children, className }: { children: any, className?: string }) => {
    return (
        <div className={`flex flex-wrap items-center w-full gap-4 px-4 py-4 overflow-hidden bg-white rounded-lg shadow-md ${className}`}>{children}</div>
    )
}
