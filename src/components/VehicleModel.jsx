import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Stage } from '@react-three/drei';

function ProceduralCar() {
  const group = useRef();
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005; // Auto rotate
    }
  });

  return (
    <group ref={group} scale={0.5} position={[0, -0.5, 0]}>
      {/* Chassis */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[4, 0.8, 1.8]} />
        <meshStandardMaterial color="#eeeeee" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Cabin */}
      <mesh position={[-0.2, 1.2, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 1.6]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.2, 0.2, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.2, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      <mesh position={[-1.2, 0.2, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.2, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
    </group>
  );
}

const VehicleModel = ({ filter }) => {
  return (
    <div style={{ width: '100%', height: '100%', filter: filter, transition: 'filter 0.3s ease' }}>
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <PresentationControls speed={1.5} global zoom={0.8} polar={[-0.1, Math.PI / 4]}>
          <Stage environment="city" intensity={0.6} adjustCamera={false}>
            <ProceduralCar />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default VehicleModel;
