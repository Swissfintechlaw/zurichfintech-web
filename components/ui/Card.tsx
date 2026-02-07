'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
