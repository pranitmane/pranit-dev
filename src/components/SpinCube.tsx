"use client"

import { useEffect, useRef } from "react"

const SIZE = 88
const HALF = SIZE / 2
const IDLE_SPIN = 0.35

const faces = [
  { glyph: "अ", transform: `rotateY(0deg) translateZ(${HALF}px)` },
  { glyph: "नं", transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { glyph: "त", transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { glyph: "∞", transform: `rotateY(270deg) translateZ(${HALF}px)` },
  { glyph: "~", transform: `rotateX(90deg) translateZ(${HALF}px)` },
  { glyph: "$", transform: `rotateX(-90deg) translateZ(${HALF}px)` },
]

export default function SpinCube({ className }: { className?: string }) {
  const cubeRef = useRef<HTMLDivElement>(null)
  const state = useRef({
    rx: -18,
    ry: 30,
    vx: 0,
    vy: IDLE_SPIN,
    dragging: false,
    lastX: 0,
    lastY: 0,
  })

  useEffect(() => {
    let raf: number
    const tick = () => {
      const s = state.current
      if (!s.dragging) {
        // glide thrown velocity back to the idle spin
        s.vy += (IDLE_SPIN - s.vy) * 0.02
        s.vx += (0 - s.vx) * 0.02
        s.ry += s.vy
        s.rx += s.vx
      }
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e: PointerEvent) => {
      const s = state.current
      if (!s.dragging) return
      const dx = e.clientX - s.lastX
      const dy = e.clientY - s.lastY
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.ry += dx * 0.6
      s.rx -= dy * 0.6
      s.vy = dx * 0.6
      s.vx = -dy * 0.6
    }
    const onUp = () => {
      state.current.dragging = false
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])

  return (
    <div
      className={`bob cursor-grab select-none active:cursor-grabbing ${className ?? ""}`}
      style={{ width: SIZE, height: SIZE, perspective: 600, touchAction: "none" }}
      aria-hidden
      onPointerDown={(e) => {
        const s = state.current
        s.dragging = true
        s.lastX = e.clientX
        s.lastY = e.clientY
      }}
    >
      <div
        ref={cubeRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {faces.map((face) => (
          <div
            key={face.transform}
            className="absolute inset-0 flex items-center justify-center rounded-md border border-accent/25 bg-accent/4 font-mono text-2xl text-accent/70 backdrop-blur-sm"
            style={{ transform: face.transform }}
          >
            {face.glyph}
          </div>
        ))}
      </div>
    </div>
  )
}
