import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Enhanced 3D Avatar Model Component with accurate animations
function AvatarModel({ isSpeaking, currentPhoneme, expression, avatarSrc }) {
  const groupRef = useRef()
  const headRef = useRef()
  const mouthRef = useRef()
  // arms removed to avoid stick-like elements
  // mouth and eye overlays removed as requested

  // Load the full-body avatar image from public folder (use provided avatarSrc or fallback)
  const texturePath = avatarSrc || '/WhatsApp Image 2025-10-01 at 23.24.37_3b11565b.jpg'
  const texture = useLoader(THREE.TextureLoader, texturePath)
  const planeRef = useRef()

  // Animation state
  const [mouthOpenAmount, setMouthOpenAmount] = useState(0)
  const [expressionIntensity, setExpressionIntensity] = useState(0)
  const mouthQuadRef = useRef()

  const phonemeToOpen = {
    a: 0.9, e: 0.6, i: 0.4, o: 0.8, u: 0.5,
    p: 0.0, b: 0.0, m: 0.0, f: 0.3, v: 0.3,
    s: 0.2, z: 0.2, _: 0.0
  }

  useEffect(() => {
    if (isSpeaking && currentPhoneme) {
      const val = phonemeToOpen[currentPhoneme] ?? 0
      setMouthOpenAmount(val)
    } else {
      setMouthOpenAmount(0)
    }
  }, [isSpeaking, currentPhoneme])

  // viseme overlays removed — no mouth texture swapping

  useEffect(() => {
    setExpressionIntensity(expression && expression !== 'neutral' ? 1 : 0)
  }, [expression])

  // Animate head, mouth overlay, and hands
  useFrame((state, delta) => {
    if (!groupRef.current) return

    // subtle breathing
  groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
  // subtle scale when speaking to make motion more visible
  const targetScale = isSpeaking ? 1.01 : 1.0
  groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x || 1, targetScale, 0.04)
  groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y || 1, targetScale, 0.04)

    // head tilt/turn for expression
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 * (expressionIntensity || 1)
      headRef.current.rotation.x = expression === 'thinking' ? 0.06 : Math.sin(state.clock.elapsedTime * 0.15) * 0.02
    }

    // mouth overlays removed — no lip-sync meshes to animate

    // hand gestures removed (arms intentionally omitted)

    // blink and viseme behavior removed
    // update shader uniforms for mouth and expression if present
    if (planeRef.current && planeRef.current.material && planeRef.current.material.uniforms) {
      const mat = planeRef.current.material
      // smooth mouthOpenAmount to avoid popping
      mat.uniforms.uMouth.value = THREE.MathUtils.lerp(mat.uniforms.uMouth.value || 0, mouthOpenAmount, 0.28)
      mat.uniforms.uExpr.value = THREE.MathUtils.lerp(mat.uniforms.uExpr.value || 0, expression && expression !== 'neutral' ? 1 : 0, 0.14)
      mat.uniforms.uTime.value = state.clock.elapsedTime
    }

    // Animate the optional mouth quad (if present)
    if (mouthQuadRef.current) {
      // desired vertical scale for mouth visual
      const targetMouthScaleY = 0.25 + (mouthOpenAmount * 0.9)
      mouthQuadRef.current.scale.y = THREE.MathUtils.lerp(mouthQuadRef.current.scale.y || 0.25, targetMouthScaleY, 0.25)
      // subtle horizontal squeeze for round vowels
      const targetMouthScaleX = 0.9 - (mouthOpenAmount * 0.2)
      mouthQuadRef.current.scale.x = THREE.MathUtils.lerp(mouthQuadRef.current.scale.x || 0.9, targetMouthScaleX, 0.25)
      // fade opacity with expression intensity via material's color alpha if using a ShaderMaterial, otherwise adjust material.opacity
      if (mouthQuadRef.current.material) {
        mouthQuadRef.current.material.opacity = THREE.MathUtils.lerp(mouthQuadRef.current.material.opacity || 0.85, 0.5 + (expressionIntensity * 0.5), 0.08)
      }
    }
  })

  /*
    Layout strategy:
    - single textured plane shows the full-body avatar image from /public
    - a small dark mouth quad is positioned over the image's mouth region and scaled to simulate lip movement
    - simple cylindrical arms/hands sit in front and animate for gesture effect
  */
  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Full-body textured plane */}
      <group ref={headRef}>
        <mesh ref={planeRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[2.1, 4.2, 1, 1]} />
          <shaderMaterial
            uniforms={{
              uMap: { value: texture },
              uMouth: { value: 0.0 },
              uExpr: { value: 0.0 },
              uTime: { value: 0.0 }
            }}
            transparent={true}
            vertexShader={/* glsl */`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={/* glsl */`
              precision mediump float;
              uniform sampler2D uMap;
              uniform float uMouth;
              uniform float uExpr;
              uniform float uTime;
              varying vec2 vUv;

              // mouth center in UV space (tweak to match image)
              const vec2 mouthCenter = vec2(0.5, 0.38);
              const float mouthRadius = 0.16;

              void main() {
                vec2 uv = vUv;
                float d = distance(uv, mouthCenter);
                // influence stronger nearer the center, falloff to zero at radius
                float influence = smoothstep(mouthRadius, 0.0, d);

                // vertical warp based on uMouth (increased magnitude for visibility)
                float warp = (uMouth * 0.18) * influence;
                uv.y -= warp;

                // tiny horizontal jitter for vowel richness
                uv.x += sin(uTime * 18.0) * 0.0015 * uMouth * influence;

                vec4 color = texture2D(uMap, uv);

                // amplify expression tint a bit more for clarity
                color.rgb *= mix(1.0, 1.12, uExpr);

                // subtle breathing shimmer and mouth-driven brighten
                float breathe = 0.006 * sin(uTime * 1.2);
                color.rgb += breathe * uExpr;
                color.rgb += uMouth * 0.06 * influence;

                gl_FragColor = color;
              }
            `}
          />
        </mesh>

        {/* Subtle mouth quad placed slightly in front of the plane to make lip movement obvious on all images */}
        <mesh
          ref={mouthQuadRef}
          position={[0, -0.5, 0.011]}
          rotation={[0, 0, 0]}
          visible={true}
        >
          {/* Width/height tuned for most full-body images mapped on the plane */}
          <planeGeometry args={[0.42, 0.18, 1, 1]} />
          <meshBasicMaterial color="#0a0a0a" transparent={true} opacity={0.75} toneMapped={false} />
        </mesh>

        {/* Mouth and eye overlays removed per user request */}

        {/* Eyes removed per request (no overlays rendered) */}
      </group>

      {/* Arms removed intentionally to match requested appearance */}
    </group>
  )
}

// Main 3D Scene Component
export default function Avatar3D({ isSpeaking, currentPhoneme, expression, avatarSrc }) {
  return (
    <Canvas
      shadows
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* Avatar Model */}
      <AvatarModel 
        isSpeaking={isSpeaking} 
        currentPhoneme={currentPhoneme}
        expression={expression}
        avatarSrc={avatarSrc}
      />

      {/* Controls - optional, can be removed for production */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  )
}
