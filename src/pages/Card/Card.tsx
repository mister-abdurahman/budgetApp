import { HiDocumentDownload } from "react-icons/hi";

interface ICardProps {
    header: string;
    details: string;
    downloadUrl?: string;
}

function Card({ header = "Card title!", details = "If a dog chews shoes whose shoes does he choose?", downloadUrl }: ICardProps) {
    return (
        <div className="self-start shadow-xl card card-compact w-96 bg-base-100">
            <div className="card-body">
                <h2 className="capitalize card-title">{header}</h2>
                <p>{details}</p>
                <div className="justify-end card-actions">
                    <a href="/test.pdf" download rel="noopener noreferrer" target="_blank" className="btn btn-md">
                        Download <HiDocumentDownload />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card