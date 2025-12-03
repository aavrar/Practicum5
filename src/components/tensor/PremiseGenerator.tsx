'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, BookOpen } from 'lucide-react';
import { UserTensor } from '@/types';
import { NarrativeWeaver } from './NarrativeWeaver';

interface PremiseGeneratorProps {
    tensor: UserTensor;
}

interface Premise {
    title: string;
    logline: string;
    context: string;
    stylistic_note: string;
}

export function PremiseGenerator({ tensor }: PremiseGeneratorProps) {
    const [loading, setLoading] = useState(false);
    const [premise, setPremise] = useState<Premise | null>(null);

    const generatePremise = async () => {
        setLoading(true);
        setPremise(null);
        try {
            const res = await fetch('/api/generate-premise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tensor),
            });
            const data = await res.json();
            setPremise(data);
        } catch (error) {
            console.error('Failed to generate', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-12 mb-20">
            <div className="text-center mb-8">
                <button
                    onClick={generatePremise}
                    disabled={loading}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        {loading ? 'Blending Networks...' : 'Generate Quantum Premise'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>
            </div>

            <AnimatePresence mode="wait">
                {premise && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                        <div className="mb-6">
                            <h2 className="text-2xl font-light text-white mb-2">{premise.title}</h2>
                            <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider">
                                <BookOpen className="w-3 h-3" />
                                Generated Narrative Seed
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-indigo-300 mb-2">Logline</h3>
                                <p className="text-lg text-white/90 leading-relaxed font-serif italic">
                                    "{premise.logline}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Contextual Origin</h3>
                                    <p className="text-sm text-white/70">{premise.context}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Stylistic Direction</h3>
                                    <p className="text-sm text-white/70">{premise.stylistic_note}</p>
                                </div>
                            </div>
                        </div>

                        <NarrativeWeaver tensor={tensor} premise={premise} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
