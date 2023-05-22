
type IStat = {
    children: JSX.Element | JSX.Element[]
}

function Stat({ children }: IStat) {
    return (
        <div className="shadow-md stats stats-vertical">
            {children}
        </div>
    )
}

export default Stat

interface IStatCell {
    title: string,
    value: string,
    desc: string
    icon: JSX.Element,
}

export const StatCell = ({ title, value, desc, icon }: IStatCell) => {
    return (
        <div className="stat">
            <div className="stat-figure">
                {icon}
            </div>
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-desc text-success">{desc}</div>
        </div>
    )
}
