import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  path: string;
}

export default function PageTransition({ children, path }: PageTransitionProps) {
  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative z-10 w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
