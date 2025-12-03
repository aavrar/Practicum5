'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserTensor } from '@/types';
import { Activity, Moon, Sun, Cloud } from 'lucide-react';

interface AmbientHomeProps {
    tensor: UserTensor;
    onStart: () => void;
}

export function AmbientHome({ tensor, onStart }: AmbientHomeProps) {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 5) setGreeting('Good evening, Aahad.'); // Late night is "evening" in this context
        else if (hour < 12) setGreeting('Good morning, Aahad.');
        else if (hour < 18) setGreeting('Good afternoon, Aahad.');
        else setGreeting('Good evening, Aahad.');
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
        >
            <div className="max-w-2xl w-full space-y-12">
                {/* Greeting & State */}
                <div className="space-y-8">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-4xl md:text-6xl font-serif text-[rgb(var(--foreground-rgb))] tracking-tight leading-tight"
                    >
                        {greeting}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex flex-col items-center gap-4 text-[rgb(var(--foreground-rgb))] opacity-60 font-sans text-sm tracking-widest uppercase"
                    >
                        <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-[rgb(var(--accent-rgb))]" />
                            <span>Your pulse is steady tonight</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Moon className="w-4 h-4" />
                            <span>The house is quiet</span>
                        </div>
                    </motion.div>
                </div>

                {/* Contextual Prompt */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="relative py-8 px-6"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-[rgb(var(--accent-rgb))] opacity-30" />
                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-[rgb(var(--foreground-rgb))] opacity-90">
                        "You've been thinking about family structures lately—<br />
                        the weight of eldest sons, inherited expectations.<br />
                        Want to explore that?"
                    </p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-transparent to-[rgb(var(--accent-rgb))] opacity-30" />
                </motion.div>

                {/* Options */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 1 }}
                    className="flex flex-col gap-4 items-center"
                >
                    <button
                        onClick={onStart}
                        className="group flex items-center gap-3 px-6 py-3 text-[rgb(var(--foreground-rgb))] hover:text-[rgb(var(--accent-rgb))] transition-colors duration-500 font-sans text-sm tracking-widest uppercase"
                    >
                        <span className="w-1 h-1 rounded-full bg-[rgb(var(--accent-rgb))] opacity-0 group-hover:opacity-100 transition-opacity" />
                        Start something new
                    </button>
                    <button className="group flex items-center gap-3 px-6 py-3 text-[rgb(var(--foreground-rgb))] opacity-60 hover:opacity-100 transition-all duration-500 font-sans text-sm tracking-widest uppercase">
                        <span className="w-1 h-1 rounded-full bg-[rgb(var(--accent-rgb))] opacity-0 group-hover:opacity-100 transition-opacity" />
                        Continue "The Best of Sons"
                    </button>
                    <button className="group flex items-center gap-3 px-6 py-3 text-[rgb(var(--foreground-rgb))] opacity-60 hover:opacity-100 transition-all duration-500 font-sans text-sm tracking-widest uppercase">
                        <span className="w-1 h-1 rounded-full bg-[rgb(var(--accent-rgb))] opacity-0 group-hover:opacity-100 transition-opacity" />
                        Just listen
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
