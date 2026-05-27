import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Bug } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';

export const NotFound = () => {
  return (
    <MotionWrapper className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-6 select-none relative overflow-hidden">
      
      {/* Dynamic Cyber Orbs backdrop specifically for 404 */}
      <div className="absolute inset-0 cyber-grid-overlay opacity-10 pointer-events-none"></div>
      <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

      {/* Futuristic glitch graphics icon */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/2 border border-red-500/25 flex items-center justify-center shadow-glow-red">
          <Bug className="w-8 h-8 text-red-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Glitch error title */}
      <div className="space-y-2.5 z-10">
        <h1 className="text-7xl font-bold font-display text-red-500 tracking-tight animate-pulse text-glow-violet">404</h1>
        <h2 className="text-xl font-bold font-display text-white">ANOMALY BLOCK EXCLUSION</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          The routing sector address requested does not correspond to an established active database node address.
        </p>
      </div>

      {/* Recovery action button */}
      <div className="z-10 pt-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-xs hover:opacity-95 shadow-glow-cyan active:scale-[0.98] transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Recover Controller Session</span>
        </Link>
      </div>

      {/* Tech audit log footer */}
      <div className="absolute bottom-6 font-mono text-[9px] text-gray-600 uppercase tracking-widest z-10 pointer-events-none">
        SECTOR_ADDR: 0x88FFA80 // STATUS: GATEWAY_ANOMALY
      </div>

    </MotionWrapper>
  );
};

export default NotFound;
