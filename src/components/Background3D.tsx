import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Brain } from 'lucide-react';
import { 
  SiJavascript, 
  SiPython, 
  SiDocker, 
  SiHtml5, 
  SiCss, 
  SiReact, 
  SiMysql, 
  SiPostgresql 
} from 'react-icons/si';

// Props for our dynamic wireframe shapes
interface ShapeProps {
  position: [number, number, number];
  rotationSpeed: number;
  floatSpeed: number;
  geometry: React.ReactNode;
  opacity?: number;
}

function FloatingWireframe({ position, rotationSpeed, floatSpeed, geometry, opacity = 0.15 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * (rotationSpeed * 1.5);
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        {geometry}
        <meshBasicMaterial 
          color="#EF4444" 
          wireframe 
          transparent 
          opacity={opacity} 
        />
      </mesh>
    </Float>
  );
}

function FloatingIcon({ position, icon, label }: { position: [number, number, number], icon: React.ReactNode, label?: string }) {
  const floatSpeed = useMemo(() => 1.5 + Math.random(), []);
  const floatIntensity = useMemo(() => 1 + Math.random(), []);

  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={floatIntensity} position={position}>
      <Html center transform sprite>
        <div className="flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default">
          <div className="text-brand-primary-red text-4xl drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
            {icon}
          </div>
          {label && (
            <span className="mt-2 text-[10px] font-bold tracking-widest text-white/70 uppercase">
              {label}
            </span>
          )}
        </div>
      </Html>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const particlesCount = 800;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial 
        transparent 
        color="#F87171" 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.3}
      />
    </Points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-background">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        
        {/* -- LARGE GEOMETRIC SHAPES (MOVED TO CORNERS) -- */}

        {/* 1. Large Sphere on FAR Bottom Left */}
        <FloatingWireframe 
          position={[-8, -5, -4]} 
          rotationSpeed={0.05} 
          floatSpeed={1.2}
          opacity={0.12}
          geometry={<sphereGeometry args={[1.5, 16, 16]} />} 
        />

        {/* 2. Large Torus (Donut) on FAR Top Right / Right */}
        <FloatingWireframe 
          position={[8, 4, -4]} 
          rotationSpeed={0.03} 
          floatSpeed={1.5}
          opacity={0.15}
          geometry={<torusGeometry args={[1.5, 0.6, 16, 32]} />} 
        />

        {/* 3. Small Icosahedron on Top Left corner */}
        <FloatingWireframe 
          position={[-7, 5, -8]} 
          rotationSpeed={0.1} 
          floatSpeed={2}
          opacity={0.2}
          geometry={<icosahedronGeometry args={[0.8, 0]} />} 
        />

        {/* 4. Small Octahedron on Bottom Right corner */}
        <FloatingWireframe 
          position={[7, -5, -3]} 
          rotationSpeed={0.15} 
          floatSpeed={1.8}
          opacity={0.18}
          geometry={<octahedronGeometry args={[0.6, 0]} />} 
        />

        {/* 5. Center-ish small polygon - further back and small to leave center clear */}
        <FloatingWireframe 
          position={[1, -1, -12]} 
          rotationSpeed={0.08} 
          floatSpeed={1}
          opacity={0.1}
          geometry={<dodecahedronGeometry args={[0.5, 0]} />} 
        />

        {/* -- FLOATING TECH ICONS (MORE CENTRALIZED) -- */}
        <FloatingIcon position={[-1.2, 0.8, -1]} icon={<SiJavascript />} label="JS" />
        <FloatingIcon position={[1.8, 1.5, -2]} icon={<SiPython />} label="Python" />
        <FloatingIcon position={[-2.5, -0.3, -3]} icon={<SiDocker />} label="Docker" />
        <FloatingIcon position={[2.5, -0.6, -2]} icon={<span className="font-bold text-3xl">n8n</span>} />
        <FloatingIcon position={[0, 2.5, -4]} icon={<Brain />} label="IA" />
        <FloatingIcon position={[-0.6, -2.2, -3]} icon={<SiHtml5 />} label="HTML" />
        <FloatingIcon position={[2.8, -1.8, -5]} icon={<SiCss />} label="CSS" />
        <FloatingIcon position={[1.2, -1.2, -1]} icon={<SiReact />} label="React" />
        <FloatingIcon position={[-2.2, -1.8, 0]} icon={<SiMysql />} label="MySQL" />
        <FloatingIcon position={[0.6, 1.2, -5]} icon={<SiPostgresql />} label="Postgres" />

        <ParticleField />
      </Canvas>
      
      {/* Subtle Grid Background CSS */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} 
      />

      {/* Noise Overlay Filter */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Glowing Ambient Lights */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-brand-primary-red/10 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#7F1D1D]/10 rounded-full blur-[150px] mix-blend-screen" />
    </div>
  );
}
