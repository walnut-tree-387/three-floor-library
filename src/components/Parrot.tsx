import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, Mesh, Vector3, Matrix4 } from "three";
import { useFrame } from "react-three-fiber";
import updateParrotAxis from "../control";

type ParrotProps = JSX.IntrinsicElements["group"];
const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
const parrotPosition = new Vector3(0, 3, 7);
function Parrot(props: ParrotProps) {
  const groupRef = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF("/models/Parrot.glb") as any;
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

      const cameraMatrix = new Matrix4()
        .multiply(
          new Matrix4().makeTranslation(
            parrotPosition.x,
            parrotPosition.y,
            parrotPosition.z
          )
        )
        .multiply(rotationMatrix)
        .multiply(new Matrix4().makeRotationX(-0.2))
        .multiply(new Matrix4().makeTranslation(0, 0.015, 0.3));
      camera.matrixAutoUpdate = false;
      camera.matrix.copy(cameraMatrix);
      camera.matrixWorldAutoUpdate = true;
    }
  });
  React.useEffect(() => {
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
            geometry={(nodes.mesh_0 as Mesh).geometry}
            material={materials[(nodes.mesh_0 as Mesh).material.name]}
            morphTargetDictionary={(nodes.mesh_0 as Mesh).morphTargetDictionary}
            morphTargetInfluences={(nodes.mesh_0 as Mesh).morphTargetInfluences}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/Parrot.glb");

export default Parrot;
