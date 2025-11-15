import { useRef } from "react";

interface LivingRoomProps {
  wallColor: string;
}

export const LivingRoom = ({ wallColor }: LivingRoomProps) => {
  const groupRef = useRef<any>();

  return (
    <group ref={groupRef}>
      {/* Back Wall */}
      <mesh position={[0, 2, -4]} castShadow receiveShadow>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#DEB887" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#FAFAFA" />
      </mesh>

      {/* Sofa */}
      <mesh position={[0, 0.5, 2]} castShadow>
        <boxGeometry args={[3, 1, 1.2]} />
        <meshStandardMaterial color="#4A4A4A" />
      </mesh>

      {/* Sofa Back */}
      <mesh position={[0, 1, 2.5]} castShadow>
        <boxGeometry args={[3, 0.8, 0.2]} />
        <meshStandardMaterial color="#3A3A3A" />
      </mesh>

      {/* Sofa Arms */}
      {[-1.4, 1.4].map((x, i) => (
        <mesh key={i} position={[x, 0.7, 2]} castShadow>
          <boxGeometry args={[0.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#3A3A3A" />
        </mesh>
      ))}

      {/* Coffee Table */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Coffee Table Legs */}
      {[[-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* TV */}
      <mesh position={[0, 2, -3.9]} castShadow>
        <boxGeometry args={[2.5, 1.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* TV Stand */}
      <mesh position={[0, 0.5, -3.5]} castShadow>
        <boxGeometry args={[3, 1, 0.5]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Window */}
      <mesh position={[4.95, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>

      {/* Curtains */}
      {[-1.2, 1.2].map((z, i) => (
        <mesh key={i} position={[4.9, 2.5, z]} rotation={[0, -Math.PI / 2, 0]} castShadow>
          <planeGeometry args={[0.3, 2]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
      ))}

      {/* Lamp */}
      <mesh position={[-3, 1.5, 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[-3, 2.3, 2]} castShadow>
        <coneGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial color="#FFF8DC" emissive="#FFF8DC" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};
