import defaultProfile from "../assets/default-profile.png";

// Verwacht nu vanuit de back-end een object genaamd profile, dat bestaat uit een username & avatar. Later aanpassen naar hoe we 'm definitief binnen krijgen.
function ProfileCard({ profile }) {
    return (
        <div className="rounded-xl p-4 flex flex-col items-center w-40">
            <img
                src={profile?.avatar || defaultProfile}
                alt={profile?.username || "Unknown"}
                className="w-24 h-24 rounded-full object-cover"
            />
            <p className="mt-3 font-semibold text-text-primary text-center text-lg">
                {profile?.username || "Unknown"}
            </p>
        </div>
    );
}

export default ProfileCard;