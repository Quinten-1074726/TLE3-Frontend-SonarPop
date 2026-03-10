import PreferenceSlider from "../components/PreferenceSlider.jsx";
import {useEffect, useState} from "react";
import PageHeader from "../components/ui/PageHeader.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";

function Preferences() {
    const [hiphop, setHiphop] = useState(20); // Hier komt later back-end data voor binnen
    const [pop, setPop] = useState(20); // Hier komt later back-end data voor binnen
    const [rock, setRock] = useState(20); // Hier komt later back-end data voor binnen

    // DUMMY DATA
    const dummyLists = {
        genres: ["Rock", "Pop"], //Verwacht blacklisted genres in array
        artists: ["Artist A", "Artist B"], //Verwacht blacklisted artists in array
        songs: ["Song 1", "Song 2"] //Verwacht blacklisted songs in array
    };
    const tabs = [
        { key: "genres", label: "Genres" },
        { key: "artists", label: "Artists" },
        { key: "songs", label: "Songs" }
    ];

    const [lists, setLists] = useState(dummyLists);
    const [activeTab, setActiveTab] = useState("genres");

    const fetchLists = async () => {
        // straks:
        // const res = await fetch("/api/blacklist") ? ofzoiets
        // const data = await res.json()
        // setLists(data)

        setLists(dummyLists); // tijdelijk
    };

    useEffect(() => {
        fetchLists();
    }, []);

    const removeItem = async (index) => {
        // straks:
        // await fetch(`/api/blacklist/${id}`, { method: "DELETE" })

        setLists(prev => ({
            ...prev,
            [activeTab]: prev[activeTab].filter((_, i) => i !== index)
        }));
    };

    return(
        <>
            <PageHeader title="Preferences" />

            <section className="mb-12">
                <PreferenceSlider label="Hiphop" value={hiphop} onChange={setHiphop} />
                <PreferenceSlider label="Pop" value={pop} onChange={setPop} />
                <PreferenceSlider label="Rock" value={rock} onChange={setRock} />
            </section>
            <section className="m-4">
                <div className="flex w-full items-center gap-4">
                    <div className="basis-2/3 ">
                        <p className="text-xl text-text-primary font-bold mb-2">Blacklist</p>
                        <p className="font-semibold text-text-primary text-xs">
                            Excluded from recommendations
                        </p>
                    </div>
                    <div className="basis-1/3">
                        <PrimaryButton>View all</PrimaryButton>
                    </div>
                </div>
                <div className="flex gap-2 mb-4 justify-center my-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-lg transition ${
                                activeTab === tab.key
                                    ? "bg-primary text-text-primary"
                                    : "bg-secondary"
                            }`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300"
                        style={{
                            transform: `translateX(-${
                                tabs.findIndex(t => t.key === activeTab) * 100
                            }%)`
                        }}
                    >
                        {tabs.map(tab => (
                            <ul key={tab.key} className="relative min-w-full space-y-2 p-6 bg-tertiary rounded-xl pb-16 min-h-48">
                                {lists[tab.key]?.slice(0, 5).map((item, j) => (
                                    <li key={j} className="p-2 bg-text-primary rounded shadow flex justify-between items-center">
                                        <span>{item}</span>
                                        <button onClick={() => removeItem(j)} className="text-red-500 font-bold">
                                            ✕
                                        </button>
                                    </li>
                                ))}
                                <button onClick={() => {
                                        const value = prompt("Add item");
                                        if (value) {
                                            setLists(prev => ({
                                                ...prev,
                                                [activeTab]: [...prev[activeTab], value]
                                            }));
                                        }
                                    }}
                                    className="absolute bottom-4 right-4 px-4 py-2 bg-text-primary text-text-inverse rounded-lg text-2xl shadow-lg">
                                    +
                                </button>
                            </ul>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Preferences;