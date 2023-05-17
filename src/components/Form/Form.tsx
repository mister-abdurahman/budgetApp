export interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: JSX.Element[] | JSX.Element
}

function Form({ children }: IFormProps) {
    return (
        <form className="lg:grid lg:grid-cols-2 lg:gap-1">{children}</form>
    )
}

export default Form









