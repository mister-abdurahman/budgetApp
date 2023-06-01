interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    title?: string;
    children?: JSX.Element[] | JSX.Element | string;
    icon?: JSX.Element
}
function Button(props: IButtonProps) {
    const{title, icon, className, children} = props
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-4 py-1 text-white capitalize bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500 ${className}`}
      tabIndex={0}
    >
      <span className="text-sm font-medium"> {title || children} </span>
      {icon ?? icon }
    </button>
  )
}

export default Button