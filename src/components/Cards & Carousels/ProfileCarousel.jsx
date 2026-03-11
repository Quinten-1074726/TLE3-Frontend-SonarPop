import ProfileCard from "./ProfileCard.jsx";

function ProfileCarousel({ title, profiles = [] }) {
    return (
        <section className="w-full">
            <p className="px-8 text-text-primary font-bold text-2xl mb-3">
                {title}
            </p>

            <div className="overflow-x-auto flex gap-6 px-8 snap-x snap-mandatory scrollbar-none">
                {profiles.length === 0 ? (
                    <p className="text-sm text-white/60">Nog geen vrienden gevonden.</p>
                ) : (
                    profiles.map((profile, idx) => (
                        <div
                            key={profile?.id || idx}
                            className="shrink-0 snap-start"
                        >
                            <ProfileCard profile={profile} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default ProfileCarousel;