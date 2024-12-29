import React, { useLayoutEffect, useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { Group, Mesh, Object3DEventMap } from "three";
import gsap from "gsap";
import { useFrame } from "react-three-fiber";

type OfficeProps = React.ComponentProps<"group">;

function Office(props: OfficeProps) {
  const { nodes, materials } = useGLTF("/models/WawaOffice.glb");
  const ref = useRef<Group<Object3DEventMap> | null>(null);
  const library = useRef<Group<Object3DEventMap> | null>(null);
  const attic = useRef<Group<Object3DEventMap> | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const FLOOR_HEIGHT = 2.3;
  const NB_FLOORS = 3;
  const scroll = useScroll();
  useFrame(() => {
    tl.current?.seek(scroll.offset * tl.current.duration());
  });
  useLayoutEffect(() => {
    if (ref.current && ref.current.position) {
      tl.current = gsap.timeline();
      tl.current.to(
        ref.current.position,
        {
          duration: 2,
          y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
        },
        0
      );
    } else {
      console.error("ref.current or ref.current.position is not defined");
    }

    if (library.current && library.current.position) {
      tl.current = gsap.timeline();
      tl.current.from(
        library.current?.position,
        {
          duration: 2,
          x: -2,
        },
        0.5
      );
      tl.current.from(library.current.rotation, {
        duration: 0.5,
        y: Math.PI / 2,
      });
    } else {
      console.error(
        "library.current or library.current.position is not defined"
      );
    }

    if (attic.current && attic.current.position) {
      tl.current = gsap.timeline();
      tl.current.from(
        attic.current?.position,
        {
          duration: 1.5,
          x: 2,
        },
        0
      );
      tl.current.from(
        attic.current?.position,
        {
          duration: 0.5,
          z: -2,
        },
        1.5
      );
      tl.current.from(attic.current.rotation, {
        duration: 0.5,
        y: Math.PI / 2,
      });
    } else {
      console.error("attic.current or attic.current.position is not defined");
    }
  }, []);

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        geometry={(nodes["01_office"] as Mesh).geometry}
        material={materials["01"]}
      />
      <group position={[0, 2.114, -2.23]}>
        <group ref={library}>
          <mesh
            geometry={(nodes["02_library"] as Mesh).geometry}
            material={materials["02"]}
          />
        </group>
      </group>
      <group position={[-1.97, 4.227, -2.199]}>
        <group ref={attic}>
          <mesh
            geometry={(nodes["03_attic"] as Mesh).geometry}
            material={materials["03"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/WawaOffice.glb");

export default Office;
