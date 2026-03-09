import Sjoerd from "../../assets/sjoerd.jpg";

function GenreCard({ genre }) {
    const genreName = "Not Found";

    return(
        <>
            <div className="w-40 rounded-xl overflow-hidden p-4 flex flex-col">
                <img
                    src={genre?.avatar || Sjoerd }
                    alt="Sjoerd"
                    className="w-full h-28 object-cover rounded-2xl mb-4" />
                <p className="text-sm font-bold text-text-primary truncate">{genre?.name|| genreName}</p>
            </div>
        </>
    )
}

export default GenreCard;