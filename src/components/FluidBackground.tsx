import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

/**
 * "Ink in water": domain-warped fractal noise in the site palette (paper,
 * sage, blue, clay, forest). The cursor swirls the field; scroll drifts it.
 */
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uVel; uniform float uScroll;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(17.1, 9.2); a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(asp, 1.0) * 3.4; p.y += uScroll * 3.0;
  vec2 m = (uMouse - 0.5) * vec2(asp, 1.0) * 3.4; m.y += uScroll * 3.0;
  vec2 d = p - m;
  float f = exp(-dot(d, d) * 2.5) * uVel;
  p += vec2(-d.y, d.x) * f * 1.6;
  float t = uTime * 0.05;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.8 * t), fbm(p + 3.0 * q + vec2(8.3, 2.8) - 0.7 * t));
  float v = fbm(p + 3.0 * r);
  // fbm clusters around the middle, so stretch each field to use the full 0..1 range
  v = clamp((v - 0.3) * 2.2, 0.0, 1.0);
  r = clamp((r - 0.3) * 2.2, 0.0, 1.0);
  q = clamp((q - 0.3) * 2.2, 0.0, 1.0);
  // The kit: paper, soft blue mist, royal blue, burgundy, gold, navy
  vec3 paper = vec3(0.980, 0.973, 0.961);
  vec3 mist = vec3(0.725, 0.780, 0.871);
  vec3 royal = vec3(0.000, 0.302, 0.596);
  vec3 burgundy = vec3(0.647, 0.000, 0.267);
  vec3 gold = vec3(0.929, 0.733, 0.000);
  vec3 navy = vec3(0.047, 0.133, 0.314);
  vec3 col = mix(paper, mist, smoothstep(0.22, 0.7, v) * 0.7);
  col = mix(col, royal, smoothstep(0.4, 0.85, r.x) * 0.16);
  col = mix(col, burgundy, smoothstep(0.5, 0.95, q.x) * 0.14);
  col = mix(col, gold, smoothstep(0.55, 0.95, q.y) * 0.2);
  col = mix(col, navy, smoothstep(0.62, 0.95, v) * 0.12);
  float line = smoothstep(0.46, 0.5, abs(fract(v * 8.0) - 0.5));
  col = mix(col, navy, line * 0.06);
  gl_FragColor = vec4(col, 1.0);
}`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

/** Full-screen, fixed WebGL backdrop. Static single frame under reduced motion; CSS fallback without WebGL. */
export function FluidBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!canvas || !gl) {
      setSupported(false)
      return
    }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vs || !fs || !program) {
      setSupported(false)
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      vel: gl.getUniformLocation(program, 'uVel'),
      scroll: gl.getUniformLocation(program, 'uScroll'),
    }

    // Render at half resolution: the field is soft, so it costs a quarter of the pixels.
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2) * 0.5
      canvas.width = Math.max(2, Math.floor(window.innerWidth * scale))
      canvas.height = Math.max(2, Math.floor(window.innerHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    const target = { x: 0.5, y: 0.5 }
    const mouse = { x: 0.5, y: 0.5 }
    let vel = 0
    const onMove = (event: PointerEvent) => {
      target.x = event.clientX / window.innerWidth
      target.y = 1 - event.clientY / window.innerHeight
    }

    let raf = 0
    const start = performance.now()
    const draw = (now: number) => {
      const dx = target.x - mouse.x
      const dy = target.y - mouse.y
      mouse.x += dx * 0.08
      mouse.y += dy * 0.08
      vel = Math.min(1, vel * 0.94 + Math.hypot(dx, dy) * 3)
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.time, reduced ? 8 : (now - start) / 1000)
      gl.uniform2f(u.mouse, mouse.x, mouse.y)
      gl.uniform1f(u.vel, reduced ? 0 : vel)
      gl.uniform1f(u.scroll, window.scrollY / maxScroll)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => {
      resize()
      if (reduced) draw(performance.now())
    }
    window.addEventListener('resize', onResize)
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      // Keep the context alive: StrictMode re-runs this effect on the same canvas,
      // and a lost context would silently drop us onto the CSS fallback.
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [reduced])

  if (!supported) {
    return <div aria-hidden="true" className="fixed inset-0 z-0" style={{ background: 'radial-gradient(60% 50% at 20% 20%, #e3e9f5, transparent), radial-gradient(50% 50% at 80% 70%, #f3dfe6, transparent), #faf8f5' }} />
  }
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
