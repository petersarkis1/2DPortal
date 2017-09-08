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
let title = new Image(960, 640);
title.src = 'title.png';
let finish = new Image(960, 640);
finish.src = 'finish.png';
let level_sign = new Image(64, 64);
level_sign.src = 'sign.png';

function getBluePortal() {
  return {
    x: -10,
    y: -10,
    width: 5,
    height: 32,
    images: {
      left: blue_portal_image_left,
      right: blue_portal_image_right,
      floor: blue_portal_image_floor,
      ceiling: blue_portal_image_ceiling
    },
    image: blue_portal_image_left,
    dir: "left",
    FrameI: 0,
    frameSpeed: 10,
    frameCount: 0
  };
}

function getOrangePortal() {
  return {
    x: -10,
    y: -10,
    width: 5,
    height: 32,
    images: {
      left: orange_portal_image_left,
      right: orange_portal_image_right,
      floor: orange_portal_image_floor,
      ceiling: orange_portal_image_ceiling
    },
    image: orange_portal_image_left,
    dir: "left",
    FrameI: 0,
    frameSpeed: 10,
    frameCount: 0
  };
}

function getStartDoor() {
  return {
    x: 32,
    y: 544,
    width: 64,
    height: 64
  };
}

function getEndDoor(){
  return {
    x: 864,
    y: 544,
    width: 64,
    height: 64
  };
}
