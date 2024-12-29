import { useState } from "react";
import "./App.css";
import { Canvas } from "react-three-fiber";
import Experience from "../src/components/Experience";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Canvas
        camera={{
          fov: 64,
          position: [2.3, 1.5, 2.3],
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
