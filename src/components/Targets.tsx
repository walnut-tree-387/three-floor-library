import React, { useMemo, useState } from "react";
import { Quaternion, TorusGeometry, Vector3, BufferGeometry } from "three";
import { mergeBufferGeometries } from "three-stdlib";

function randomPoint(scale: Vector3) {
    return new Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    ).multiply(scale);
}

const TARGET_RAD = 0.125;

function Targets() {
    const [targets] = useState(() => {
        const arr = [];
        for (let i = 0; i < 25; i++) {
            arr.push({
                center: randomPoint(new Vector3(4, 1, 4).add(new Vector3(0, 2 + Math.random() * 2, 0))),
                direction: randomPoint(new Vector3(1, 1, 1)).normalize(),
            });
        }
        return arr;
    });

    const geometry = useMemo(() => {
        const geometries: BufferGeometry[] = targets.map((target) => {
            const torusGeo = new TorusGeometry(TARGET_RAD, 0.02, 8, 25);
            torusGeo.applyQuaternion(
                new Quaternion().setFromUnitVectors(
                    new Vector3(0, 0, 1), // Default forward vector
                    target.direction // Target direction vector
                )
            );
            torusGeo.translate(target.center.x, target.center.y, target.center.z); // Translate to target center
            return torusGeo; // TorusGeometry extends BufferGeometry
        });

        return mergeBufferGeometries(geometries) || new BufferGeometry(); // Ensure fallback to empty geometry
    }, [targets]); // Memoize based on targets array

    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial roughness={0.5} metalness={0.5} />
        </mesh>
    );
}

export default Targets;
