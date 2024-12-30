import { Vector3 } from "react-three-fiber";
let jawvelocity = 0;
let pitchVelocity = 0;
let parrotSpeed = 0.006;
let maxValocity = 0.04;
let turbo = 0;
const controls: { [key: string]: boolean } = {};
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case 'ArrowUp':
        controls.arrowUp = true;
        break;
    case 'ArrowDown':
        controls.arrowDown = true;
        break;
    case 'ArrowLeft':
        controls.arrowLeft = true;
        break;
    case 'ArrowRight':
        controls.arrowRight = true;
        break;
    default : controls[e.key.toLocaleLowerCase()] = true;
  }
});
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case 'ArrowUp':
        controls.arrowUp = false;
        break;
    case 'ArrowDown':
        controls.arrowDown = false;
        break;
    case 'ArrowLeft':
        controls.arrowLeft = false;
        break;
    case 'ArrowRight':
        controls.arrowRight = false;
        break;
  default : controls[e.key.toLocaleLowerCase()] = false;
  }
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

  if (controls.arrowLeft) {
    jawvelocity += 0.025;
  }
  if (controls.arrowRight) {
    jawvelocity -= 0.025;
  }
  if (controls.arrowUp) {
    pitchVelocity += 0.025;
  }
  if (controls.arrowDown) {
    pitchVelocity -= 0.025;
  }

  //Reset Mode
  if (controls["r"]) {
    window.location.reload();
  }
  x.applyAxisAngle(z, jawvelocity);
  y.applyAxisAngle(z, jawvelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);
  let turboSpeed = easeOutQuad(turbo) * 0.02;
  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  parrotPos.add(z.clone().multiplyScalar(-parrotSpeed -turboSpeed));
};
export default updateParrotAxis;
