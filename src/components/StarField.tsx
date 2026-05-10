'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  phase: number
  temp: number
  glow: boolean
}

interface Nebula {
  x: number
  y: number
  colors: [number, number, number][]
  phase: number
  size: number
  driftSpeed: number
}

interface Meteor {
  x: number
  y: number
  dx: number
  dy: number
  life: number
  maxLife: number
  length: number
}

function isDark() {
  return document.documentElement.classList.contains('dark')
}

function starRGB(temp: number): [number, number, number] {
  if (temp < 0.15) return [255, 180, 130]
  if (temp < 0.3) return [255, 210, 170]
  if (temp < 0.5) return [255, 235, 210]
  if (temp < 0.7) return [240, 240, 255]
  if (temp < 0.85) return [200, 210, 255]
  return [170, 190, 255]
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef(0)
  const meteorsRef = useRef<Meteor[]>([])
  const lastMeteorRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let nebula: Nebula[] = []
    let milkywayAngle = -0.4

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      milkywayAngle = canvas.width > canvas.height ? -0.3 : -0.5
      initStars()
      initNebula()
    }

    function initStars() {
      if (!canvas) return
      const density = 2500
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / density),
        600
      )

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      stars = Array.from({ length: count }, (_, i) => {
        const angle = milkywayAngle + (Math.random() - 0.5) * 0.3
        const dist = Math.random() * canvas.width * 0.7

        let x: number
        let y: number

        if (i < count * 0.4) {
          const t = Math.random() * Math.PI * 2
          const r = Math.random() * canvas.width * 0.3 + canvas.width * 0.05
          x = cx + Math.cos(t) * r * (1 + Math.sin(angle) * 0.3)
          y = cy + Math.sin(t) * r * 0.3
        } else {
          x = Math.random() * canvas.width
          y = Math.random() * canvas.height
        }

        return {
          x,
          y,
          size: Math.random() * 2.0 + 0.2,
          opacity: Math.random() * 0.5 + 0.15,
          phase: Math.random() * Math.PI * 2,
          temp: Math.random(),
          glow: Math.random() < 0.06,
        }
      })
    }

    function initNebula() {
      if (!canvas) return
      nebula = [
        {
          x: canvas.width * 0.15,
          y: canvas.height * 0.25,
          colors: [[120, 50, 200], [60, 30, 140], [180, 80, 220]],
          phase: 0,
          size: 400,
          driftSpeed: 0.03,
        },
        {
          x: canvas.width * 0.85,
          y: canvas.height * 0.6,
          colors: [[200, 60, 100], [140, 40, 80], [220, 100, 150]],
          phase: 2,
          size: 350,
          driftSpeed: 0.04,
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.75,
          colors: [[40, 80, 200], [30, 50, 150], [60, 120, 220]],
          phase: 4,
          size: 380,
          driftSpeed: 0.025,
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.15,
          colors: [[60, 160, 180], [30, 100, 130], [80, 190, 210]],
          phase: 1,
          size: 300,
          driftSpeed: 0.035,
        },
        {
          x: canvas.width * 0.35,
          y: canvas.height * 0.5,
          colors: [[180, 100, 60], [140, 70, 40], [210, 140, 80]],
          phase: 3,
          size: 320,
          driftSpeed: 0.02,
        },
      ]
    }

    function spawnMeteor() {
      if (!canvas) return
      const angle = Math.PI * 0.25 + Math.random() * Math.PI * 0.1
      const speed = 6 + Math.random() * 4
      const startX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1
      const startY = Math.random() * canvas.height * 0.3

      meteorsRef.current.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        length: 60 + Math.random() * 40,
      })
    }

    function drawMilkyWay(dark: boolean) {
      if (!canvas || !ctx) return
      if (!dark) return
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 30
        const grad = ctx.createRadialGradient(
          cx + offset, cy + offset * 0.3, 0,
          cx + offset, cy + offset * 0.3, canvas.width * 0.45
        )
        grad.addColorStop(0, `rgba(200, 180, 255, ${0.015 - i * 0.002})`)
        grad.addColorStop(1, 'rgba(200, 180, 255, 0)')
        ctx.fillStyle = grad
        ctx.rotate(milkywayAngle)
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
      }
    }

    function animate() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = performance.now() * 0.001
      const mx = (mouseRef.current.x - canvas.width / 2) / canvas.width
      const my = (mouseRef.current.y - canvas.height / 2) / canvas.height
      const dark = isDark()

      if (dark) {
        drawMilkyWay(dark)

        for (const n of nebula) {
          const dx = Math.sin(time * n.driftSpeed + n.phase) * 80
          const dy = Math.cos(time * n.driftSpeed * 0.7 + n.phase * 1.3) * 80
          const nx = n.x + dx
          const ny = n.y + dy

          for (let c = 0; c < n.colors.length; c++) {
            const [r, g, b] = n.colors[c]
            const grad = ctx.createRadialGradient(
              nx + c * 20, ny + c * 15, 0,
              nx + c * 20, ny + c * 15, n.size * (1 - c * 0.15)
            )
            grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.035 - c * 0.008})`)
            grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${0.015 - c * 0.004})`)
            grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }
        }
      }

      for (const star of stars) {
        const twinkle = Math.sin(time * 0.7 + star.phase + Math.sin(time * 1.3 + star.phase * 2) * 0.3) * 0.25 + 0.75
        const parallax = star.size * 0.3
        const x = star.x + mx * parallax * 25
        const y = star.y + my * parallax * 25
        const alpha = star.opacity * twinkle

        const [r, g, b] = starRGB(star.temp)

        ctx.beginPath()
        ctx.arc(x, y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = dark
          ? `rgba(${r}, ${g}, ${b}, ${alpha})`
          : `rgba(30, 30, 40, ${alpha * 0.6})`
        ctx.fill()

        if (star.glow && dark) {
          ctx.beginPath()
          ctx.arc(x, y, star.size * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.12})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(x, y, star.size * 7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.04})`
          ctx.fill()
        }
      }

      if (dark && time - lastMeteorRef.current > 5 + Math.random() * 8) {
        spawnMeteor()
        lastMeteorRef.current = time
      }

      meteorsRef.current = meteorsRef.current.filter(m => {
        m.life++
        if (m.life > m.maxLife) return false

        const progress = m.life / m.maxLife
        const alpha = (1 - progress) * 0.8

        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(
          m.x - m.dx * m.length * (1 - progress) * 0.5,
          m.y - m.dy * m.length * (1 - progress) * 0.5
        )
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.lineWidth = 1.2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
        ctx.fill()

        m.x += m.dx
        m.y += m.dy

        return true
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    function onMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    frameRef.current = requestAnimationFrame(animate)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)

    const observer = new MutationObserver(resize)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
