const fireBtnEl = document.querySelector("#fireBtn");
const noOfClicksEl = document.querySelector("#noOfClicks");
const bulletcontainerEl = document.querySelector("#bulletcontainer");
const gunLockEl = document.querySelector("#gunLock");
const reloadGunEl = document.querySelector("#reloadGun");
const flagForGunFireFnThrottleValueInputEl = document.querySelector(
  "#flagForGunFireFnThrottleValueInput"
);

let noOfClicks = 0;
let noOfBulletFired = 0;
let isGunLocked = false;
let flagForGunFireFnThrottle = true;
const gunSpecsObj = {
  mg: {
    speed: 10,
    ammo: 20,
  },
  lm3: {
    speed: 10,
    ammo: 10,
  },
};

let currentGunSpecs = {
  currentGun: flagForGunFireFnThrottleValueInputEl.value,
  remaningAmmo: gunSpecsObj[flagForGunFireFnThrottleValueInputEl.value].ammo,
};

const noOfClicksFn = () => (noOfClicksEl.textContent = ++noOfClicks);

const fireFn = () =>
  (bulletcontainerEl.innerHTML += `<div class="bulletDiv">${++noOfBulletFired}</div>`);

const gunLockFn = () => {
  isGunLocked ? (gunLockEl.value = `gunLock`) : (gunLockEl.value = `gunUnlock`);
  isGunLocked = !isGunLocked;
};

const updateCurrentGunFn = () => {
  currentGunSpecs.currentGun = flagForGunFireFnThrottleValueInputEl.value;
  currentGunSpecs.remaningAmmo =
    gunSpecsObj[flagForGunFireFnThrottleValueInputEl.value].ammo;
  reloadGunEl.style.setProperty(`display`, `none`);
};

const throttleFireFn = () => {
  if (isGunLocked) return;
  if (currentGunSpecs.remaningAmmo === 0) {
    reloadGunEl.style.setProperty(`display`, `inline`);
    return;
  }
  return () => {
    if (flagForGunFireFnThrottle) {
      fireFn();
      currentGunSpecs.remaningAmmo -= 1;
      flagForGunFireFnThrottle = false;
      setTimeout(
        () => (flagForGunFireFnThrottle = true),
        gunSpecsObj[currentGunSpecs.currentGun].speed
      );
    }
  };
};

gunLockEl.addEventListener("click", () => gunLockFn());

fireBtnEl.addEventListener("click", () => {
  noOfClicksFn();
  throttleFireFn()?.();
});
