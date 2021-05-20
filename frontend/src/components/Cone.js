import { useRef, useMemo } from "react";
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
  const mat = useMemo(() => new THREE.MeshStandardMaterial({side: THREE.DoubleSide, color: "darkseagreen"}), []);
  const geo = useMemo(() => getGeometry(positions, normals, isSmooth), [positions, normals, isSmooth]);

  return (
    <>
      {positions && normals ? (
        <mesh
          ref={mesh}
          rotation={rotation}
          position={position}
          material={mat}
          geometry={geo}
        />
      ) : (
        ""
      )}
    </>
  );
}
