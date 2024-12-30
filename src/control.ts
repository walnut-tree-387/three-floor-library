import { Vector3 } from "react-three-fiber";
let jawvelocity = 0;
let pitchVelocity = 0;
let parrotSpeed = 0.006;
let maxValocity = 0.04;
let turbo = 0;
const controls: { [key: string]: boolean } = {};
window.addEventListener("keyup", (e) => {
  controls[e.key.toLocaleLowerCase()] = true;
});
window.addEventListener("keydown", (e) => {
  controls[e.key.toLocaleLowerCase()] = false;
});
const easeOutQuad = function (x: any) {
  return 1 - (1 - x) * (1 - x);
};
const updateParrotAxis = function (
  x: any,
  y: any,
  z: any,
  parrotPos: any,
  camera: any
) {
  jawvelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawvelocity) > maxValocity)
    jawvelocity = Math.sign(jawvelocity) * maxValocity;
  if (Math.abs(pitchVelocity) > maxValocity)
    pitchVelocity = Math.sign(pitchVelocity) * maxValocity;

  if (controls["a"]) {
    jawvelocity += 0.025;
  }
  if (controls["d"]) {
    jawvelocity -= 0.025;
  }
  if (controls["w"]) {
    pitchVelocity += 0.025;
  }
  if (controls["s"]) {
    pitchVelocity -= 0.025;
  }

  //Reset Mode
  if (controls["r"]) {
    jawvelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    parrotPos.set(0, 3, 7);
  }
  x.applyAxisAngle(z, jawvelocity);
  y.applyAxisAngle(z, jawvelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  if (controls.shift) {
    turbo *= 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);
  let turboSpeed = easeOutQuad(turbo) * 0.02;
  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  parrotPos.add(z.clone().multiplyScalar(-parrotSpeed));
};
export default updateParrotAxis;
