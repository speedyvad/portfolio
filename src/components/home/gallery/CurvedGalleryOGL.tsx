import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Mesh, Plane, Program, Raycast, Renderer, Texture, Transform } from 'ogl'
import { galleryImages } from '../../../data/galleryImages'

interface GalleryMeshExtras {
  slug: string
  baseAngle: number
}

const VERT = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uAlpha;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(tMap, vUv);
    gl_FragColor = vec4(tex.rgb, tex.a * uAlpha);
  }
`

const RADIUS = 6.5
const MAX_ANGLE = 0.85 // meio arco, em radianos (~49°)
const AUTO_ROTATE_SPEED = 0.045 // rad/s

/**
 * Galeria curva em WebGL (arco de planos com os prints dos projetos), com rotação
 * automática lenta, resposta a arrasto e clique para abrir o case. Desktop apenas —
 * a decisão de montar este componente (vs. o fallback Embla) é do HeroGallery.
 */
export default function CurvedGalleryOGL() {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    container.appendChild(gl.canvas)
    gl.canvas.style.touchAction = 'pan-y'

    const camera = new Camera(gl, { fov: 32 })
    camera.position.set(0, 0, 9.5)
    camera.lookAt([0, 0, 0])

    const scene = new Transform()

    const count = galleryImages.length
    const items = galleryImages.map((img, i) => {
      const baseAngle = count > 1 ? (i / (count - 1) - 0.5) * 2 * MAX_ANGLE : 0

      const texture = new Texture(gl)
      const isMobile = img.orientation === 'mobile'
      const geometry = new Plane(gl, { width: isMobile ? 0.62 : 1.15, height: isMobile ? 1.27 : 0.74 })
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: { tMap: { value: texture }, uAlpha: { value: 1 } },
        transparent: true,
        depthWrite: false,
        cullFace: false,
      })
      const mesh = new Mesh(gl, { geometry, program })
      mesh.setParent(scene)
      mesh.extras = { slug: img.slug, baseAngle } satisfies GalleryMeshExtras
      mesh.visible = false // só aparece quando o print carregar de verdade

      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        texture.image = image
        mesh.visible = true
      }
      // Print quebrado: a imagem simplesmente não entra no arco, em vez de um buraco em branco.
      image.onerror = () => {
        mesh.setParent(null)
      }
      image.src = img.src

      return mesh
    })

    function resize() {
      if (!container) return
      const { clientWidth, clientHeight } = container
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight)
      camera.perspective({ aspect: clientWidth / clientHeight })
    }
    window.addEventListener('resize', resize)
    resize()

    // Rotação: acumulador automático + deslocamento manual do arrasto.
    let autoRotation = 0
    let dragOffset = 0
    let dragging = false
    let dragStartX = 0
    let dragStartOffset = 0
    let dragDistance = 0
    let lastTime = performance.now()

    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      dragDistance = 0
      dragStartX = e.clientX
      dragStartOffset = dragOffset
      gl.canvas.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - dragStartX
      dragDistance = Math.max(dragDistance, Math.abs(dx))
      dragOffset = dragStartOffset + dx * 0.0035
    }
    const onPointerUp = (e: PointerEvent) => {
      dragging = false
      // Arrasto curto o suficiente para contar como clique: raycast na imagem tocada.
      if (dragDistance < 6) {
        const rect = gl.canvas.getBoundingClientRect()
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
        const raycast = new Raycast()
        raycast.castMouse(camera, [mouseX, mouseY])
        const hits = raycast.intersectBounds(items.filter((mesh) => mesh.visible))
        const slug = (hits[0]?.extras as GalleryMeshExtras | undefined)?.slug
        if (slug) navigate(`/projetos/${slug}`)
      }
    }

    gl.canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    let raf = 0
    const update = (time: number) => {
      raf = requestAnimationFrame(update)
      const dt = (time - lastTime) / 1000
      lastTime = time
      if (!dragging) autoRotation += dt * AUTO_ROTATE_SPEED

      const groupAngle = autoRotation + dragOffset

      items.forEach((mesh) => {
        const angle = (mesh.extras as GalleryMeshExtras).baseAngle + groupAngle
        mesh.position.x = Math.sin(angle) * RADIUS
        mesh.position.z = Math.cos(angle) * RADIUS - RADIUS
        mesh.rotation.y = -angle
        const front = Math.cos(angle) // 1 = de frente pra câmera, <0 = de costas
        const alpha = Math.max(0, Math.min(1, (front - 0.25) / 0.6))
        mesh.program.uniforms.uAlpha.value = alpha
      })

      renderer.render({ scene, camera })
    }
    raf = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      gl.canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      container.removeChild(gl.canvas)
      const ext = gl.getExtension('WEBGL_lose_context')
      ext?.loseContext()
    }
  }, [navigate])

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Galeria dos projetos da Dourado Studio"
      style={{ position: 'absolute', inset: 0, cursor: 'grab' }}
    />
  )
}
