import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Slider({ value, onChange }) {
    const textVariants ={
        initial: {opacity: 0, y:5},
        animate: {opacity: 1, y:0},
        exit: {opacity: 0, y:-5},
    }
    return (
        <div className="p-4 bg-primary rounded-xl shadow-xl">
            <p className="pb-2 text-text-primary font-bold">Personalize</p>

            <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-background accent-background"
            />

            <div className="flex justify-between mt-2">
                <p className="text-xs text-text-primary">Personalized</p>
                <div className="z-100 text-xs font-bold min-w-[120px] text-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={value}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                    {value === 0 && "Purely You"}
                    {value === 25 && "Personal Mix"}
                    {value === 50 && "Mixed"}
                    {value === 75 && "Guided Discovery"}
                    {value === 100 && "Full Discovery"}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <p className="text-xs text-text-primary">Random</p>
            </div>
        </div>
    );
}

export default Slider;