import { OrbitControls, ScrollControls } from "@react-three/drei";
import Parrot from "./Parrot";

function Experience() {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={3} damping={0.25}>
        <Parrot />
      </ScrollControls>
    </>
  );
}

export default Experience;
