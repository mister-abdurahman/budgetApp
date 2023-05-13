import { MdArrowDropDown } from "react-icons/md"

interface IDropdown {
  children?: JSX.Element[] | JSX.Element,
  title?: string,
  buttonStyle?: string,
  dropDownStyle?: string,
  icon?: JSX.Element
  isButton?: boolean
}
function Dropdown({ children, buttonStyle, dropDownStyle, icon, title, isButton = true }: IDropdown) {
  return (
    <div className={`dropdown ${dropDownStyle}`}>
      {isButton ? <Button buttonStyle={buttonStyle} title={title} icon={icon} /> : <Label title={title} icon={icon} />}
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {children}
      </ul>
    </div>
  )
}

export default Dropdown


const Button = ({ buttonStyle, title, icon }: IDropdown) => {
  return (
    <label tabIndex={0} className={`btn m-1 ${buttonStyle}`}>{title}<span>{icon ? icon : <MdArrowDropDown />}</span></label>
  )
}

const Label = ({ title, icon }: IDropdown) => {
  return (
    <label tabIndex={0} className={`m-1`}>{title}<span>{icon ? icon : <MdArrowDropDown />}</span></label>
  )
}
