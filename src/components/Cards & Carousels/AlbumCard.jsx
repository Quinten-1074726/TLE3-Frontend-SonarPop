import notFound from "../../assets/Image-not-found.png";

function AlbumCard({ album }) {
    const albumName = "Not Found";
    const albumArtist = "Not Found";

    return(
        <>
            <div className="w-40 rounded-xl overflow-hidden p-4 flex flex-col">
                <img
                    src={album?.avatar || notFound }
                    alt="Sjoerd"
                    className="w-full h-28 object-cover rounded-2xl mb-4" />
                <p className="text-sm font-bold text-text-primary truncate">{album?.name|| albumName}</p>
                <p className="text-xs font-light text-text-primary truncate">{album?.artist || albumArtist}</p>
            </div>
        </>
    )
}

export default AlbumCard;