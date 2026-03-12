import notFound from "../../assets/Image-not-found.png";

function GenreCard({ genre }) {
    const image = genre?.image || genre?.cover || genre?.avatar || notFound;
    const genreName = genre?.name || "Unknown genre";

    return (
        <div className="w-36 flex flex-col">
            <img
                src={image}
                alt={genreName}
                className="w-36 h-36 object-cover rounded-xl mb-2"
            />

            <p className="text-sm font-bold text-text-primary leading-tight truncate">
                {genreName}
            </p>
        </div>
    );
}

export default GenreCard;