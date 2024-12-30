import "./App.css";
import SphereEnv from "../src/components/SphereEnv";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Scene from "./components/Scene";
import Parrot from "./components/Parrot";
function App() {
  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"/assets/envmap.hdr"} />
      <Scene />
      <Parrot />
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <OrbitControls target={[0, 0, 0]} />
    </>
  );
}

export default App;
