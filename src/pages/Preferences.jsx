import PreferenceSlider from "../components/PreferenceSlider.jsx";
import {useEffect, useState} from "react";
import PageHeader from "../components/ui/PageHeader.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";

function Preferences() {

    const [hiphop, setHiphop] = useState(50);
    const [pop, setPop] = useState(50);
    const [rock, setRock] = useState(50);

    const tabs = [
        { key: "genres", label: "Genres" },
        { key: "artists", label: "Artists" },
        { key: "songs", label: "Songs" }
    ];

    //Start with empty lists, fetch request will fill them from database
    const [lists, setLists] = useState({
        genres: [],
        artists: [],
        songs: []
    });
    //Start at genres tab when reloading page
    const [activeTab, setActiveTab] = useState("genres");

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    //Fetch request for getting blacklist items per user
    const fetchLists = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${BASE_URL}/blacklist`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "X-API-Key": API_KEY
                },
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.message || "Failed to fetch blacklist");
                return;
            }

            const formatted = {
                genres: [],
                artists: [],
                songs: []
            };

            data.entries.forEach(entry => {
                if (entry.type === "genre") formatted.genres.push(entry);
                if (entry.type === "artist") formatted.artists.push(entry);
                if (entry.type === "track") formatted.songs.push(entry);
            });

            setLists(formatted);

        } catch (err) {
            console.error("Can't connect to server", err);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    //Fetch request for deleting items in blacklist per user
    const removeItem = async (entryId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${BASE_URL}/blacklist/${entryId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "X-API-Key": API_KEY,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to delete");

            // update lists state with new blacklist
            setLists({
                genres: data.entries.filter(e => e.type === "genre"),
                artists: data.entries.filter(e => e.type === "artist"),
                songs: data.entries.filter(e => e.type === "track"),
            });

        } catch (err) {
            console.error("Error deleting item", err);
        }
    };

    return (
        <>
            <PageHeader title="Preferences"/>

            <section className="mb-12">
                <PreferenceSlider label="Hiphop" value={hiphop} onChange={setHiphop}/>
                <PreferenceSlider label="Pop" value={pop} onChange={setPop}/>
                <PreferenceSlider label="Rock" value={rock} onChange={setRock}/>
            </section>

            <section className="m-4">

                <div className="flex w-full items-center gap-4">
                    <div className="basis-2/3">
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
                            className={`px-4 py-2 rounded-lg transition text-text-primary ${
                                activeTab === tab.key
                                    ? "bg-primary border-2"
                                    : "bg-secondary"
                            }`}
                        >
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
                            <ul
                                key={tab.key}
                                className="relative min-w-full space-y-2 p-6 bg-tertiary rounded-xl pb-16 min-h-48"
                            >

                                {lists[tab.key]?.slice(0,5).map((item) => (
                                    <li
                                        key={item._id}
                                        className="p-2 bg-text-primary rounded shadow flex justify-between items-center"
                                    >
                                        <span>{item.value}</span>

                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="text-red-500 font-bold"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}

                                <button
                                    onClick={async () => {
                                        const value = prompt("Add item");
                                        if (!value) return;

                                        //Fetch request for POSTing new item in blacklist per user
                                        try {
                                            const value = prompt("Add item");
                                            if (!value) return;

                                            const newItem = {
                                                type: activeTab === "songs" ? "track" : activeTab.slice(0, -1),
                                                value: value
                                            };

                                            const response = await fetch(`${BASE_URL}/blacklist`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                    "X-API-Key": API_KEY
                                                },
                                                body: JSON.stringify(newItem)
                                            });

                                            const data = await response.json();
                                            if (!response.ok) throw new Error(data.message || "Failed to add");
                                            
                                            setLists({
                                                genres: data.entries.filter(e => e.type === "genre"),
                                                artists: data.entries.filter(e => e.type === "artist"),
                                                songs: data.entries.filter(e => e.type === "track")
                                            });

                                        } catch (err) {
                                            console.error("Error adding item", err);
                                        }
                                    }}
                                    className="absolute bottom-4 right-4 px-4 py-2 bg-text-primary text-text-inverse rounded-lg text-2xl shadow-lg"
                                >
                                    +
                                </button>
                            </ul>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Preferences;