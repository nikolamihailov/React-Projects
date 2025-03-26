import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Stars component represents a 3D animated starfield
const Stars = (props) => {
  const ref = useRef();
  // Generate random points in a sphere for stars
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(50000), { radius: 1.5 })
  );

  // Use frame hook for animation and rotate the starfield slowly over time
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    // Group to apply rotation and displaying points with PointMaterial for stars
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={true}
        />
      </Points>
    </group>
  );
};

// StarsCanvas component provides a 3D canvas with animated stars
const StarsCanvas = () => {
  // React-three-fiber Canvas for 3D rendering and suspense for fallback during initial loading
  return (
   <div style={{ width: "100%", height: "auto", position: "absolute", inset: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;