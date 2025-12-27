import { useRef, useEffect, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(InertiaPlugin)

/* ---------- utils ---------- */
const throttle = (fn, limit) => {
  let last = 0
  return (...args) => {
    const now = performance.now()
    if (now - last >= limit) {
      last = now
      fn(...args)
    }
  }
}

const hexToRgb = hex => {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!m) return { r: 0, g: 0, b: 0 }
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  }
}

/* ---------- component ---------- */
const DotGrid = ({
  dotSize = 2,
  gap = 15,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 120,
  speedTrigger = 200,
  shockRadius = 250,
  shockStrength = 2,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  })

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    const p = new Path2D()
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return p
  }, [dotSize])

  /* ---------- build grid ---------- */
  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const cell = dotSize + gap
    const cols = Math.floor((width + gap) / cell)
    const rows = Math.floor((height + gap) / cell)

    const gridW = cols * cell - gap
    const gridH = rows * cell - gap

    const startX = (width - gridW) / 2 + dotSize / 2
    const startY = (height - gridH) / 2 + dotSize / 2

    const dots = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          active: false
        })
      }
    }
    dotsRef.current = dots
  }, [dotSize, gap])

  /* ---------- draw loop ---------- */
  useEffect(() => {
    let raf
    const proxSq = proximity * proximity

    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x, y } = pointerRef.current

      for (const d of dotsRef.current) {
        const ox = d.cx + d.xOffset
        const oy = d.cy + d.yOffset
        const dx = d.cx - x
        const dy = d.cy - y
        const dsq = dx * dx + dy * dy

        let color = baseColor
        if (dsq < proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity
          color = `rgb(
            ${baseRgb.r + (activeRgb.r - baseRgb.r) * t},
            ${baseRgb.g + (activeRgb.g - baseRgb.g) * t},
            ${baseRgb.b + (activeRgb.b - baseRgb.b) * t}
          )`
        }

        ctx.save()
        ctx.translate(ox, oy)
        ctx.fillStyle = color
        ctx.fill(circlePath)
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [circlePath, proximity, baseRgb, activeRgb, baseColor])

  /* ---------- resize ---------- */
  useEffect(() => {
    buildGrid()
    const ro = new ResizeObserver(buildGrid)
    wrapperRef.current && ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [buildGrid])

  /* ---------- interaction (SCOPED, NOT WINDOW) ---------- */
  useEffect(() => {
    const wrap = wrapperRef.current
    if (!wrap) return

    const onMove = e => {
      const rect = wrap.getBoundingClientRect()
      const pr = pointerRef.current
      const now = performance.now()

      const dx = e.clientX - pr.lastX
      const dy = e.clientY - pr.lastY
      const dt = pr.lastTime ? now - pr.lastTime : 16

      pr.vx = (dx / dt) * 1000
      pr.vy = (dy / dt) * 1000
      pr.speed = Math.min(Math.hypot(pr.vx, pr.vy), maxSpeed)

      pr.lastX = e.clientX
      pr.lastY = e.clientY
      pr.lastTime = now
      pr.x = e.clientX - rect.left
      pr.y = e.clientY - rect.top

      if (pr.speed < speedTrigger) return

      dotsRef.current.forEach(d => {
        const dist = Math.hypot(d.cx - pr.x, d.cy - pr.y)
        if (dist < proximity && !d.active) {
          d.active = true
          gsap.to(d, {
            inertia: {
              xOffset: (d.cx - pr.x) * 0.6,
              yOffset: (d.cy - pr.y) * 0.6,
              resistance
            },
            onComplete: () => {
              gsap.to(d, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)',
                onComplete: () => (d.active = false)
              })
            }
          })
        }
      })
    }

    const onClick = e => {
      const rect = wrap.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top

      dotsRef.current.forEach(d => {
        const dist = Math.hypot(d.cx - cx, d.cy - cy)
        if (dist < shockRadius && !d.active) {
          d.active = true
          gsap.to(d, {
            inertia: {
              xOffset: (d.cx - cx) * shockStrength,
              yOffset: (d.cy - cy) * shockStrength,
              resistance
            },
            onComplete: () => {
              gsap.to(d, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)',
                onComplete: () => (d.active = false)
              })
            }
          })
        }
      })
    }

    const throttledMove = throttle(onMove, 50)
    wrap.addEventListener('mousemove', throttledMove)
    wrap.addEventListener('click', onClick)

    return () => {
      wrap.removeEventListener('mousemove', throttledMove)
      wrap.removeEventListener('click', onClick)
    }
  }, [
    proximity,
    speedTrigger,
    shockRadius,
    shockStrength,
    resistance,
    returnDuration,
    maxSpeed
  ])

  /* ---------- render ---------- */
return (
  <section className="absolute inset-0">
    <div ref={wrapperRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  </section>
)



}

export default DotGrid
