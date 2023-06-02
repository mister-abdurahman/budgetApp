import { HiDocumentDownload } from "react-icons/hi";
import Button from "../../components/Button";
import { MdWarning } from "react-icons/md";

interface ICardProps {
    header: string;
    details: string;
    downloadUrl?: string;
}

function Card({ header = "Card title!", details = "If a dog chews shoes whose shoes does he choose?", downloadUrl }: ICardProps) {
    return (
        <div className="self-center shadow-xl card w-80 bg-base-100">
            <div className="card-body items-center">
                <h2 className="capitalize card-title">{header}</h2>
                <p>{details}</p>
                {downloadUrl ? (<div className="justify-end items-end card-actions">
                    <a href={downloadUrl} download rel="noopener noreferrer" target="_blank">
                        <Button icon={<HiDocumentDownload />}>View</Button>
                    </a>
                    <a href="/test.pdf" download rel="noopener noreferrer" target="_blank">
                        <Button icon={<HiDocumentDownload />}>Download</Button>

                    </a>
                </div>): <Button icon={<MdWarning  />}>Not Available</Button>}
            </div>
        </div>
    )
}

export default Card