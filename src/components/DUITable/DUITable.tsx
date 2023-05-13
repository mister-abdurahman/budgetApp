import Avatar from "../Avatar/Avatar";

interface IDUITableProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: { name: string, value: string }[],
    body?: any,
    hasCheckBox?: boolean,
    renderAction?: (row: any) => JSX.Element,
}
function DUITable(props: IDUITableProps) {
    const { header, body, hasCheckBox, renderAction } = props;
    return (
        <div className="overflow-x-auto w-full">
            <table {...props} className={`table table-compact w-full ${props.className}`}>
                {/* head */}
                <thead>
                    <tr>
                        {hasCheckBox ? (<th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>) : null}

                        {header?.map((th, index) => (
                            <th key={index}>{th.name}</th>
                        ))}
                        {renderAction ? (
                            <th></th>
                        ) : null}

                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {body?.map((row, index) => (
                        <tr key={index} className="hover">
                            {hasCheckBox ? (<th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>) : null}

                            {header?.map((key, index) => (
                                <td key={index} className="capitalize">{row[key.value]}</td>
                            ))}

                            {renderAction ? (
                                <td>
                                    {renderAction(row)}
                                </td>
                            ) : null}
                        </tr>
                    ))}

                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        {hasCheckBox ? (<th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>) : null}

                        {header?.map((th, index) => (
                            <th key={index}>{th.name}</th>
                        ))}
                        {renderAction ? (
                            <th></th>
                        ) : null}
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}

function DUITable2(props: IDUITableProps) {
    const { } = props;
    return (
        <div {...props}>
            <DUITableHeader>
                <DUITableCell>Header 1</DUITableCell>
                <DUITableCell>Header 1</DUITableCell>
                <DUITableCell>Header 1</DUITableCell>
            </DUITableHeader>
            <DUITableBody>
                <DUITableRow>
                    <DUITableCell>
                        Cell 1
                    </DUITableCell>
                    <DUITableCell>
                        Cell 1
                    </DUITableCell>
                    <DUITableCell>
                        Cell 1
                    </DUITableCell>
                    <DUITableCell>
                        Cell 1
                    </DUITableCell>
                </DUITableRow>
            </DUITableBody>
        </div>
    )
}

export default DUITable

export const DUITableHeader = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div className="flex">{children}</div>
    )
}

export const DUITableBody = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div>{children}</div>
    )
}

export const DUITableRow = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div className="flex">{children}</div>
    )
}

export const DUITableCell = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    return (
        <div>{children}</div>
    )
}


