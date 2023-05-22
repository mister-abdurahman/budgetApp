import { MdArrowDropDown } from "react-icons/md"

interface IDropdown extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element[] | JSX.Element,
  title?: string,
  buttonStyle?: string,
  dropDownStyle?: string,
  icon?: JSX.Element
  isButton?: boolean
}
function Dropdown(props: IDropdown) {
  const { children, buttonStyle, dropDownStyle, icon, title, isButton = true } = props
  return (
    <div className={`dropdown ${dropDownStyle}`}>
      {isButton ? <Button className={props.className} buttonStyle={buttonStyle} title={title} icon={icon} /> : <Label title={title} icon={icon} />}
      <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
        {children}
      </ul>
    </div>
  )
}

export default Dropdown


const Button = ({ className, buttonStyle = "", title = "", icon, ...restProps }: IDropdown) => {
  return (
    // <div {...restProps} tabIndex={0} className={`btn m-1 ${className} ${buttonStyle}`}>{title}<span>{icon ? icon : <MdArrowDropDown />}</span></div>
    <div
      {...restProps}
      className={`inline-flex items-center gap-2 px-4 py-1 text-white capitalize bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500 ${className} ${buttonStyle}`}
      tabIndex={0}
    >
      <span className="text-sm font-medium"> {title} </span>
      {icon ? icon : <MdArrowDropDown />}
    </div>
  )
}

const Label = ({ title, icon }: IDropdown) => {
  return (
    <label tabIndex={0} className={`m-1`}>{title}<span>{icon ? icon : <MdArrowDropDown />}</span></label>
  )
}
