import ProfileCard from "../components/ProfileCard.jsx";

function ProfileCarousel({ title, profiles }) {
    return (
        <>
            <p className="p-4 text-text-primary font-bold text-xl">{title}</p>
            <div className="overflow-x-auto flex gap-4 p-2 w-full max-w-107.5 snap-x snap-mandatory scrollbar-none">
                {profiles.map((profile, idx) => (
                    <div key={idx} className="shrink-0 snap-start">
                        <ProfileCard profile={profile} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProfileCarousel;