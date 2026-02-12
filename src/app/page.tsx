"use client"
import { motion } from "framer-motion";

export default function TerminalLanding() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#05080a] overflow-hidden px-4">
      {/* Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Terminal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md sm:max-w-xl bg-black/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5"
      >
        {/* MacOS Controls */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500" />
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500" />
        </div>

        {/* Terminal Content */}
        <div className="px-5 py-6 sm:px-10 sm:py-8">
          <div className="text-gray-400 font-mono text-sm sm:text-lg break-words">
            <span>PranitMane</span>
            <span className="mx-2">$</span>
            <span className="text-emerald-400">cat now.txt</span>
          </div>

          <div className="mt-4 text-emerald-400 font-mono text-sm sm:text-lg flex items-center">
            <span>building something...</span>
            <motion.span
              className="ml-2 w-1.5 h-4 sm:w-2 sm:h-5 bg-emerald-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Socials */}
      <div className="absolute bottom-6 sm:bottom-8 text-xs sm:text-sm font-mono text-gray-500 tracking-wide text-center w-full px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a href="#" className="hover:text-white transition-colors duration-300">x</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors duration-300">youtube</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors duration-300">github</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors duration-300">portfolio</a>
        </div>
      </div>
    </div>
  );
}