let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 640;
let chell_right = new Image(32, 128);
chell_right.src = 'chell_right.png';
let chell_left = new Image(32, 128);
chell_left.src = 'chell_left.png';
let blue_portal_image_left = new Image(32, 20);
blue_portal_image_left.src = 'bluePortalLeft.png';
let blue_portal_image_right = new Image(32, 20);
blue_portal_image_right.src = 'bluePortalRight.png';
let blue_portal_image_floor = new Image(5, 128);
blue_portal_image_floor.src = 'bluePortalFloor.png';
let blue_portal_image_ceiling = new Image(5, 128);
blue_portal_image_ceiling.src = 'bluePortalCeiling.png';
let orange_portal_image_left = new Image(32, 20);
orange_portal_image_left.src = 'orangePortalLeft.png';
let orange_portal_image_right = new Image(32, 20);
orange_portal_image_right.src = 'orangePortalRight.png';
let orange_portal_image_floor = new Image(5, 128);
orange_portal_image_floor.src = 'orangePortalFloor.png';
let orange_portal_image_ceiling = new Image(5, 128);
orange_portal_image_ceiling.src = 'orangePortalCeiling.png';
let portal_door_start = new Image(64, 64);
portal_door_start.src = 'portalDoorStart.png';
let portal_door_end = new Image(64, 64);
portal_door_end.src = 'portalDoorEnd.png';
let cube_image = new Image(32, 32);
cube_image.src = 'cube.png';
let player = {
  x: 32,
  y: 544,
  width: 32,
  height: 32,
  speed: 3,
  velX: 0,
  velY: 0,
  jumping: false,
  currentChell: chell_right,
  FrameI: 0,
  frameSpeed: 10,
  frameCount: 0
};
let bluePortal = {
  x: -10,
  y: -10,
  width: 5,
  height: 32,
  image: blue_portal_image_left,
  dir: "left",
  FrameI: 0,
  frameSpeed: 10,
  frameCount: 0
};
let orangePortal = {
  x: -10,
  y: -10,
  width: 5,
  height: 32,
  image: orange_portal_image_left,
  dir: "left",
  FrameI: 0,
  frameSpeed: 10,
  frameCount: 0
};
let startDoor = {
  x: 32,
  y: 544,
  width: 64,
  height: 64
};
let endDoor = {
  x: 864,
  y: 544,
  width: 64,
  height: 64
};
let cube = {
  x: 60,
  y: 60,
  width: 16,
  height: 16,
  velX: 0,
  velY: 0,
  image: cube_image
};
let tempSpeed = 0;
let canMove = true;
let aim = false;
let blueShoot = false;
let blueCanShoot = true;
let orangeShoot = false;
let orangeCanShoot = true;
let keys = [];
let canLeft = true;
let friction = 0.8;
let gravity = 0.24;
let margin = 2;
let portalMargin = 8;
let mouseX = 0;
let mouseY = 0;
let width = window.innerWidth;
let height = window.innerHeight;

// [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];

let lvl1 = [
  [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
let lvl2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
let lvl3 = [
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 1],
  [1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 0, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 3, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
let lvl4 = [
  [1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 3, 1],
  [1, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 1, 1, 2, 1, 2, 1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 3, 1, 1, 3, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 2, 1, 1, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 3, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1]
];

let lvl5 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let currentLvl = lvl1;

function update() {
  for (let x = 0; x < 30; x++) {
    for (let y = 0; y < 20; y++) {
      let pos = currentLvl[y][x];
      if (pos === 0) {
        ctx.clearRect(x * 32, y * 32, 32, 32);
      }
      if (pos === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * 32, y * 32, 32, 32);
        ctx.fillStyle = "gray";
        ctx.fillRect(x * 32 + 1, y * 32 + 1, 30, 30);
      }
      if (pos === 2) {
        ctx.fillStyle = "darkgray";
        ctx.fillRect(x * 32, y * 32, 32, 32);
        ctx.fillStyle = "white";
        ctx.fillRect(x * 32 + 1, y * 32 + 1, 30, 30);
      }
      if (pos === 3) {
        ctx.fillStyle = "darkgray";
        ctx.fillRect(x * 32, y * 32, 32, 32);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "white";
        ctx.fillRect(x * 32 + 1, y * 32 + 1, 30, 30);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  //player
  player.jumping = true;
  if (coordinateToGridPos(player.x + 32, player.y + 32)[1] !== currentLvl[0].length - 1 && coordinateToGridPos(player.x, player.y + 32)[1] !== 0) {
    while (isGridLocFull(coordinateToGridPos(player.x + margin, player.y + 32 + margin)) || isGridLocFull(coordinateToGridPos(player.x + 32 - margin, player.y + 32 + margin))) {
      tempSpeed = 0;
      friction = 0.8;
      player.y -= 0.1;
      player.velY = 0;
      player.jumping = false;
    }
    while (isGridLocFull(coordinateToGridPos(player.x + margin, player.y - margin)) || isGridLocFull(coordinateToGridPos(player.x + 32 - margin, player.y - margin))) {
      tempSpeed = 0;
      player.y += 0.1;
      player.velY = 0;
      player.jumping = true;
    }
  }
  while (isGridLocFull(coordinateToGridPos(player.x - margin, player.y + margin)) || isGridLocFull(coordinateToGridPos(player.x - margin, player.y + 32 - margin))) {
    tempSpeed = 0;
    player.x += 0.1;
    player.velX = 0;
    player.jumping = true;
  }
  while (isGridLocFull(coordinateToGridPos(player.x + 32 + margin, player.y + margin)) || isGridLocFull(coordinateToGridPos(player.x + 32 + margin, player.y + 32 - margin))) {
    tempSpeed = 0;
    player.x -= 0.1;
    player.velX = 0;
    player.jumping = true;
  }

  //cube
  // if (coordinateToGridPos(cube.x + 16, cube.y + 16)[1] !== currentLvl[0].length - 1 && coordinateToGridPos(cube.x, cube.y + 16)[1] !== 0) {
  //   while (isGridLocFull(coordinateToGridPos(cube.x + margin, cube.y + 16 + margin)) || isGridLocFull(coordinateToGridPos(cube.x + 16 - margin, cube.y + 16 + margin))) {
  //     tempSpeed = 0;
  //     friction = 0.8;
  //     player.y -= 0.1;
  //     player.velY = 0;
  //     player.jumping = false;
  //   }
  //   while (isGridLocFull(coordinateToGridPos(player.x + margin, player.y - margin)) || isGridLocFull(coordinateToGridPos(player.x + 32 - margin, player.y - margin))) {
  //     tempSpeed = 0;
  //     player.y += 0.1;
  //     player.velY = 0;
  //     player.jumping = true;
  //   }
  // }
  // while (isGridLocFull(coordinateToGridPos(player.x - margin, player.y + margin)) || isGridLocFull(coordinateToGridPos(player.x - margin, player.y + 32 - margin))) {
  //   tempSpeed = 0;
  //   player.x += 0.1;
  //   player.velX = 0;
  //   player.jumping = true;
  // }
  // while (isGridLocFull(coordinateToGridPos(player.x + 32 + margin, player.y + margin)) || isGridLocFull(coordinateToGridPos(player.x + 32 + margin, player.y + 32 - margin))) {
  //   tempSpeed = 0;
  //   player.x -= 0.1;
  //   player.velX = 0;
  //   player.jumping = true;
  // }

  if (keys[87] || keys[32]) {
    // up arrow or space
    if (!player.jumping) {
      player.jumping = true;
      player.velY = -player.speed * 2;
    }
  }
  if (keys[68] && canMove) {
    // right arrow
    if (player.velX < player.speed) {
      player.velX++;
    }
  }
  if (keys[65] && canMove) {
    // left arrow
    if (player.velX > -player.speed) {
      player.velX--;
    }
  }
  cube.x += cube.velX;
  cube.y += cube.velY;
  cube.velX *= friction;
  cube.velY += gravity;

  player.x += player.velX;
  player.y += player.velY;
  player.velX *= friction;
  player.velY += gravity;
  ctx.fillStyle = "green";
  //ctx.fillRect(player.x, player.y, 32, 32);
  if (Math.trunc(player.velX) === 0) {
    player.frameCount = 1;
    player.FrameI = 0;
  }
  if (player.velX > 0) {
    player.currentChell = chell_right;
  }
  if (player.velX < 0) {
    player.currentChell = chell_left;
  }
  if (player.frameCount % player.frameSpeed === 0) {
    if (player.FrameI === 3) {
      player.FrameI = 0;
    } else {
      player.FrameI++;
    }
  }
  player.frameCount++;

  if (bluePortal.frameCount % bluePortal.frameSpeed === 0) {
    if (bluePortal.FrameI === 3) {
      bluePortal.FrameI = 0;
    } else {
      bluePortal.FrameI++;
    }
  }
  bluePortal.frameCount++;

  if (orangePortal.frameCount % orangePortal.frameSpeed === 0) {
    if (orangePortal.FrameI === 3) {
      orangePortal.FrameI = 0;
    } else {
      orangePortal.FrameI++;
    }
  }
  orangePortal.frameCount++;

  ctx.drawImage(portal_door_start, startDoor.x, startDoor.y);
  ctx.drawImage(portal_door_end, endDoor.x, endDoor.y);

  let theta = Math.atan2(mouseY - (player.y + 16), mouseX - (player.x + 16));
  let radius = 0;
  let finalPos = [(player.x + 16) + radius * Math.cos(theta), (player.y + 16) + radius * Math.sin(theta)];
  while (!isGridLocFullNotGlass(coordinateToGridPos(finalPos[0], finalPos[1]))) {
    radius++;
    finalPos = [(player.x + 16) + radius * Math.cos(theta), (player.y + 16) + radius * Math.sin(theta)];
  }
  ctx.beginPath();
  ctx.moveTo(player.x + 16, player.y + 16);
  ctx.lineTo(finalPos[0], finalPos[1]);
  ctx.strokeStyle = '#ff0000';
  ctx.stroke();
  if (blueShoot) {
    blueShoot = false;
    if (getGridItem(coordinateToGridPos(finalPos[0], finalPos[1])) === 2) {
      //left portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0] - 1, finalPos[1]))) {
        bluePortal.dir = "left";
        bluePortal.width = 5;
        bluePortal.height = 32;
        bluePortal.image = blue_portal_image_left;
        bluePortal.x = finalPos[0] - 5;
        bluePortal.y = finalPos[1] - finalPos[1] % 32;
      }
      //right portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0] + 1, finalPos[1]))) {
        bluePortal.dir = "right";
        bluePortal.width = 5;
        bluePortal.height = 32;
        bluePortal.image = blue_portal_image_right;
        bluePortal.x = finalPos[0];
        bluePortal.y = finalPos[1] - finalPos[1] % 32;
      }
      //floor portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0], finalPos[1] - 1))) {
        bluePortal.dir = "floor";
        bluePortal.width = 32;
        bluePortal.height = 5;
        bluePortal.image = blue_portal_image_floor;
        bluePortal.x = finalPos[0] - finalPos[0] % 32;
        bluePortal.y = finalPos[1] - 5;
      }
      //ceiling portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0], finalPos[1] + 1))) {
        bluePortal.dir = "ceiling";
        bluePortal.width = 32;
        bluePortal.height = 5;
        bluePortal.image = blue_portal_image_ceiling;
        bluePortal.x = finalPos[0] - finalPos[0] % 32;
        bluePortal.y = finalPos[1];
      }
    }
    if (Math.abs(orangePortal.x - bluePortal.x) < 1 && Math.abs(orangePortal.y - bluePortal.y) < 1) {
      orangePortal.x = -10
      orangePortal.y = -10
    }
  }
  if (orangeShoot) {
    orangeShoot = false;
    if (getGridItem(coordinateToGridPos(finalPos[0], finalPos[1])) === 2) {
      //left portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0] - 1, finalPos[1]))) {
        orangePortal.dir = "left";
        orangePortal.width = 5;
        orangePortal.height = 32;
        orangePortal.image = orange_portal_image_left;
        orangePortal.x = finalPos[0] - 5;
        orangePortal.y = finalPos[1] - finalPos[1] % 32;
      }
      //right portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0] + 1, finalPos[1]))) {
        orangePortal.dir = "right";
        orangePortal.width = 5;
        orangePortal.height = 32;
        orangePortal.image = orange_portal_image_right;
        orangePortal.x = finalPos[0];
        orangePortal.y = finalPos[1] - finalPos[1] % 32;
      }
      //floor portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0], finalPos[1] - 1))) {
        orangePortal.dir = "floor";
        orangePortal.width = 32;
        orangePortal.height = 5;
        orangePortal.image = orange_portal_image_floor;
        orangePortal.x = finalPos[0] - finalPos[0] % 32;
        orangePortal.y = finalPos[1] - 5;
      }
      //ceiling portal
      if (!isGridLocFull(coordinateToGridPos(finalPos[0], finalPos[1] + 1))) {
        orangePortal.dir = "ceiling";
        orangePortal.width = 32;
        orangePortal.height = 5;
        orangePortal.image = orange_portal_image_ceiling;
        orangePortal.x = finalPos[0] - finalPos[0] % 32;
        orangePortal.y = finalPos[1];
      }
    }
    if (Math.abs(orangePortal.x - bluePortal.x) < 1 && Math.abs(orangePortal.y - bluePortal.y) < 1) {
      bluePortal.x = -10
      bluePortal.y = -10
    }
  }

  //floor

  if (bluePortal.dir === 'floor' &&
    player.x < bluePortal.x + bluePortal.width - portalMargin &&
    player.x + player.width > bluePortal.x + portalMargin &&
    player.y < bluePortal.y + bluePortal.height - 8 &&
    player.y + player.height > bluePortal.y + 2) {
    friction = 0.98;
    if (orangePortal.x != -10 && orangePortal.dir === 'ceiling') {
      player.x = orangePortal.x;
      player.y = orangePortal.y + 4;
      player.velX = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'left') {
      player.x = orangePortal.x - 36;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'right') {
      player.x = orangePortal.x + 12;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'floor') {
      player.x = orangePortal.x;
      player.y = orangePortal.y - 32;
      player.velY = -player.velY * 0.97;
      player.velX = 0;
    }
  }

  if (orangePortal.dir === 'floor' &&
    player.x < orangePortal.x + orangePortal.width - portalMargin &&
    player.x + player.width > orangePortal.x + portalMargin &&
    player.y < orangePortal.y + orangePortal.height - 8 &&
    player.y + player.height > orangePortal.y + 2) {
    friction = 0.98;
    if (bluePortal.x != -10 && bluePortal.dir === 'ceiling') {
      player.x = bluePortal.x;
      player.y = bluePortal.y + 4;
      player.velX = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'left') {
      player.x = bluePortal.x - 36;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'right') {
      player.x = bluePortal.x + 12;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'floor') {
      player.x = bluePortal.x;
      player.y = bluePortal.y - 32;
      player.velY = -player.velY * 0.97;
      player.velX = 0;
    }
  }

  //ceiling

  if (bluePortal.dir === 'ceiling' &&
    player.x < bluePortal.x + bluePortal.width - portalMargin &&
    player.x + player.width > bluePortal.x + portalMargin &&
    player.y < bluePortal.y + bluePortal.height - 2 &&
    player.y + player.height > bluePortal.y) {
    friction = 0.98;
    if (orangePortal.x != -10 && orangePortal.dir === 'ceiling') {
      player.x = orangePortal.x;
      player.y = orangePortal.y + 4;
      player.velY = -player.velY;
      player.velX = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'left') {
      player.x = orangePortal.x - 36;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'right') {
      player.x = orangePortal.x + 12;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'floor') {
      player.x = orangePortal.x;
      player.y = orangePortal.y - 32;
      player.velY = player.velY * 0.94;
      player.velX = 0;
    }
  }

  if (orangePortal.dir === 'ceiling' &&
    player.x < orangePortal.x + orangePortal.width - portalMargin &&
    player.x + player.width > orangePortal.x + portalMargin &&
    player.y < orangePortal.y + orangePortal.height - 2 &&
    player.y + player.height > orangePortal.y) {
    friction = 0.98;
    if (bluePortal.x != -10 && bluePortal.dir === 'ceiling') {
      player.x = bluePortal.x;
      player.y = bluePortal.y + 4;
      player.velY = -player.velY;
      player.velX = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'left') {
      player.x = bluePortal.x - 36;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'right') {
      player.x = bluePortal.x + 12;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'floor') {
      player.x = bluePortal.x;
      player.y = bluePortal.y - 32;
      player.velY = player.velY * 0.94;
      player.velX = 0;
    }
  }

  //left

  if (bluePortal.dir === 'left' &&
    player.x < bluePortal.x + bluePortal.width &&
    player.x + player.width - 2 > bluePortal.x &&
    player.y < bluePortal.y + bluePortal.height - 4 &&
    player.y + player.height > bluePortal.y + 2) {
    friction = 0.98;
    if (orangePortal.x != -10 && orangePortal.dir === 'ceiling') {
      player.x = orangePortal.x;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = tempSpeed;
      player.velX = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'left') {
      canMove = false;
      moveTimeout();
      player.x = orangePortal.x - 36;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'right') {
      player.x = orangePortal.x + 12;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'floor') {
      player.x = orangePortal.x;
      player.y = orangePortal.y - 32;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = -tempSpeed;
      //player.velX = 0;
    }
  }

  if (orangePortal.dir === 'left' &&
    player.x < orangePortal.x + orangePortal.width &&
    player.x + player.width - 2 > orangePortal.x &&
    player.y < orangePortal.y + orangePortal.height - 4 &&
    player.y + player.height > orangePortal.y + 2) {
    friction = 0.98;
    if (bluePortal.x != -10 && bluePortal.dir === 'ceiling') {
      player.x = bluePortal.x;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = tempSpeed;
      player.velX = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'left') {
      canMove = false;
      moveTimeout();
      player.x = bluePortal.x - 36;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'right') {
      player.x = bluePortal.x + 12;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'floor') {
      player.x = bluePortal.x;
      player.y = bluePortal.y - 32;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = -tempSpeed;
      player.velX = 0;
    }
  }

  //right

  if (bluePortal.dir === 'right' &&
    player.x < bluePortal.x + bluePortal.width - 2 &&
    player.x + player.width > bluePortal.x &&
    player.y < bluePortal.y + bluePortal.height - 4 &&
    player.y + player.height > bluePortal.y + 2) {
    friction = 0.98;
    if (orangePortal.x != -10 && orangePortal.dir === 'ceiling') {
      player.x = orangePortal.x;
      player.y = orangePortal.y + 4;
      player.velX = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'left') {
      player.x = orangePortal.x - 36;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'right') {
      canMove = false;
      moveTimeout();
      player.x = orangePortal.x + 10;
      player.y = orangePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (orangePortal.x != -10 && orangePortal.dir === 'floor') {
      player.x = orangePortal.x;
      player.y = orangePortal.y - 32;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = -tempSpeed;
      player.velX = 0;
    }
  }

  if (orangePortal.dir === 'right' &&
    player.x < orangePortal.x + orangePortal.width &&
    player.x + player.width - 2 > orangePortal.x &&
    player.y < orangePortal.y + orangePortal.height - 4 &&
    player.y + player.height > orangePortal.y + 2) {
    friction = 0.98;
    if (bluePortal.x != -10 && bluePortal.dir === 'ceiling') {
      player.x = bluePortal.x;
      player.y = bluePortal.y + 4;
      player.velX = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'left') {
      player.x = bluePortal.x - 36;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'right') {
      canMove = false;
      moveTimeout();
      player.x = bluePortal.x + 10;
      player.y = bluePortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (bluePortal.x != -10 && bluePortal.dir === 'floor') {
      player.x = bluePortal.x;
      player.y = bluePortal.y - 32;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = -tempSpeed;
      player.velX = 0;
    }
  }

  if (player.velY > 40) {
    player.velY = 40;
  }
  //console.log(bluePortal.dir, orangePortal.dir);
  //console.log(player.velY, player.velX);
  //console.log(friction);
  ctx.drawImage(player.currentChell, (player.FrameI * 32), 0, 32, 32, player.x, player.y, 32, 32);
  ctx.clearRect(cube.x, cube.y, cube.width, cube.height);
  ctx.drawImage(cube.image, cube.x, cube.y);
  ctx.clearRect(bluePortal.x, bluePortal.y, bluePortal.width, bluePortal.height);
  ctx.drawImage(bluePortal.image, (bluePortal.FrameI * bluePortal.width), 0, bluePortal.width, bluePortal.height, bluePortal.x, bluePortal.y, bluePortal.width, bluePortal.height);
  ctx.clearRect(orangePortal.x, orangePortal.y, orangePortal.width, orangePortal.height);
  ctx.drawImage(orangePortal.image, (orangePortal.FrameI * orangePortal.width), 0, orangePortal.width, orangePortal.height, orangePortal.x, orangePortal.y, orangePortal.width, orangePortal.height);

  if (player.x < endDoor.x + endDoor.width &&
    player.x + player.width > endDoor.x &&
    player.y < endDoor.y + endDoor.height &&
    player.y + player.height > endDoor.y){
    player.x = startDoor.x;
    player.y = startDoor.y;
    bluePortal.x = -10;
    bluePortal.y = -10;
    orangePortal.x = -10;
    orangePortal.y = -10;
    if (currentLvl == lvl4) {
      currentLvl = lvl5;
    }
    if (currentLvl == lvl3) {
      currentLvl = lvl4;
    }
    if (currentLvl == lvl2) {
      currentLvl = lvl3;
    }
    if (currentLvl == lvl1) {
      currentLvl = lvl2;
    }
  }

  requestAnimationFrame(update);
}

function coordinateToGridPos(x, y) {
  return [Math.floor(y / 32), Math.floor(x / 32)];
}

function isGridLocFull(arr) {
  return currentLvl[arr[0]][arr[1]] !== 0;
}

function isGridLocFullNotGlass(arr) {
  return currentLvl[arr[0]][arr[1]] !== 0 && currentLvl[arr[0]][arr[1]] !== 3;
}

function getGridItem(arr) {
  return currentLvl[arr[0]][arr[1]];
}

function moveTimeout() {
  setTimeout(function() {
    canMove = true;
  }, 200);
}

window.addEventListener("mousemove", function(el) {
  let rect = canvas.getBoundingClientRect();
  mouseX = el.clientX - rect.left;
  mouseY = el.clientY - rect.top;
});
window.addEventListener('contextmenu', function(el) {
  el.preventDefault();
  return false;
}, false);
window.addEventListener("mousedown", function(el) {
  if (el.button === 0 && blueCanShoot) {
    blueShoot = true;
    blueCanShoot = false;
    setTimeout(function() {
      blueCanShoot = true;
    }, 200);
  }
  if (el.button === 2 && orangeCanShoot) {
    orangeShoot = true;
    orangeCanShoot = false;
    setTimeout(function() {
      orangeCanShoot = true;
    }, 200);
  }
});

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

window.addEventListener("load", function() {
  update();
});
