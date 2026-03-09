import PreferenceSlider from "../components/PreferenceSlider.jsx";
import {useState} from "react";

function Preferences() {
    const [hiphop, setHiphop] = useState(20); // Hier komt later back-end data voor binnen
    const [pop, setPop] = useState(20); // Hier komt later back-end data voor binnen
    const [rock, setRock] = useState(20); // Hier komt later back-end data voor binnen

    return(
        <>
            <PreferenceSlider label="Hiphop" value={hiphop} onChange={setHiphop} />
            <PreferenceSlider label="Pop" value={pop} onChange={setPop} />
            <PreferenceSlider label="Rock" value={rock} onChange={setRock} />
        </>
    )
}

export default Preferences;