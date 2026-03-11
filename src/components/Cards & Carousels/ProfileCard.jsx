import defaultProfile from "../../assets/default-profile.png";

function ProfileCard({ profile }) {
    const avatar = profile?.avatar || profile?.image || defaultProfile;
    const username = profile?.username || profile?.name || "Unknown";

    return (
        <div className="w-32 flex flex-col items-center">
            <img
                src={avatar}
                alt={username}
                className="w-28 h-28 rounded-full object-cover"
            />
            <p className="mt-3 font-semibold text-text-primary text-center text-lg leading-tight">
                {username}
            </p>
        </div>
    );
}

export default ProfileCard;