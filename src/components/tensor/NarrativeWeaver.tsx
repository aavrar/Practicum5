'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Feather, Info } from 'lucide-react';
import { UserTensor } from '@/types';

interface NarrativeWeaverProps {
    tensor: UserTensor;
    premise: any;
}

export function NarrativeWeaver({ tensor, premise }: NarrativeWeaverProps) {
    const [loading, setLoading] = useState(false);
    const [scene, setScene] = useState<any>(null);

    const generateScene = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/generate-scene', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tensor, premise }),
            });
            const data = await res.json();
            setScene(data);
        } catch (error) {
            console.error('Failed to generate scene', error);
        } finally {
            setLoading(false);
        }
    };

    if (!premise) return null;

    return (
        <div className="mt-8 border-t border-white/10 pt-8">
            {!scene ? (
                <div className="text-center">
                    <button
                        onClick={generateScene}
                        disabled={loading}
                        className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors flex items-center gap-2 mx-auto"
                    >
                        {loading ? (
                            <span className="animate-pulse">Weaving Narrative...</span>
                        ) : (
                            <>
                                <Feather className="w-4 h-4" />
                                Expand into Scene
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative bg-black/20 p-8 rounded-xl border border-white/5"
                >
                    <div className="prose prose-invert max-w-none">
                        <p className="text-xl leading-loose font-serif text-white/90">
                            {scene.scene}
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                        {scene.annotations.map((note: any, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full">
                                <Info className="w-3 h-3" />
                                {note.note}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
