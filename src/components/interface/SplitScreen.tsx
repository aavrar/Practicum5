'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserTensor } from '@/types';
import { MoodDial } from './MoodDial';
import { PremiseGenerator } from '../tensor/PremiseGenerator';

interface SplitScreenProps {
    tensor: UserTensor;
}

export function SplitScreen({ tensor }: SplitScreenProps) {
    const [text, setText] = useState('"Abbu looked at me—"');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-screen overflow-hidden"
        >
            {/* LEFT: Working Text (60%) */}
            <div className="w-[60%] h-full p-12 md:p-20 overflow-y-auto border-r border-white/5 bg-[rgb(var(--background-rgb))]">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none resize-none font-serif text-xl md:text-2xl leading-loose text-[rgb(var(--foreground-rgb))] placeholder-white/20 selection:bg-[rgb(var(--accent-rgb))]/20"
                    placeholder="Start writing..."
                    spellCheck={false}
                />
            </div>

            {/* RIGHT: The Conversation (40%) */}
            <div className="w-[40%] h-full bg-[#161618] p-8 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-8">
                    {/* System Message */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="font-serif text-[rgb(var(--foreground-rgb))] opacity-80 leading-relaxed italic"
                    >
                        <p className="mb-4">
                            This moment where he switches to Urdu—that's where the real break happens, right?
                        </p>
                        <p>
                            Try letting that sit for a beat longer?
                        </p>
                    </motion.div>

                    {/* Premise Generator Integration */}
                    <div className="pt-8 border-t border-white/5">
                        <h3 className="text-xs font-sans uppercase tracking-widest opacity-40 mb-4">Narrative Engine</h3>
                        <PremiseGenerator tensor={tensor} />
                    </div>
                </div>

                {/* Mood Dial at Bottom */}
                <div className="pt-8 border-t border-white/5">
                    <MoodDial />
                </div>
            </div>
        </motion.div>
    );
}
