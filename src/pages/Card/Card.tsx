import Button from "../../components/Button";
import { MdWarning } from "react-icons/md";
import { BiDownArrowCircle } from "react-icons/bi";

interface ICardProps {
    header: string;
    details: string;
    downloadUrl?: string;
    children?: JSX.Element[] | JSX.Element | string
}

function Card({ header = "Card title!", details = "If a dog chews shoes whose shoes does he choose?", downloadUrl, children }: ICardProps) {
    return (
        <div className="self-center shadow-xl card w-80 bg-base-100">
            <div className="card-body">
                <h2 className="capitalize card-title">{header}</h2>
                <p className="text-left capitalize">{details}</p>
                {!children ? (downloadUrl != null ? (<CardButtonAction downloadUrl={downloadUrl} />) : <Button className="bg-neutral-600 border-neutral-600" icon={<MdWarning />}>Not Available</Button>) : children}
            </div>
        </div >
    )
}

export default Card


export const CardButtonAction = ({ downloadUrl = "/" }: { downloadUrl?: string }) => {
    return (downloadUrl !== null) ? <a className="mt-5" href={downloadUrl} download rel="noopener noreferrer" target="_blank"><Button className="w-full" icon={<BiDownArrowCircle />}>Download</Button></a> : <></>
}
