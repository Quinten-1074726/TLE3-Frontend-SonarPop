function PreferenceSlider({ label, value, onChange }) {
    return(
        <>
            <div className="p-4 rounded m-4">
                <p className="pb-2 text-text-primary font-bold">
                    {label}
                </p>

                <input
                    type="range"
                    min="0"
                    max="100"
                    step="20"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-text-primary accent-primary"
                />
            </div>
        </>
    )
}

export default PreferenceSlider;