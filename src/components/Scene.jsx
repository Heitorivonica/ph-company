import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, ContactShadows } from '@react-three/drei'

// Cromado prateado com detalhes em dourado
const chrome = { color: '#d8d4c8', metalness: 1, roughness: 0.12, envMapIntensity: 1.4 }
const purple = { color: '#c9a227', metalness: 1, roughness: 0.18, envMapIntensity: 1.4 }

// Aparelhos de toque (celulares/tablets) recebem uma versão mais leve
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

function Hero() {
  const group = useRef()
  const knot = useRef()

  useFrame((state, delta) => {
    // acompanha o mouse suavemente (no toque, só gira devagar sozinho)
    const { x, y } = isTouch ? { x: 0, y: 0 } : state.pointer
    group.current.rotation.y += (x * 0.6 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-y * 0.4 - group.current.rotation.x) * 0.05
    knot.current.rotation.z += delta * 0.15
  })

  const [tube, radial] = isTouch ? [128, 24] : [256, 48]
  const [sphere, ico] = isTouch ? [24, 0] : [48, 1]

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1, 0.34, tube, radial, 2, 3]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
      </Float>

      <Float speed={2.2} floatIntensity={2}>
        <mesh position={[1.9, 1.2, 0.4]}>
          <sphereGeometry args={[0.28, sphere, sphere]} />
          <meshStandardMaterial {...purple} />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={1.6}>
        <mesh position={[-1.9, -1, 0.6]}>
          <icosahedronGeometry args={[0.32, ico]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
      </Float>
      <Float speed={2.6} floatIntensity={2.4}>
        <mesh position={[-1.5, 1.5, -0.4]}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial {...purple} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene() {
  const wrap = useRef()
  const [visible, setVisible] = useState(true)

  // Pausa a renderização quando o 3D não está na tela (poupa bateria e CPU/GPU)
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={isTouch ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isTouch, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <Hero />
        {!isTouch && (
          <ContactShadows position={[0, -2.2, 0]} opacity={0.35} scale={9} blur={2.8} far={4} color="#000000" />
        )}

        {/* Ambiente de estúdio criado localmente (sem baixar HDRI) para os reflexos metálicos */}
        <Environment resolution={isTouch ? 128 : 256}>
          <color attach="background" args={['#0a0a0a']} />
          <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 5, 2]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={3} color="#ffffff" position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={3} color="#e8c766" position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer form="ring" intensity={2} color="#c9a227" position={[0, -3, 4]} scale={4} />
        </Environment>
      </Canvas>
    </div>
  )
}
