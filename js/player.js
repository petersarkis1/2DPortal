function getPlayer() {
  return{
    x: 32,
    y: 544,
    width: 32,
    bottom: function() {
      return {
        x1: this.x + this.margin,
        y1: this.y + 32 + this.margin,
        x2: this.x + 32 - this.margin,
        y2: this.y + 32 + this.margin
      }
    },
    height: 32,
    top: function() {
      return {
        x1: this.x + this.margin,
        y1: this.y - this.margin,
        x2: this.x + 32 - this.margin,
        y2: this.y - this.margin
      }
    },
    left: function() {
      return {
        x1: this.x - this.margin,
        y1: this.y + this.margin,
        x2: this.x - this.margin,
        y2: this.y + 32 - this.margin
      }
    },
    right: function() {
      return {
        x1: this.x + 32 + this.margin,
        y1: this.y + this.margin,
        x2: this.x + 32 + this.margin,
        y2: this.y + 32 - this.margin
      }
    },
    margin: 2,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false,
    currentChell: chell_right,
    FrameI: 0,
    frameSpeed: 10,
    frameCount: 0,
    notInWalls: function() {
      return (coordinateToGridPos(this.x + 32, this.y + 32)[1] !== levels[curLvl][0].length - 1 &&
        coordinateToGridPos(this.x, this.y + 32)[1] !== 0)
    },
    collideWith: function(arr) {
      for (var i = 0; i < arr.length; i++) {
        dir = arr[i];
        x1 = this[dir]().x1;
        y1 = this[dir]().y1;
        x2 = this[dir]().x2;
        y2 = this[dir]().y2;
        if (isGridLocFull(coordinateToGridPos(x1, y1)) || isGridLocFull(coordinateToGridPos(x2, y2))) {
          tempSpeed = 0;
          if (dir === 'bottom') {
            this.jumping = false;
            friction = 0.8;
          }
          while (isGridLocFull(coordinateToGridPos(x1, y1)) || isGridLocFull(coordinateToGridPos(x2, y2))) {
            x1 = this[dir]().x1;
            y1 = this[dir]().y1;
            x2 = this[dir]().x2;
            y2 = this[dir]().y2;
            if (dir === 'bottom') {
              this.y -= 0.1
              this.velY = 0;
            }
            if (dir === 'top') {
              this.y += 0.1
              this.velY = 0;
            }
            if (dir === 'left') {
              this.x += 0.1
              this.velX = 0;
            }
            if (dir === 'right') {
              this.x -= 0.1
              this.velX = 0;
            }
          }
        }
      }
    },
    setSpriteDirection: function() {
      if (Math.trunc(this.velX) === 0) {
        this.frameCount = 1;
        this.FrameI = 0;
      }
      if (this.velX > 0) {
        this.currentChell = chell_right;
      }
      if (this.velX < 0) {
        this.currentChell = chell_left;
      }
    }
  };
}
