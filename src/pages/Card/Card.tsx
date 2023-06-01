import { HiDocumentDownload } from "react-icons/hi";
import Button from "../../components/Button";

interface ICardProps {
    header: string;
    details: string;
    downloadUrl?: string;
}

function Card({ header = "Card title!", details = "If a dog chews shoes whose shoes does he choose?", downloadUrl = "/test.pdf" }: ICardProps) {
    return (
        <div className="self-stretch shadow-xl card card-compact w-80 bg-base-100">
            <div className="card-body">
                <h2 className="capitalize card-title">{header}</h2>
                <p>{details}</p>
                <div className="justify-end items-end card-actions">
                    <a href={downloadUrl} download rel="noopener noreferrer" target="_blank">
                        <Button icon={<HiDocumentDownload />}>View</Button>
                    </a>
                    <a href="/test.pdf" download rel="noopener noreferrer" target="_blank">
                        <Button icon={<HiDocumentDownload />}>Download</Button>

                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card