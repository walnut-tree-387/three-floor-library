import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "react-three-fiber";
import App from "./App.tsx";
import { Suspense } from "react";

createRoot(document.getElementById("root")!).render(
  <Canvas shadows>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </Canvas>
);
