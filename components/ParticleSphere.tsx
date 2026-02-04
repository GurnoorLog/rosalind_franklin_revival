// *PARTICLE SPHERE* ✨
// The 3D Particle System - Gurnoor Tamber's visual masterpiece!
// 120,000 particles dancing to the rhythm of neural activity! 🎆

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuralStatus } from '../App';

// *JSX FIXES* TypeScript workarounds for Three.js components! 🔧
const Points = 'points' as any;
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const RingGeometry = 'ringGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const CylinderGeometry = 'cylinderGeometry' as any;

interface SphereProps {
  audioLevel: number;
  status: NeuralStatus;
  bootProgress?: number;
}

// *SHADER UNIFORMS* Gurnoor's custom shader system! All the parameters! 🎨
const AvatarShader = {
  uniforms: {
    uTime: { value: 0 }, // *TIME* For animations! ⏰
    uAudioLevel: { value: 0 }, // *AUDIO* React to sound! 🔊
    uStatusColor: { value: new THREE.Color('#00f7ff') }, // *PRIMARY COLOR* Cyan! 💙
    uSecondaryColor: { value: new THREE.Color('#0044ff') }, // *SECONDARY COLOR* Blue! 🔵
    uThinkingFactor: { value: 0 }, // *THINKING* Spiky digital mode! 🧠
    uListeningFactor: { value: 0 }, // *LISTENING* Red alert mode! 🔴
    uResearchFactor: { value: 0 }, // *RESEARCHING* Orange mode! 🟠
    uBootFactor: { value: 1.0 }, // *BOOTING* Initialization state! 🚀
    uOrganicFactor: { value: 0 }, // *ORGANIC* Smooth speaking mode! 🗣️
    uGlitchFactor: { value: 1.0 }, // *GLITCH* Digital artifacts! 💥
    uForgeFactor: { value: 0 }, // *FORGING* Magenta forge mode! 🔨
  },
  vertexShader: `
    uniform float uTime;
    uniform float uAudioLevel;
    uniform float uThinkingFactor;
    uniform float uListeningFactor;
    uniform float uResearchFactor;
    uniform float uBootFactor;
    uniform float uOrganicFactor;
    uniform float uGlitchFactor;
    uniform float uForgeFactor;
    
    attribute float aRandom;
    attribute vec3 aInitialPos;
    attribute vec2 aSphereMap; 
    attribute float aType; 

    varying float vType;
    varying float vDist;
    varying float vRandom;
    varying vec3 vPos;
    varying float vNoise;
    varying float vGlitch;
    varying float vViewZ;
    varying float vIntensity;

    // Simplex Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy * 2.0;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vType = aType;
      vRandom = aRandom;
      
      float theta = aSphereMap.x * 6.283185;
      float phi = acos(aSphereMap.y * 2.0 - 1.0);
      
      vec3 targetDir = vec3(
          sin(phi) * cos(theta),
          cos(phi),
          sin(phi) * sin(theta)
      );

      float baseRadius = 6.2 + uForgeFactor * 1.5;
      
      // Ubisoft pulse
      float pulse = sin(uTime * 1.5 + aRandom * 5.0) * 0.05;
      baseRadius += pulse;

      vec3 spherePos = targetDir * baseRadius;
      vec3 pos = mix(spherePos, aInitialPos, uBootFactor);
      
      // Advanced Noise Displacement
      float noiseSpeed = mix(0.2, 0.5, uOrganicFactor);
      float noise1 = snoise(targetDir * 1.2 + uTime * noiseSpeed);
      float noise2 = snoise(targetDir * 4.0 - uTime * 0.5) * 0.3;
      float finalNoise = (noise1 + noise2);
      vIntensity = finalNoise;

      // Reduced multiplier for organic speaking feel
      float audioEffect = uAudioLevel * 1.8;
      
      // Digital Spikes (Reduced for speaking, high for thinking)
      float spikeStrength = mix(0.5, 5.0, uThinkingFactor);
      float spike = 0.0;
      if (noise1 > 0.6) {
         spike = (noise1 - 0.6) * spikeStrength * (uThinkingFactor + uAudioLevel * 0.4);
      }
      
      float glitchOffset = 0.0;
      if(uGlitchFactor > 0.4 && sin(uTime * 30.0 + aRandom * 100.0) > 0.99) {
         glitchOffset = snoise(pos * 5.0 + uTime) * 3.0;
         pos.x += glitchOffset;
      }
      vGlitch = glitchOffset;

      if (aType < 0.5) { // Core
        pos += targetDir * (finalNoise * 0.5 + audioEffect + spike);
      } else if (aType < 1.5) { // Shell
        pos += targetDir * (finalNoise * 1.5 + audioEffect * 1.5 + spike * 0.5);
      } else { // Nebula
        pos = aInitialPos + vec3(sin(uTime * 0.05 + aRandom), cos(uTime * 0.08), sin(uTime * 0.04)) * 12.0 * uBootFactor;
      }

      vPos = pos;
      vDist = length(pos);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewZ = mvPosition.z;
      
      float pSize = mix(0.03, 0.07, aRandom);
      pSize *= (1.0 + uAudioLevel * 1.5 + abs(glitchOffset) * 2.0 + uThinkingFactor * 0.5);
      
      gl_PointSize = pSize * (2800.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uStatusColor;
    uniform vec3 uSecondaryColor;
    uniform float uTime;
    uniform float uThinkingFactor;
    uniform float uAudioLevel;
    uniform float uForgeFactor;
    
    varying float vType;
    varying float vDist;
    varying float vRandom;
    varying vec3 vPos;
    varying float vNoise;
    varying float vGlitch;
    varying float vViewZ;
    varying float vIntensity;

    void main() {
      float distToCenter = distance(gl_PointCoord, vec2(0.5));
      
      float shape = mix(
        1.0 - smoothstep(0.0, 0.5, distToCenter),
        step(0.0, 0.5 - max(abs(gl_PointCoord.x - 0.5), abs(gl_PointCoord.y - 0.5))),
        0.3
      );
      
      if (shape < 0.1) discard;
      
      float alpha = pow(shape, 2.0);
      
      float scan = sin(vPos.y * 8.0 - uTime * 4.0) * 0.5 + 0.5;
      float scanIntensity = smoothstep(0.8, 1.0, scan);
      
      vec3 color = mix(uStatusColor, uSecondaryColor, vIntensity * 0.5 + 0.5);
      
      if (vGlitch > 0.5) {
         color = mix(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 1.0), sin(uTime * 20.0));
         alpha *= 1.5;
      }
      
      color = mix(color, vec3(1.0), scanIntensity * 0.4);
      alpha *= (0.6 + scanIntensity * 0.4);

      float depth = smoothstep(-40.0, -15.0, vViewZ);
      alpha *= depth;

      if (vType < 0.5) { // Core
        alpha *= 1.5;
        color *= (1.2 + uAudioLevel * 1.5);
      }

      gl_FragColor = vec4(color, alpha * 0.8);
    }
  `,
};

const DataRings: React.FC<{ status: NeuralStatus }> = ({ status }) => {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += 0.005;
    meshRef.current.rotation.y += 0.002;
    
    const scale = 1.0 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
  });

  const ringColor = useMemo(() => {
    if (status === 'LISTENING') return '#ff0033';
    if (status === 'THINKING') return '#00ffbb';
    return '#00f7ff';
  }, [status]);

  return (
    <Group ref={meshRef}>
      <Mesh rotation={[Math.PI / 2, 0, 0]}>
        <RingGeometry args={[8.5, 8.52, 64]} />
        <MeshBasicMaterial color={ringColor} transparent opacity={0.15} side={THREE.DoubleSide} />
      </Mesh>
      
      <Mesh rotation={[Math.PI / 2.5, 0.5, 0.2]}>
        <RingGeometry args={[7.8, 7.85, 4, 1, 0, Math.PI * 1.5]} />
        <MeshBasicMaterial color={ringColor} transparent opacity={0.2} side={THREE.DoubleSide} />
      </Mesh>

      <Mesh position={[0, 0, 0]}>
        <CylinderGeometry args={[0.01, 0.01, 18, 8]} />
        <MeshBasicMaterial color={ringColor} transparent opacity={0.05} />
      </Mesh>
    </Group>
  );
};

const NeuralCore: React.FC<any> = ({ audioLevel, status, geometry, bootProgress }) => {
  const meshRef = useRef<THREE.Points>(null!);
  const smoothedAudio = useRef(0);
  const factors = useRef({ thinking: 0, boot: 1, organic: 0, glitch: 1, forge: 0 });

  const colors = useMemo(() => ({
    BOOTING: new THREE.Color('#00f7ff'),
    DASHBOARD: new THREE.Color('#00f7ff'),
    IDLE: new THREE.Color('#00f7ff'),
    LISTENING: new THREE.Color('#ff0033'),
    THINKING: new THREE.Color('#00ffbb'),
    SPEAKING: new THREE.Color('#00ccff'),
    RESEARCHING: new THREE.Color('#ffaa00'),
    TEXT_CHAT: new THREE.Color('#ffffff'),
    FORGING: new THREE.Color('#ff00ff'),
  }), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      ...AvatarShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    });
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const shader = meshRef.current.material as THREE.ShaderMaterial;
    
    smoothedAudio.current = THREE.MathUtils.lerp(smoothedAudio.current, audioLevel, 0.1);
    
    factors.current.thinking = THREE.MathUtils.lerp(factors.current.thinking, status === 'THINKING' ? 1 : 0, 0.08);
    factors.current.boot = THREE.MathUtils.lerp(factors.current.boot, status === 'BOOTING' ? 1.0 - (bootProgress || 0) : 0, 0.1);
    factors.current.organic = THREE.MathUtils.lerp(factors.current.organic, (status === 'SPEAKING' || status === 'LISTENING') ? 1.0 : 0.2, 0.05);
    factors.current.forge = THREE.MathUtils.lerp(factors.current.forge, status === 'FORGING' ? 1.0 : 0, 0.1);
    factors.current.glitch = THREE.MathUtils.lerp(factors.current.glitch, (status === 'THINKING' || status === 'FORGING') ? 1.0 : 0.2, 0.1);

    shader.uniforms.uTime.value = state.clock.getElapsedTime();
    shader.uniforms.uAudioLevel.value = smoothedAudio.current;
    shader.uniforms.uThinkingFactor.value = factors.current.thinking;
    shader.uniforms.uBootFactor.value = factors.current.boot;
    shader.uniforms.uOrganicFactor.value = factors.current.organic;
    shader.uniforms.uGlitchFactor.value = factors.current.glitch;
    shader.uniforms.uForgeFactor.value = factors.current.forge;
    
    const targetColor = colors[status as keyof typeof colors] || colors.DASHBOARD;
    shader.uniforms.uStatusColor.value.lerp(targetColor, 0.1);

    meshRef.current.rotation.y += delta * (0.1 + factors.current.thinking * 0.4 + smoothedAudio.current * 0.3 + factors.current.forge * 1.2);
    meshRef.current.rotation.z += delta * 0.05;
  });

  return (
    <>
      <Points ref={meshRef} geometry={geometry} material={material} />
      <DataRings status={status} />
    </>
  );
};

// *MAIN COMPONENT* Gurnoor's particle sphere! 120,000 particles of pure awesome! ✨
export const ParticleSphere: React.FC<SphereProps> = (props) => {
  // *PARTICLE COUNT* 120,000 particles! That's a LOT! 🎆
  const particleCount = 120000;

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const initialPos = new Float32Array(particleCount * 3);
    const sphereMap = new Float32Array(particleCount * 2);
    const random = new Float32Array(particleCount);
    const type = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      random[i] = Math.random();
      sphereMap[i * 2] = Math.random();
      sphereMap[i * 2 + 1] = Math.random();

      const p = Math.random();
      if (p > 0.95) {
        type[i] = 2.0;
        initialPos[i * 3] = (Math.random() - 0.5) * 60.0;
        initialPos[i * 3 + 1] = (Math.random() - 0.5) * 60.0;
        initialPos[i * 3 + 2] = (Math.random() - 0.5) * 60.0;
      } else if (p > 0.3) {
        type[i] = 1.0; 
      } else {
        type[i] = 0.0; 
      }
    }

    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(particleCount * 3), 3));
    g.setAttribute('aInitialPos', new THREE.BufferAttribute(initialPos, 3));
    g.setAttribute('aSphereMap', new THREE.BufferAttribute(sphereMap, 2));
    g.setAttribute('aRandom', new THREE.BufferAttribute(random, 1));
    g.setAttribute('aType', new THREE.BufferAttribute(type, 1));
    return g;
  }, []);

  return (
    <div className="w-full h-full opacity-90">
      <Canvas camera={{ position: [0, 0, 24], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <NeuralCore {...props} geometry={geometry} bootProgress={props.bootProgress || 0} />
      </Canvas>
    </div>
  );
};
