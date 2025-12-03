'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function MoodDial() {
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);
    const width = 300; // Width of the slider

    // Map x position to mood labels
    const mood = useTransform(x, [-width / 2, width / 2], ["Contemplative", "Urgent"]);
    const intensity = useTransform(x, [-width / 2, width / 2], ["Quiet", "Raw"]);

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <div className="flex justify-between w-[300px] text-xs font-sans tracking-widest uppercase opacity-40">
                <span>Contemplative</span>
                <span>Urgent</span>
            </div>

            <div className="relative h-1 w-[300px] bg-white/10 rounded-full flex items-center justify-center" ref={constraintsRef}>
                <motion.div
                    drag="x"
                    dragConstraints={{ left: -150, right: 150 }}
                    style={{ x }}
                    className="absolute w-4 h-4 bg-[rgb(var(--accent-rgb))] rounded-full cursor-grab active:cursor-grabbing shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                />
            </div>

            <div className="flex justify-between w-[300px] text-xs font-sans tracking-widest uppercase opacity-40">
                <span>Quiet</span>
                <span>Raw</span>
            </div>
        </div>
    );
}
