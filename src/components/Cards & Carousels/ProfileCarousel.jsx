import ProfileCard from "./ProfileCard.jsx";

function ProfileCarousel({
    title,
    profiles = [],
    emptyText = "No profiles found.",
}) {
    return (
        <section className="w-full">
            <p className="px-4 text-text-primary font-bold text-xl mb-4">
                {title}
            </p>

            {profiles.length === 0 ? (
                <p className="px-4 text-sm text-white/70">{emptyText}</p>
            ) : (
                <div className="overflow-x-auto whitespace-nowrap pl-4 pr-5 pb-2 scrollbar-soft">
                    {profiles.map((profile, idx) => (
                        <div
                            key={profile?.id || idx}
                            className="inline-block align-top mr-8"
                        >
                            <ProfileCard profile={profile} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ProfileCarousel;