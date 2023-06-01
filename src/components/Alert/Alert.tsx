import { BiCheckCircle, BiError } from "react-icons/bi"
import { MdCancel, MdWarning } from "react-icons/md";
import { useStore } from "../../data/stores/store";

interface IAlertProps {
    message: string;
    type: string
    id: string
}

function Alert({ message, type, id }: IAlertProps) {
    const { commonStore } = useStore()
    const { removeAlert } = commonStore
    const icon = () => {
        switch (type) {
            case "success":
                return <BiCheckCircle size={25} />
            case "error":
                return <BiError color="red" size={25} />
            case "warning":
                return <MdWarning color="orange" size={25} />
            default:
                break;
        }
    }

    const header = () => {
        switch (type) {
            case "success":
                return "Changes saved"
            case "error":
                return "An Error Occuried"
            case "warning":
                return "Warning"
            default:
                break;
        }
    }


    return (
        <div
            role="alert"
            className="p-4 bg-white border border-gray-100 shadow-xl rounded-xl"
        >
            <div className="flex items-start gap-4">
                <span className="text-green-600">
                    {icon()}
                </span>

                <div className="flex-1">
                    <strong className="block font-medium text-gray-900"> {header()} </strong>

                    <p className="mt-1 text-sm text-gray-700">
                        {message}
                    </p>
                </div>

                <button className="text-gray-500 transition hover:text-gray-600">
                    <span className="sr-only">Dismiss popup</span>
                    <div onClick={() => removeAlert(id)}>
                        <MdCancel />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Alert