import Sjoerd from "../assets/sjoerd.jpg";

//Dit verwacht straks een song, artist en image van een album. Nu is 't Sjoerd.
function MusicCard() {
    return(
        <>
            <div className="w-40 rounded-xl overflow-hidden p-4 flex flex-col">
                <img src={Sjoerd} alt="Sjoerd" className="w-full h-28 object-cover rounded-2xl mb-4" />
                <p className="text-base font-bold text-text-primary truncate">Titel</p>
                <p className="text-sm font-light text-text-primary truncate">Nummer</p>
            </div>
        </>
    )
}

export default MusicCard;