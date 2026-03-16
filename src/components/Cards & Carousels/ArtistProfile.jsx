import defaultProfile from "../../assets/default-profile.png";

function ArtistProfile({ artist }) {
    return(
        <>
            <div className="rounded-xl p-4 flex flex-col items-center w-40">
                <img
                    src={artist?.imageUrl || defaultProfile}
                    alt={artist?.name || "Unknown"}
                    className="w-28 h-28 rounded-full object-cover"
                />
                <p className="mt-3 font-semibold text-text-primary text-center text-lg">
                    {artist?.name || "Unknown"}
                </p>
            </div>
        </>
    )
}

export default ArtistProfile;