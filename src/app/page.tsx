"use client"

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function TerminalLanding() {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [viewportHeight, setViewportHeight] = useState("100vh");
  const offset = useRef({ x: 0, y: 0 });

  // Fix 100vh issue on mobile
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      setViewportHeight(`calc(var(--vh, 1vh) * 100)`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  // Center window on first load
  useEffect(() => {
    const centerWindow = () => {
      if (!windowRef.current) return;

      const width = windowRef.current?.offsetWidth || 0;
      const height = windowRef.current?.offsetHeight || 0;

      const x = (window.innerWidth - width) / 2;
      const y = (window.innerHeight - height) / 2;

      setPosition({ x, y });
    };

    const timeout = setTimeout(centerWindow, 0);
    return () => clearTimeout(timeout);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 0);
    const maxY = window.innerHeight - (windowRef.current?.offsetHeight || 0);

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    newX = Math.max(16, Math.min(newX, maxX - 16));
    newY = Math.max(16, Math.min(newY, maxY - 16));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  });

  return (
    <div
      style={{ height: viewportHeight }}
      className="relative w-full bg-[#05080a] overflow-hidden"
    >
      {/* Fixed Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-125 h-125 sm:w-200 sm:h-200 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      {/* Draggable Window */}
      <motion.div
        ref={windowRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ left: position.x, top: position.y }}
        className="absolute w-[90%] max-w-md sm:max-w-xl bg-black/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10"
      >
        {/* Title Bar */}
        <div
          onPointerDown={handlePointerDown}
          className="flex items-center gap-2 px-4 py-3 border-b border-white/10 cursor-grab active:cursor-grabbing select-none"
        >
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500" />
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500" />
        </div>

        {/* Terminal Content */}
        <div className="px-5 py-6 sm:px-10 sm:py-8">
          <div className="text-gray-300 font-mono text-sm sm:text-lg wrap-break-word">
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
      <div className="absolute bottom-6 sm:bottom-8 text-xs sm:text-sm font-mono text-gray-400 tracking-wide text-center w-full px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a href="https://x.com/pranitbmane" className="hover:text-white transition-colors duration-300">x</a>
          <span>·</span>
          <a href="https://youtube.com/@pranitmane" className="hover:text-white transition-colors duration-300">youtube</a>
          <span>·</span>
          <a href="https://github.com/pranitmane" className="hover:text-white transition-colors duration-300">github</a>
          <span>·</span>
          <a href="https://pranitmane.com" className="hover:text-white transition-colors duration-300">portfolio</a>
        </div>
      </div>
    </div>
  );
}