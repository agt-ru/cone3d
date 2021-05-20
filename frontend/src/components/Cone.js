import { useRef } from "react";
import * as THREE from "three";

function getGeometry(positions, normals, isSmooth) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  );
  if (isSmooth) {
    geometry.setAttribute(
      "normal",
      new THREE.BufferAttribute(new Float32Array(normals), 3)
    );
  } else geometry.computeVertexNormals();
  return geometry;
}

export default function Cone({ position, rotation, positions, normals, isSmooth }) {
  const mesh = useRef();

  return (
    <>
      {positions && normals ? (
        <mesh
          ref={mesh}
          rotation={rotation}
          position={position}
          geometry={getGeometry(
            positions,
            normals,
            isSmooth
          )}
        >
          <meshStandardMaterial
            attach="material"
            side={THREE.DoubleSide}
            color="darkseagreen"
          />
        </mesh>
      ) : (
        ""
      )}
    </>
  );
}
