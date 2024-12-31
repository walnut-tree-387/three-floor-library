import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, Mesh, Material, Vector3, Quaternion, Matrix4 } from "three";
import { useFrame } from "react-three-fiber";
import updateParrotAxis from "../control";

// Define the type of the GLTF model, focusing on nodes and materials
interface GLTFModel {
  nodes: {
    [key: string]: Mesh;
  };
  materials: {
    [key: string]: Material;
  };
  animations: any;
}

type ParrotProps = JSX.IntrinsicElements["group"];

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
const delayedRotationMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();
const parrotPosition = new Vector3(0, 3, 7);

function Parrot(props: ParrotProps) {
  const groupRef = useRef<Group>(null);
  const { nodes, animations } = useGLTF("/models/Parrot.glb") as unknown as GLTFModel;
  const { actions } = useAnimations(animations, groupRef);

  useFrame(({ camera }) => {
    updateParrotAxis(x, y, z, parrotPosition, camera);

    const rotationMatrix = new Matrix4().makeBasis(x, y, z);
    parrotPosition.add(new Vector3(0, 0, -0.005));

    if (groupRef.current) {
      const matrix = new Matrix4().multiply(
        new Matrix4()
          .makeTranslation(parrotPosition.x, parrotPosition.y, parrotPosition.z)
          .multiply(rotationMatrix)
      );
      groupRef.current.matrixAutoUpdate = false;
      groupRef.current.matrix.copy(matrix);
      groupRef.current.matrixWorldAutoUpdate = true;

      var quaternionA = new Quaternion().copy(delayedQuaternion);
      var quaternionB = new Quaternion();
      quaternionB.setFromRotationMatrix(rotationMatrix);

      var interpolationFactor = 0.175;
      var interPolatedQuaternion = new Quaternion().copy(quaternionA);
      interPolatedQuaternion.slerp(quaternionB, interpolationFactor);
      delayedQuaternion.copy(interPolatedQuaternion);

      delayedRotationMatrix.identity();
      delayedRotationMatrix.makeRotationFromQuaternion(delayedQuaternion);

      const cameraMatrix = new Matrix4()
        .multiply(
          new Matrix4().makeTranslation(
            parrotPosition.x,
            parrotPosition.y + 1,
            parrotPosition.z + 2
          )
        )
        .multiply(delayedRotationMatrix)
        .multiply(new Matrix4().makeRotationX(-0.2))
        .multiply(new Matrix4().makeTranslation(0, 0.015, 0.3));

      camera.matrixAutoUpdate = false;
      camera.matrix.copy(cameraMatrix);
      camera.matrixWorldAutoUpdate = true;
    }
  });

  useEffect(() => {
    if (actions) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        actions[actionNames[0]]?.play();
      }
    }
  }, [actions]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name="AuxScene" dispose={null} scale={0.01} rotation-y={Math.PI}>
        {nodes.mesh_0 && (
          <mesh
            name="mesh_0"
            geometry={nodes.mesh_0.geometry}
            // Check if the material exists and if it's an array or single material
            material={
              Array.isArray(nodes.mesh_0.material)
                ? nodes.mesh_0.material[0] // Use the first material if it's an array
                : nodes.mesh_0.material
            }
            morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
            morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/Parrot.glb");

export default Parrot;
