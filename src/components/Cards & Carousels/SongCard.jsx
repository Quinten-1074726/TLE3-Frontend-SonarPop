import Sjoerd from "../../assets/sjoerd.jpg";

function SongCard({ card }) {
    const image = card?.image || card?.cover || card?.avatar || Sjoerd;
    const songName = card?.name || card?.title || "Not Found";
    const artistName = card?.artist || card?.artistName || "Not Found";

    return (
        <div className="w-32 flex flex-col">
            <img
                src={image}
                alt={songName}
                className="w-32 h-32 object-cover rounded-lg mb-3"
            />
            <p className="text-sm font-bold text-text-primary leading-tight truncate">
                {songName}
            </p>
            <p className="text-xs font-light text-text-primary/80 truncate">
                {artistName}
            </p>
        </div>
    );
}

export default SongCard;