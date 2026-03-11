import ProfileCard from "./ProfileCard.jsx";

function ProfileCarousel({ title, profiles = [] }) {
    return (
        <section className="w-full">
            <p className="px-4 text-text-primary font-bold text-xl mb-3">
                {title}
            </p>

            {profiles.length === 0 ? (
                <p className="px-4 text-sm text-white/60">
                    Nog geen vrienden gevonden.
                </p>
            ) : (
                <div className="overflow-x-auto whitespace-nowrap pl-4 pr-2 scrollbar-none">
                    {profiles.map((profile, idx) => (
                        <div
                            key={profile?.id || idx}
                            className="inline-block align-top mr-4"
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