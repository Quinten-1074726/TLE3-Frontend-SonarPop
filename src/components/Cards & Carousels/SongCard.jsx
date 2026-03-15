import notFound from "../../assets/Image-not-found.png";

function SongCard({ card }) {
    const image = card?.image || card?.cover || card?.avatar || notFound;
    const songName = card?.name || card?.title || "Unknown song";
    const artistName = card?.artist || card?.artistName || "Unknown artist";

    return (
        <div className="w-36 flex flex-col">
            <img
                src={image}
                alt={songName}
                className="w-36 h-36 object-cover rounded-xl mb-2"
            />

            <p className="text-sm font-bold text-text-primary leading-tight truncate">
                {songName}
            </p>

            <p className="text-xs text-text-primary/70 leading-tight mt-0.5 truncate">
                {artistName}
            </p>
        </div>
    );
}

export default SongCard;