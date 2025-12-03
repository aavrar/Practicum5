'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TensorCardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function TensorCard({ title, icon, children, className, delay = 0 }: TensorCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={twMerge(
                "bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-hidden relative group",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    {icon && <div className="text-indigo-400">{icon}</div>}
                    <h3 className="text-lg font-medium text-white/90 tracking-wide">{title}</h3>
                </div>
                <div className="text-sm text-white/70 space-y-2">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
