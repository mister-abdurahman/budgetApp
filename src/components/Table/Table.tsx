interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: string[],
    body?: any,
}
function Table(props: ITableProps) {
    const { } = props;
    return (
        <table {...props}>
            <thead>
                <tr>
                    <th>Header 1</th>
                    <th>Header 1</th>
                    <th>Header 1</th>
                </tr>
            </thead>
            <tbody className="bg-gray-600 rounded">
                <tr className="first:group-first:">
                    <td className="first:">
                        Cell 1
                    </td>
                    <td>
                        Cell 1
                    </td>
                    <td>
                        Cell 1
                    </td>
                    <td className="last:rounded-tr-3xl">
                        Cell 1
                    </td>
                </tr>

                <tr >
                    <td className="first:rounded-tl-3xl">
                        Cell 1
                    </td>
                    <td>
                        Cell 1
                    </td>
                    <td>
                        Cell 1
                    </td>
                    <td className="last:rounded-tr-3xl">
                        Cell 1
                    </td>
                </tr>
                <tr >
                    <td className="first:rounded-tl-3xl">
                        Cell 1
                    </td>
                    <td>
                        Cell 1
                    </td>
                    <td>
                        Cell 1
                    </td>
                    <td className="last:rounded-tr-3xl">
                        Cell 1
                    </td>
                </tr>

            </tbody>
        </table>
    )
}

function Table2(props: ITableProps) {
    const { } = props;
    return (
        <div {...props}>
            <TableHeader>
                <TableCell>Header 1</TableCell>
                <TableCell>Header 1</TableCell>
                <TableCell>Header 1</TableCell>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Cell 1
                    </TableCell>
                    <TableCell>
                        Cell 1
                    </TableCell>
                    <TableCell>
                        Cell 1
                    </TableCell>
                    <TableCell>
                        Cell 1
                    </TableCell>
                </TableRow>
            </TableBody>
        </div>
    )
}

export default Table

export const TableHeader = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div className="flex">{children}</div>
    )
}

export const TableBody = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div>{children}</div>
    )
}

export const TableRow = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div className="flex">{children}</div>
    )
}

export const TableCell = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div>{children}</div>
    )
}


