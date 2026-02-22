import React, { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils" // <-- make sure this exists

// Mouse position hook
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}

function hexToRgb(hex) {
  hex = hex.replace("#", "")
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("")
  }
  const bigint = parseInt(hex, 16)
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const context = useRef(null)
  const circles = useRef([])
  const mousePosition = useMousePosition()
  const mouse = useRef({ x: 0, y: 0 })

  const canvasSize = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const rafID = useRef(null)
  const resizeTimeout = useRef(null)

  const rgb = hexToRgb(color)

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }

    initCanvas()
    animate()

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
      resizeTimeout.current = setTimeout(() => initCanvas(), 200)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      if (rafID.current) cancelAnimationFrame(rafID.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [color])

  useEffect(() => {
    onMouseMove()
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    initCanvas()
  }, [refresh])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const onMouseMove = () => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const { w, h } = canvasSize.current

    const x = mousePosition.x - rect.left - w / 2
    const y = mousePosition.y - rect.top - h / 2

    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
    if (inside) {
      mouse.current.x = x
      mouse.current.y = y
    }
  }

  const resizeCanvas = () => {
    if (!containerRef.current || !canvasRef.current || !context.current) return

    canvasSize.current.w = containerRef.current.offsetWidth
    canvasSize.current.h = containerRef.current.offsetHeight

    canvasRef.current.width = canvasSize.current.w * dpr
    canvasRef.current.height = canvasSize.current.h * dpr
    canvasRef.current.style.width = `${canvasSize.current.w}px`
    canvasRef.current.style.height = `${canvasSize.current.h}px`

    context.current.scale(dpr, dpr)

    circles.current = []
    for (let i = 0; i < quantity; i++) {
      const c = circleParams()
      drawCircle(c)
    }
  }

  const circleParams = () => {
    const x = Math.random() * canvasSize.current.w
    const y = Math.random() * canvasSize.current.h
    const s = size + Math.random()
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1

    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: s,
      alpha: 0,
      targetAlpha: Math.random() * 0.6 + 0.1,
      dx,
      dy,
      magnetism: 0.1 + Math.random() * 4,
    }
  }

  const clearCanvas = () => {
    if (!context.current) return
    context.current.clearRect(
      0,
      0,
      canvasSize.current.w,
      canvasSize.current.h
    )
  }

  const drawCircle = (circle, update = false) => {
    if (!context.current) return
    const { x, y, translateX, translateY, size, alpha } = circle

    context.current.translate(translateX, translateY)
    context.current.beginPath()
    context.current.arc(x, y, size, 0, Math.PI * 2)
    context.current.fillStyle = `rgba(${rgb.join(",")},${alpha})`
    context.current.fill()
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (!update) circles.current.push(circle)
  }

  const drawParticles = () => {
    clearCanvas()
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams())
    }
  }

  const animate = () => {
    clearCanvas()

    circles.current.forEach((circle, i) => {
      circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha)
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy

      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) -
          circle.translateX) /
        ease

      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) -
          circle.translateY) /
        ease

      drawCircle(circle, true)

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1)
        drawCircle(circleParams())
      }
    })

    rafID.current = requestAnimationFrame(animate)
  }

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={containerRef}
      {...props}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
