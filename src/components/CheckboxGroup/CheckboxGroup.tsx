import { BiHomeAlt } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs"

interface ICheckboxGroupProps {
    name: string;
    data: string[];
    position?: string;
    type?: string;
    header?: string;
    action?: (arg: string) => void
}
function CheckboxGroup({ header, name, data, position, type, action }: ICheckboxGroupProps) {
    switch (position) {
        case "horizontal":
            position = "flex flex-wrap gap-3"
            break;

        case "vertical":
            position = "block space-y-2"
            break;
        default:
            position = "block space-y-2"
            break;
    }

    return (
        <fieldset className={position}>
            <legend className="sr-only">{name || "name"}</legend>
            {header && (<h1
                className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
            >
                <BiHomeAlt className="w-5 h-5 " />

                <p className="text-sm font-medium capitalize">{name || "name"}</p>
            </h1>)}

            {data.map((check, index) => {
                return (
                    <div key={index}>
                        <input
                            type={type || "checkbox"}
                            onClick={() => action && action(check)}
                            name={name}
                            value={check}
                            id={check}
                            className="peer hidden [&:checked_+_label_svg]:block"
                        />

                        <label
                            htmlFor={check}
                            className="flex items-center justify-center gap-2 px-3 py-2 text-gray-900 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-500 peer-checked:text-white"
                        >
                            <BsCheck2Circle className="hidden w-5 h-5" />

                            <p className="text-sm font-medium">{check}</p>
                        </label>
                    </div>
                )
            })}
        </fieldset>
    )
}

export default CheckboxGroup