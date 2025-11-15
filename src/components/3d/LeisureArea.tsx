import { useRef } from "react";

interface LeisureAreaProps {
  wallColor: string;
}

export const LeisureArea = ({ wallColor }: LeisureAreaProps) => {
  const groupRef = useRef<any>();

  return (
    <group ref={groupRef}>
      {/* Back Wall */}
      <mesh position={[0, 2, -4]} castShadow receiveShadow>
        <boxGeometry args={[12, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-6, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[6, 2, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Floor - Deck Style */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#FAFAFA" />
      </mesh>

      {/* Bar Counter */}
      <mesh position={[-3, 1.2, -3]} castShadow>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial color="#2C1810" />
      </mesh>

      {/* Bar Base */}
      <mesh position={[-3, 0.6, -3]} castShadow>
        <boxGeometry args={[4, 1.2, 1]} />
        <meshStandardMaterial color="#4A4A4A" />
      </mesh>

      {/* Bar Stools */}
      {[-4.5, -3.5, -2.5, -1.5].map((x, i) => (
        <group key={i} position={[x, 0, -2]}>
          {/* Seat */}
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Leg */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
            <meshStandardMaterial color="#2C2C2C" />
          </mesh>
        </group>
      ))}

      {/* Pool Table */}
      <mesh position={[2, 0.8, 1]} castShadow>
        <boxGeometry args={[3, 0.2, 1.8]} />
        <meshStandardMaterial color="#0F5F0F" />
      </mesh>

      {/* Pool Table Base */}
      <mesh position={[2, 0.4, 1]} castShadow>
        <boxGeometry args={[2.8, 0.6, 1.6]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Pool Table Legs */}
      {[[-1.3, -0.8], [1.3, -0.8], [-1.3, 0.8], [1.3, 0.8]].map(([x, z], i) => (
        <mesh key={i} position={[x + 2, 0.3, z + 1]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
          <meshStandardMaterial color="#2C1810" />
        </mesh>
      ))}

      {/* Dartboard on wall */}
      <mesh position={[3, 2.5, -3.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[3, 2.5, -3.85]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>

      {/* Lounge Chairs */}
      {[[-4, 2], [-4, 0]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Seat */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.8, 0.1, 0.8]} />
            <meshStandardMaterial color="#FF6B35" />
          </mesh>
          {/* Back */}
          <mesh position={[0, 0.7, 0.3]} castShadow>
            <boxGeometry args={[0.8, 0.6, 0.1]} />
            <meshStandardMaterial color="#FF6B35" />
          </mesh>
        </group>
      ))}

      {/* TV Screen */}
      <mesh position={[0, 2.5, -3.95]} castShadow>
        <boxGeometry args={[3, 1.8, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Pendant Lights */}
      {[-3, 0, 3].map((x, i) => (
        <group key={i} position={[x, 3.5, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 16]} />
            <meshStandardMaterial color="#2C2C2C" />
          </mesh>
          <mesh position={[0, -0.4, 0]} castShadow>
            <coneGeometry args={[0.25, 0.4, 32]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
