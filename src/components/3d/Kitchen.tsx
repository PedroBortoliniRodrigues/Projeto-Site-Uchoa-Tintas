import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

interface KitchenProps {
  wallColor: string;
}

export const Kitchen = ({ wallColor }: KitchenProps) => {
  const groupRef = useRef<any>();

  return (
    <group ref={groupRef}>
      {/* Back Wall */}
      <mesh position={[0, 2, -3]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[4, 2, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Kitchen Counter */}
      <mesh position={[-2.5, 1, -2.5]} castShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Counter Base */}
      <mesh position={[-2.5, 0.5, -2.5]} castShadow>
        <boxGeometry args={[3, 1, 1.5]} />
        <meshStandardMaterial color="#4A4A4A" />
      </mesh>

      {/* Upper Cabinets */}
      <mesh position={[-2.5, 3, -2.7]} castShadow>
        <boxGeometry args={[3, 0.8, 0.6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Stove */}
      <mesh position={[0, 1.05, -2.5]} castShadow>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Refrigerator */}
      <mesh position={[3, 1.5, -2.5]} castShadow>
        <boxGeometry args={[0.8, 3, 0.8]} />
        <meshStandardMaterial color="#E8E8E8" />
      </mesh>

      {/* Kitchen Table */}
      <mesh position={[0, 0.8, 1]} castShadow>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Table Legs */}
      {[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z + 1]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Window */}
      <mesh position={[0, 2.5, -2.95]}>
        <planeGeometry args={[1.5, 1.2]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
