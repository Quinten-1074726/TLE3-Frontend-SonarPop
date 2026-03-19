import defaultProfile from "../../assets/default-profile.png";

function ArtistProfile({ artist, tabIndex = 0, onClick }) {
    return (
        <button
            type="button"
            tabIndex={tabIndex}
            onClick={onClick}
            className="rounded-xl p-4 flex flex-col items-center w-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={artist?.name ? `Bekijk artiest ${artist.name}` : "Bekijk artiest"}
        >
            <img
                src={artist?.avatar || defaultProfile}
                alt={artist?.name || "Onbekende artiest"}
                className="w-28 h-28 rounded-full object-cover"
            />
            <p className="mt-3 font-semibold text-text-primary text-center text-lg">
                {artist?.name || "Onbekende artiest"}
            </p>
        </button>
    );
}

export default ArtistProfile;