function Slider({ value, onChange }) {
    return (
        <div className="p-4 bg-primary rounded-xl shadow-xl">
            <p className="pb-2 text-text-primary font-bold">Personalize</p>

            <input
                type="range"
                min="0"
                max="100"
                step="20"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-background accent-background"
            />

            <div className="flex justify-between mt-2">
                <p className="text-xs text-text-primary">Personalized</p>
                <p className="text-xs text-text-primary">Random</p>
            </div>
        </div>
    );
}

export default Slider;