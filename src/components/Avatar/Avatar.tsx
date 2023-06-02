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
                <img src={imageUrl || "https://media.licdn.com/dms/image/C4D03AQHKNmB-w7WlGg/profile-displayphoto-shrink_800_800/0/1658915297053?e=1689206400&v=beta&t=SrF-hl453awu9qzOx5i0gC0I354qHH_gHQESnbQD_Us"} />
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
