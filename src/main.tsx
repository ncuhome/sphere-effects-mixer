import { events, render, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { useSpring, animated, config } from '@react-spring/three'
import { useControls } from "leva";

import { Effects } from './effects'

import Sphere from './Sphere'
import { OrbitControls } from '@react-three/drei'

function Box(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const { scale } = useSpring({ scale: hovered ? 1.2 : 1, config: config.wobbly })
  const { animating } = useControls({
    animating: true
  })
  useFrame(() => {
    if (!animating) return
    ref.current.rotation.x += clicked ? 0.1 : 0.01
    ref.current.rotation.y -= clicked ? 0.011 : 0.11
    ref.current.rotation.z += 0.01
  })
  return (
    <animated.mesh
      {...props}
      ref={ref}
      scale={scale}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <Suspense fallback={null}>
        <Sphere />
      </Suspense>
    </animated.mesh>
  )
}

const Env = () => {
  const { background } = useControls({
    background: "#0a0a0a"
  })
  const { scene } = useThree()
  scene.background = new THREE.Color(background)
  return null
}

const Root = () => {
  const { light, lightPosition, power, effectsActive } = useControls({
    light: '#f20745',
    lightPosition: [
      10,
      10,
      10
    ],
    power: {
      value: 512,
      min: 0,
      max: 10000,
    },
    effectsActive: true
  })
  return (
    <mesh>
      <ambientLight />
      <pointLight
        power={power}
        position={lightPosition}
        color={new THREE.Color(light)}
      />
      <Env />
      <Box />
      {effectsActive &&
        <Effects />
      }
      <OrbitControls />
    </mesh>
  )
}

window.addEventListener('resize', () =>
  render(
    <Root />,
    document.querySelector('canvas'),
    {
      events,
      size: { width: window.innerWidth, height: window.innerHeight }
    }
  )
)

window.dispatchEvent(new Event('resize'))