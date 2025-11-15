import { useRef } from "react";

interface BedroomProps {
  wallColor: string;
}

export const Bedroom = ({ wallColor }: BedroomProps) => {
  const groupRef = useRef<any>();

  return (
    <group ref={groupRef}>
      {/* Back Wall */}
      <mesh position={[0, 2, -3.5]} castShadow receiveShadow>
        <boxGeometry args={[9, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-4.5, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[4.5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 4, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#FFFACD" />
      </mesh>

      {/* Bed Base */}
      <mesh position={[0, 0.3, -1.5]} castShadow>
        <boxGeometry args={[2.5, 0.6, 2.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.8, -1.5]} castShadow>
        <boxGeometry args={[2.4, 0.4, 2.4]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Bed Sheet */}
      <mesh position={[0, 0.95, -1.3]} castShadow>
        <boxGeometry args={[2.4, 0.1, 1.8]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>

      {/* Pillows */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 1.1, -2.3]} castShadow>
          <boxGeometry args={[0.5, 0.2, 0.3]} />
          <meshStandardMaterial color="#F0F0F0" />
        </mesh>
      ))}

      {/* Headboard */}
      <mesh position={[0, 1.5, -2.7]} castShadow>
        <boxGeometry args={[2.6, 1.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Nightstands */}
      {[-2, 2].map((x, i) => (
        <group key={i} position={[x, 0, -1.5]}>
          {/* Table Top */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[0.6, 0.05, 0.6]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Drawer */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.5, 0.2, 0.55]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          {/* Legs */}
          {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map(([dx, dz], j) => (
            <mesh key={j} position={[dx, 0.15, dz]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
              <meshStandardMaterial color="#2C1810" />
            </mesh>
          ))}
          {/* Lamp */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
            <meshStandardMaterial color="#2C2C2C" />
          </mesh>
          <mesh position={[0, 0.95, 0]} castShadow>
            <coneGeometry args={[0.15, 0.25, 32]} />
            <meshStandardMaterial color="#FFF8DC" emissive="#FFF8DC" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Wardrobe */}
      <mesh position={[-3.5, 1.5, -3]} castShadow>
        <boxGeometry args={[1.5, 3, 0.8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Wardrobe Doors */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[-3.5 + x, 1.5, -2.55]} castShadow>
          <boxGeometry args={[0.65, 2.8, 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {/* Desk */}
      <mesh position={[3, 0.8, -2.5]} castShadow>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Desk Legs */}
      {[[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]].map(([x, z], i) => (
        <mesh key={i} position={[3 + x, 0.4, -2.5 + z]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Chair */}
      <mesh position={[3, 0.5, -1]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
        <meshStandardMaterial color="#4A4A4A" />
      </mesh>
      <mesh position={[3, 0.3, -1]} castShadow>
        <cylinderGeometry args={[0.05, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[3, 0.9, -1.15]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.05]} />
        <meshStandardMaterial color="#4A4A4A" />
      </mesh>

      {/* Window */}
      <mesh position={[4.45, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>

      {/* Window Frame */}
      <mesh position={[4.48, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[2.1, 1.6, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      {/* Rug */}
      <mesh position={[0, 0.02, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* Ceiling Light */}
      <mesh position={[0, 3.8, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};
