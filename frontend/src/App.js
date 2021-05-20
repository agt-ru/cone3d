import React, { useState, useEffect } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cone from "./components/Cone";
import Controls from "./components/Controls";

function App() {
  const [coneData, setConeData] = useState({});
  const [height, setHeight] = useState("3");
  const [radius, setRadius] = useState("2");
  const [segments, setSegments] = useState("5");
  const [isSmooth, setIsSmooth] = useState(false);

  useEffect(() => {
    const getConeParams = async () => {
      const { data } = await axios.get(
        `/api?height=${height}&radius=${radius}&segments=${segments}`
      );
      setConeData(data);
    };
    getConeParams();
  }, [height, radius, segments]);

  return (
    <>
      <div id="canvas-container">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[30, 30, 30]} angle={0.15} penumbra={1} />
          <pointLight position={[-30, -30, -30]} />

          {coneData.conePositions && coneData.coneNormals ? (
            <Cone
              position={[-2, -0.5, 0]}
              rotation={[-0.5, 0, 0]}
              positions={coneData.conePositions}
              normals={coneData.coneNormals}
              isSmooth={isSmooth}
            />
          ) : (
            ""
          )}

          <OrbitControls />
        </Canvas>
      </div>
      <Controls
        height={height}
        radius={radius}
        segments={segments}
        isSmooth={isSmooth}
        setHeight={setHeight}
        setRadius={setRadius}
        setSegments={setSegments}
        setIsSmooth={setIsSmooth}
      />
    </>
  );
}

export default App;
