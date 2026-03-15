import defaultProfile from "../../assets/default-profile.png";

function ProfileCard({ profile }) {
    const avatar = profile?.avatar || profile?.image || defaultProfile;
    const username = profile?.username || profile?.name || "Unknown";

    return (
        <div className="w-40 flex flex-col items-center">
            <img
                src={avatar}
                alt={username}
                className="w-32 h-32 rounded-full object-cover"
            />

            <div className="mt-4 min-h-[56px] flex items-start justify-center">
                <p className="font-semibold text-text-primary text-center text-lg leading-tight line-clamp-2">
                    {username}
                </p>
            </div>
        </div>
    );
}

export default ProfileCard;