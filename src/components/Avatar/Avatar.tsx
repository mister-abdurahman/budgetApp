import placeHolder from '../../assets/profile-image-placeholder.png'

interface IAvatar {
    online?: boolean
    imageUrl?: string
    size?: string
}

function Avatar({ imageUrl = placeHolder, size = "md", online = false }: IAvatar) {
    let width = 'w-24';

    switch (size) {
        case "xl":
            width = 'w-38'
            break;
        case "lg":
            width = 'w-32'
            break;
        case "md":
            width = 'w-24'
            break;
        case "sm":
            width = 'w-16'
            break;
        case "xs":
            width = 'w-8'
            break;

        default:
            break;
    }

    return (
        online ? <OnlineAvatar imageUrl={imageUrl ?? ''} width={width} />:<OfflineAvatar imageUrl={imageUrl ?? ''} width={width} />
    )
}

export default Avatar


export const OnlineAvatar = ({ imageUrl, width }: { imageUrl: string, width: string }) => {
    return (
        <div className="avatar online">
            <div className={`${width} rounded-full`}>
                <img src={imageUrl || placeHolder} />
            </div>
        </div>
    )
}

export const OfflineAvatar = ({ imageUrl, width }: { imageUrl: string, width: string }) => {
    return (
        <div className="avatar offline">
            <div className={`${width} rounded-full`}>
                <img src={imageUrl || "https://avatars.githubusercontent.com/u/48675387"} />
            </div>
        </div>
    )
}
