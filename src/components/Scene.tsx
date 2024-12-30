import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
type SceneProps = JSX.IntrinsicElements["group"];
function Scene(props: SceneProps) {
  const { nodes, materials } = useGLTF("/models/scene.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.landscape_gltf as Mesh).geometry}
        material={materials["Material.009"]}
      />
      <mesh
        geometry={(nodes.landscape_borders as Mesh).geometry}
        material={materials["Material.010"]}
      />
      <mesh
        geometry={(nodes.trees_light as Mesh).geometry}
        material={materials["Material.008"]}
      />
      <mesh
        geometry={(nodes.water as Mesh).geometry}
        material={materials.Water}
      />
      <mesh
        geometry={(nodes.water1 as Mesh).geometry}
        material={materials.Water}
      />
      <mesh
        geometry={(nodes.water2 as Mesh).geometry}
        material={materials.Water}
      />
      <mesh
        geometry={(nodes.lights as Mesh).geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}

useGLTF.preload("/models/scene.glb");
export default Scene;
