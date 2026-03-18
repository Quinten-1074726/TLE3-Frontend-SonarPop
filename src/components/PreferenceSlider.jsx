// components/PreferenceSlider.jsx
import React from "react";

/**
 * PreferenceSlider component
 *
 * - Gebruikt 10 standen (0-9) voor het gewicht van een genre
 * - Laat label zien onder de slider (Very Low → Extreme)
 * - Zorgt dat value altijd correct wordt omgezet naar stepIndex
 */
function PreferenceSlider({ label, value, onChange }) {
    const stepCount = 10;      // 10 standen
    const maxWeight = 2.0;     // max gewicht dat backend accepteert
    const stepSize = maxWeight / (stepCount - 1);

    // Convert backend value naar stepIndex (0-9)
    const stepIndex = Math.min(stepCount - 1, Math.round(value / stepSize));

    const weightLabels = [
        "Very Low","Low","Low-Medium","Medium-Low","Medium",
        "Medium-High","High-Medium","High","Very High","Extreme"
    ];

    return (
        <div className="p-4 rounded m-4">
            <p className="pb-2 text-text-primary font-bold capitalize">{label}</p>

            <input
                type="range"
                min={0}
                max={stepCount - 1}
                step={1}
                value={stepIndex}
                onChange={(e) => {
                    const newValue = Number(e.target.value) * stepSize;
                    onChange(newValue);
                }}
                className="w-full h-2 rounded-lg bg-text-primary accent-primary"
            />

            {/* Label toont gebruiker hoe "sterk" dit genre weegt */}
            <p className="text-sm text-text-primary mt-1 text-center">
                {weightLabels[stepIndex]}
            </p>
        </div>
    );
}

export default PreferenceSlider;