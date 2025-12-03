'use client';

import React from 'react';
import { UserTensor } from '@/types';
import { TensorCard } from './TensorCard';
import { Brain, Globe, Heart, Sparkles, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserTensorVisualizationProps {
    tensor: UserTensor;
}

export function UserTensorVisualization({ tensor }: UserTensorVisualizationProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto p-6">
            {/* Header / Identity */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full mb-8 text-center"
            >
                <h1 className="text-4xl font-light tracking-tight text-white mb-2">
                    Quantum Identity Tensor
                </h1>
                <p className="text-white/50 font-mono text-sm">
                    ID: {tensor.user_id} • T: {new Date(tensor.timestamp).toLocaleTimeString()}
                </p>
            </motion.div>

            {/* Cultural Coordinates */}
            <TensorCard title="Cultural Coordinates" icon={<Globe className="w-5 h-5" />} delay={0.1}>
                <div className="space-y-4">
                    <div>
                        <span className="text-xs uppercase tracking-wider text-white/40">Heritage</span>
                        <ul className="mt-1 space-y-1">
                            {tensor.cultural_coordinates.heritage.map((h: any, i) => (
                                <li key={i} className="flex justify-between items-center bg-white/5 p-2 rounded">
                                    <span>{h.region || h.context}</span>
                                    {h.weight && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">{h.weight}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <span className="text-xs uppercase tracking-wider text-white/40">Linguistics</span>
                        <div className="mt-1 grid grid-cols-3 gap-2 text-center">
                            <div className="bg-white/5 p-2 rounded">
                                <div className="text-xs text-white/40">Primary</div>
                                <div>{tensor.cultural_coordinates.linguistics.primary}</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <div className="text-xs text-white/40">Secondary</div>
                                <div>{tensor.cultural_coordinates.linguistics.secondary}</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <div className="text-xs text-white/40">Switching</div>
                                <div className="text-xs truncate">{tensor.cultural_coordinates.linguistics.code_switching_patterns.frequency}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </TensorCard>

            {/* Emotional Landscape */}
            <TensorCard title="Emotional Landscape" icon={<Heart className="w-5 h-5" />} delay={0.2}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-center">
                        <div className="text-xs text-rose-300 mb-1">Dominant</div>
                        <div className="font-medium text-rose-100">{tensor.emotional_landscape.current_state.dominant_emotion}</div>
                    </div>
                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg text-center">
                        <div className="text-xs text-indigo-300 mb-1">Valence</div>
                        <div className="font-medium text-indigo-100">{tensor.emotional_landscape.current_state.valence}</div>
                    </div>
                </div>
                <div>
                    <span className="text-xs uppercase tracking-wider text-white/40">Active Conflicts</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tensor.emotional_landscape.active_conflicts.map((c, i) => (
                            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full border border-white/5">
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </TensorCard>

            {/* Intellectual Frameworks */}
            <TensorCard title="Intellectual Frameworks" icon={<Brain className="w-5 h-5" />} delay={0.3}>
                <div className="space-y-3">
                    <div>
                        <span className="text-xs uppercase tracking-wider text-white/40">Disciplines</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {tensor.intellectual_frameworks.disciplines.map((d, i) => (
                                <span key={i} className="text-xs text-indigo-200 bg-indigo-900/30 px-2 py-1 rounded">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-xs uppercase tracking-wider text-white/40">Core Concepts</span>
                        <ul className="mt-1 space-y-1 text-sm text-white/60">
                            {tensor.intellectual_frameworks.core_concepts.map((c, i) => (
                                <li key={i}>• {c}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </TensorCard>

            {/* Creative Voice */}
            <TensorCard title="Creative Voice" icon={<Sparkles className="w-5 h-5" />} delay={0.4}>
                <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-lg">
                        <span className="text-xs text-white/40 block mb-1">Syntax & Rhythm</span>
                        <p className="text-sm italic text-white/80">"{tensor.creative_voice.syntax_rhythm}"</p>
                    </div>
                    <div>
                        <span className="text-xs uppercase tracking-wider text-white/40">Recurring Motifs</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tensor.creative_voice.recurring_motifs.map((m, i) => (
                                <span key={i} className="text-xs border border-purple-500/30 text-purple-200 px-2 py-1 rounded-full">
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </TensorCard>

            {/* Contextual Signals */}
            <TensorCard title="Contextual Signals" icon={<Clock className="w-5 h-5" />} delay={0.5}>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <div className="text-2xl font-light text-white">{tensor.contextual_signals.local_time}</div>
                        <div className="text-xs text-white/40">Local Time</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-rose-300">{tensor.contextual_signals.heart_rate} <span className="text-xs">BPM</span></div>
                        <div className="text-xs text-white/40">Biometrics</div>
                    </div>
                </div>
                <div>
                    <span className="text-xs uppercase tracking-wider text-white/40">Recent Consumption</span>
                    <ul className="mt-2 space-y-1 text-sm text-white/60">
                        {tensor.contextual_signals.recent_consumption.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <BookOpen className="w-3 h-3 text-white/30" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </TensorCard>
        </div>
    );
}
