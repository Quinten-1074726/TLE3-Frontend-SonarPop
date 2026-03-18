import React, { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Slider({ value, onChange }) {
    const inputId = useId();
    const valueLabels = {
        1: "Purely You",
        2: "Personal Mix",
        3: "Mixed",
        4: "Guided Discovery",
        5: "Full Discovery"
    };

    const textVariants = {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -5 },
    };

    return (
        <div className="p-4 bg-primary rounded-xl shadow-xl">
            <label
                htmlFor={inputId}
                className="block pb-2 text-text-primary font-bold"
            >
                Personalize
            </label>

            <input
                id={inputId}
                type="range"
                min="1"
                max="5"
                step="1"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                aria-valuetext={valueLabels[value]}
                className="
                    w-full h-2 rounded-lg bg-background accent-background
                    cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary
                "
            />

            <div className="flex justify-between mt-2" aria-hidden="true">
                <p className="text-[10px] uppercase tracking-wider text-text-primary opacity-70">Personalized</p>

                <div className="z-10 text-xs font-bold min-w-[120px] text-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={value}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="text-text-primary"
                        >
                            {valueLabels[value]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-text-primary opacity-70">Random</p>
            </div>
        </div>
    );
}

export default Slider;