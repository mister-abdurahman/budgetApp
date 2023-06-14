import { HiDocumentDownload } from "react-icons/hi";
import Button from "../../components/Button";
import { MdWarning } from "react-icons/md";

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
                {!children ? (downloadUrl ? (<CardButtonAction downloadUrl={downloadUrl} />) : <Button icon={<MdWarning />}>Not Available</Button>) : children}
            </div>
        </div >
    )
}

export default Card


export const CardButtonAction = ({ downloadUrl = "/" }: { downloadUrl: string }) => {
    return (
        <div className="items-end justify-end card-actions">
            <a href={downloadUrl} download rel="noopener noreferrer" target="_blank">
                <Button icon={<HiDocumentDownload />}>View</Button>
            </a>
            <a href="/test.pdf" download rel="noopener noreferrer" target="_blank">
                <Button icon={<HiDocumentDownload />}>Download</Button>

            </a>
        </div>
    )
}
