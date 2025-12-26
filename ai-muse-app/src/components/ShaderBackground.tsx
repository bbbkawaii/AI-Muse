"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - creates an ethereal mesh gradient with mouse interaction
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  varying vec2 vUv;
  varying vec3 vPosition;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;

    // Mouse influence with smooth falloff
    vec2 mouseInfluence = uMouse * 0.5;
    float mouseDist = length(uv - vec2(0.5) - mouseInfluence * 0.2);
    float mouseGlow = smoothstep(0.8, 0.0, mouseDist) * 0.3;

    // Animated noise layers
    float time = uTime * 0.15;
    float noise1 = snoise(vec3(uv * 2.0, time));
    float noise2 = snoise(vec3(uv * 4.0 - mouseInfluence, time * 1.5));
    float noise3 = snoise(vec3(uv * 6.0 + mouseInfluence * 0.5, time * 0.8));

    // Combine noise layers
    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;

    // Color palette - deep void with neon accents
    vec3 voidColor = vec3(0.012, 0.012, 0.02);
    vec3 purpleNeon = vec3(0.545, 0.361, 0.965);  // #8B5CF6
    vec3 blueNeon = vec3(0.231, 0.51, 0.965);     // #3B82F6
    vec3 cyanNeon = vec3(0.024, 0.714, 0.831);    // #06B6D4

    // Create gradient blobs
    float blob1 = smoothstep(0.4, 0.0, length(uv - vec2(0.3, 0.7) + noise1 * 0.1));
    float blob2 = smoothstep(0.5, 0.0, length(uv - vec2(0.8, 0.3) + noise2 * 0.15));
    float blob3 = smoothstep(0.45, 0.0, length(uv - vec2(0.5 + mouseInfluence.x * 0.2, 0.5 + mouseInfluence.y * 0.2) + noise3 * 0.1));

    // Mix colors based on blobs
    vec3 color = voidColor;
    color = mix(color, purpleNeon, blob1 * 0.15 * (1.0 + combinedNoise * 0.5));
    color = mix(color, blueNeon, blob2 * 0.12 * (1.0 + combinedNoise * 0.3));
    color = mix(color, cyanNeon, blob3 * 0.1 * (1.0 + combinedNoise * 0.4));

    // Add mouse glow
    color += purpleNeon * mouseGlow * 0.3;

    // Subtle vignette
    float vignette = 1.0 - smoothstep(0.4, 1.0, length(uv - 0.5));
    color *= 0.8 + vignette * 0.2;

    // Add subtle grain
    float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface ShaderMeshProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function ShaderMesh({ mouse }: ShaderMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    }),
    [viewport]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse follow
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize mouse position to -1 to 1
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div
      className="fixed inset-0 z-0"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#030305" }}
      >
        <ShaderMesh mouse={mouseRef} />
      </Canvas>
    </div>
  );
}
