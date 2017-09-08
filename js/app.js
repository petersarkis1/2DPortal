let canvas = document.getElementById("canvas");
let sound = document.getElementById("sound");
ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 640;

let player = getPlayer();
let bluePortal = getBluePortal();
let orangePortal = getOrangePortal();
let startDoor = getStartDoor();
let endDoor = getEndDoor();
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
let mouseX = 0;
let mouseY = 0;
let levels = getLevels();
let curLvl = 0;
let width = window.innerWidth;
let height = window.innerHeight;
let time;
let done = false
let portalCount = 0;
let finalTime;
let minutes = 0;
let time0 = "";

//game loop
function update() {
  if (curLvl === 0) {
    ctx.drawImage(title, 0, 0);
    if (keys[13]) {
      curLvl = 1;
      time = new Date();
    }
  } else if (curLvl === levels.length) {
    if (!done) {
      done = true;
      finalTime = (new Date() - time) / 1000;
      while (finalTime > 60) {
        finalTime -= 60;
        minutes += 1;
      }
      if (finalTime < 10) {
        time0 = '0';
      }
    }
    ctx.drawImage(finish, 0, 0);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#545454";
    ctx.fillText(minutes + ':' + time0 + Math.round(finalTime * 100) / 100, 490, 390);
    ctx.fillText(portalCount, 490, 456);
    if (keys[13]) {
      location.reload();
    }
  } else {
    for (let x = 0; x < 30; x++) {
      for (let y = 0; y < 20; y++) {
        let pos = levels[curLvl][y][x];
        //clear empty space
        if (pos === 0) {
          ctx.clearRect(x * 32, y * 32, 32, 32);
        }
        //non-portalable squares
        if (pos === 1) {
          drawBorderedCube(x, y, "black", "gray", 1);
        }
        //portalable squares
        if (pos === 2) {
          drawBorderedCube(x, y, "darkgray", "white", 1);
        }
        //glass squares
        if (pos === 3) {
          drawBorderedCube(x, y, "darkgray", "white", 0.2);
        }
      }
    }

    player.jumping = true;
    if (player.notInWalls()) {
      player.collideWith(['bottom', 'top']);
    }
    player.collideWith(['left', 'right']);

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

    //physics movement
    player.velX *= friction;
    player.velY += gravity;
    player.x += player.velX;
    player.y += player.velY;

    //sprite animation
    player.setSpriteDirection();
    animateSprite(player);
    animateSprite(bluePortal);
    animateSprite(orangePortal);

    //draw gates and sign
    ctx.drawImage(portal_door_start, startDoor.x, startDoor.y);
    ctx.drawImage(portal_door_end, endDoor.x, endDoor.y);
    ctx.drawImage(level_sign, startDoor.x + 64, startDoor.y);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    if (curLvl < 10) {
      ctx.fillText('0' + curLvl, startDoor.x + 82, startDoor.y + 32);
    } else {
      ctx.fillText(curLvl, startDoor.x + 82, startDoor.y + 32);
    }
    finalPos = portalAim();

    if (blueShoot) {
      blueShoot = false;
      firePortal(bluePortal, orangePortal, 'blue')
    }
    if (orangeShoot) {
      orangeShoot = false;
      firePortal(orangePortal, bluePortal, 'orange')
    }

    //(portal in  ,  portal out)
    floorPortalCollision(bluePortal, orangePortal);
    floorPortalCollision(orangePortal, bluePortal);

    ceilingPortalCollision(bluePortal, orangePortal);
    ceilingPortalCollision(orangePortal, bluePortal);

    leftPortalCollision(bluePortal, orangePortal);
    leftPortalCollision(orangePortal, bluePortal);

    rightPortalCollision(bluePortal, orangePortal);
    rightPortalCollision(orangePortal, bluePortal);

    if (player.velY > 27) {
      player.velY = 27;
    }
    ctx.drawImage(player.currentChell, (player.FrameI * 32), 0, 32, 32, player.x, player.y, 32, 32);
    ctx.clearRect(bluePortal.x, bluePortal.y, bluePortal.width, bluePortal.height);
    ctx.drawImage(bluePortal.image, (bluePortal.FrameI * bluePortal.width), 0, bluePortal.width, bluePortal.height, bluePortal.x, bluePortal.y, bluePortal.width, bluePortal.height);
    ctx.clearRect(orangePortal.x, orangePortal.y, orangePortal.width, orangePortal.height);
    ctx.drawImage(orangePortal.image, (orangePortal.FrameI * orangePortal.width), 0, orangePortal.width, orangePortal.height, orangePortal.x, orangePortal.y, orangePortal.width, orangePortal.height);

    if (player.x < endDoor.x + endDoor.width &&
      player.x + player.width > endDoor.x &&
      player.y < endDoor.y + endDoor.height &&
      player.y + player.height > endDoor.y) {
      player.x = startDoor.x;
      player.y = startDoor.y;
      bluePortal.x = -10;
      bluePortal.y = -10;
      orangePortal.x = -10;
      orangePortal.y = -10;
      curLvl++;
    }
  }
  requestAnimationFrame(update);
}

function drawBorderedCube(x, y, border, center, alpha) {
  ctx.fillStyle = border;
  ctx.fillRect(x * 32, y * 32, 32, 32);
  ctx.fillStyle = center;
  ctx.globalAlpha = alpha;
  ctx.fillRect(x * 32 + 1, y * 32 + 1, 30, 30);
  ctx.globalAlpha = 1.0;
}

function coordinateToGridPos(x, y) {
  return [Math.floor(y / 32), Math.floor(x / 32)];
}

function isGridLocFull(arr) {
  return levels[curLvl][arr[0]][arr[1]] !== 0;
}

function isGridLocFullNotGlass(arr) {
  return levels[curLvl][arr[0]][arr[1]] !== 0 && levels[curLvl][arr[0]][arr[1]] !== 3;
}

function getGridItem(arr) {
  return levels[curLvl][arr[0]][arr[1]];
}

function animateSprite(spr) {
  if (spr.frameCount % spr.frameSpeed === 0) {
    if (spr.FrameI === 3) {
      spr.FrameI = 0;
    } else {
      spr.FrameI++;
    }
  }
  spr.frameCount++;
}

function portalAim() {
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
  return finalPos;
}

function firePortal(portal, otherPortal, color) {
  if (getGridItem(coordinateToGridPos(finalPos[0], finalPos[1])) === 2) {
    portalCount++;
    //left portal
    if (!isGridLocFull(coordinateToGridPos(finalPos[0] - 1, finalPos[1]))) {
      portal.dir = "left";
      portal.width = 5;
      portal.height = 32;
      portal.image = portal.images[portal.dir];
      portal.x = finalPos[0] - 5;
      portal.y = finalPos[1] - finalPos[1] % 32;
    }
    //right portal
    if (!isGridLocFull(coordinateToGridPos(finalPos[0] + 1, finalPos[1]))) {
      portal.dir = "right";
      portal.width = 5;
      portal.height = 32;
      portal.image = portal.images[portal.dir];
      portal.x = finalPos[0];
      portal.y = finalPos[1] - finalPos[1] % 32;
    }
    //floor portal
    if (!isGridLocFull(coordinateToGridPos(finalPos[0], finalPos[1] - 1))) {
      portal.dir = "floor";
      portal.width = 32;
      portal.height = 5;
      portal.image = portal.images[portal.dir];
      portal.x = finalPos[0] - finalPos[0] % 32;
      portal.y = finalPos[1] - 5;
    }
    //ceiling portal
    if (!isGridLocFull(coordinateToGridPos(finalPos[0], finalPos[1] + 1))) {
      portal.dir = "ceiling";
      portal.width = 32;
      portal.height = 5;
      portal.image = portal.images[portal.dir];
      portal.x = finalPos[0] - finalPos[0] % 32;
      portal.y = finalPos[1];
    }
  }
  if (Math.abs(otherPortal.x - portal.x) < 1 && Math.abs(otherPortal.y - portal.y) < 1) {
    otherPortal.x = -10
    otherPortal.y = -10
  }
}

function floorPortalCollision(portal, otherPortal) {
  if (portal.dir === 'floor' &&
    player.x < portal.x + portal.width - 8 &&
    player.x + player.width > portal.x + 8 &&
    player.y < portal.y + portal.height - 8 &&
    player.y + player.height > portal.y + 2) {
    friction = 0.98;
    if (otherPortal.x != -10 && otherPortal.dir === 'ceiling') {
      player.x = otherPortal.x;
      player.y = otherPortal.y + 4;
      player.velX = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'left') {
      canMove = false;
      moveTimeout();
      player.x = otherPortal.x - 36;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'right') {
      canMove = false;
      moveTimeout();
      player.x = otherPortal.x + 12;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'floor') {
      player.x = otherPortal.x;
      player.y = otherPortal.y - 32;
      player.velY = -Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = 0;
    }
  }
}

function ceilingPortalCollision(portal, otherPortal) {
  if (portal.dir === 'ceiling' &&
    player.x < portal.x + portal.width - 8 &&
    player.x + player.width > portal.x + 8 &&
    player.y < portal.y + portal.height - 2 &&
    player.y + player.height > portal.y) {
    friction = 0.98;
    if (otherPortal.x != -10 && otherPortal.dir === 'ceiling') {
      player.x = otherPortal.x;
      player.y = otherPortal.y + 4;
      player.velY = -player.velY;
      player.velX = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'left') {
      player.x = otherPortal.x - 36;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'right') {
      player.x = otherPortal.x + 12;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'floor') {
      player.x = otherPortal.x;
      player.y = otherPortal.y - 32;
      player.velY = player.velY;
      player.velX = 0;
    }
  }
}

function leftPortalCollision(portal, otherPortal) {
  if (portal.dir === 'left' &&
    player.x < portal.x + portal.width &&
    player.x + player.width - 2 > portal.x &&
    player.y < portal.y + portal.height - 4 &&
    player.y + player.height > portal.y + 2) {
    friction = 0.98;
    if (otherPortal.x != -10 && otherPortal.dir === 'ceiling') {
      player.x = otherPortal.x;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = tempSpeed;
      player.velX = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'left') {
      canMove = false;
      moveTimeout();
      player.x = otherPortal.x - 36;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'right') {
      player.x = otherPortal.x + 12;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'floor') {
      player.x = otherPortal.x;
      player.y = otherPortal.y - 32;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = -tempSpeed;
    }
  }
}

function rightPortalCollision(portal, otherPortal) {
  if (portal.dir === 'right' &&
    player.x < portal.x + portal.width - 2 &&
    player.x + player.width > portal.x &&
    player.y < portal.y + portal.height - 4 &&
    player.y + player.height > portal.y + 2) {
    friction = 0.98;
    if (otherPortal.x != -10 && otherPortal.dir === 'ceiling') {
      player.x = otherPortal.x;
      player.y = otherPortal.y + 4;
      player.velX = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'left') {
      player.x = otherPortal.x - 36;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = -tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'right') {
      canMove = false;
      moveTimeout();
      player.x = otherPortal.x + 10;
      player.y = otherPortal.y + 4;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velX = tempSpeed;
      player.velY = 0;
    }
    if (otherPortal.x != -10 && otherPortal.dir === 'floor') {
      player.x = otherPortal.x;
      player.y = otherPortal.y - 32;
      tempSpeed += Math.sqrt(Math.pow(player.velX, 2) + Math.pow(player.velY, 2));
      player.velY = -tempSpeed;
      player.velX = 0;
    }
  }
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
  if (curLvl !== 0 && curLvl !== levels.length) {
    if (el.button === 0 && blueCanShoot) {
      sound.play();
      blueShoot = true;
      blueCanShoot = false;
      setTimeout(function() {
        blueCanShoot = true;
      }, 200);
    }
    if (el.button === 2 && orangeCanShoot) {
      sound.play();
      orangeShoot = true;
      orangeCanShoot = false;
      setTimeout(function() {
        orangeCanShoot = true;
      }, 200);
    }
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
