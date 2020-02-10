import Sword from './sword.js'

class Player {
  constructor() {
    this.lastPos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }
    this.pos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }

    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/link.png"
    this.swordSound = new Audio("./assets/sfx/sword.wav");

    this.runCycle = 0;
    this.frame = 0;
    this.attackFrame = 0;
    this.cooldown = 0;
    this.tracebox = {
      topLeft: [this.pos.x + 9, this.pos.y + 24],
      topRight: [this.pos.x + 39, this.pos.y + 24],
      bottomLeft: [this.pos.x + 9, this.pos.y + 45],
      bottomRight: [this.pos.x + 39, this.pos.y + 45],
    }

    this.attacks = [];
    this.swordHitBox = null;
  }

  attack() {
    // this.swordSound.play()
    this.attacks.push(new Sword(this.pos))
    console.log(this.attacks)
  }
  
  step(x,y) {
    // this.lastPos[0] = this.pos[0];
    // this.lastPos[1] = this.pos[1];
    this.pos.x += x;
    this.pos.y += y;
    this.tracebox.topLeft[0] += x, this.tracebox.topLeft[1] += y
    this.tracebox.topRight[0] += x, this.tracebox.topRight[1] += y
    this.tracebox.bottomLeft[0] += x, this.tracebox.bottomLeft[1] += y
    this.tracebox.bottomRight[0] += x, this.tracebox.bottomRight[1] += y
  }

  draw(ctx) {
    if (this.swordHitBox && !this.attackFrame) this.swordHitBox = null;
    if (this.cooldown) this.cooldown--
    if (this.runCycle < 9) {
      this.frame = 0;
    } else {
      this.frame = 48;
    }
    if (this.runCycle > 15) this.runCycle = 0;
    if (this.attackFrame) {
      ctx.drawImage(
        this.sprite,
        this.pos.direction,
        153,
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
      // this.swordX = this.pos.x
      // this.swordY = this.pos.y
      // if (this.pos.direction === 0) {
      //   this.swordY += 48;
      // } else if (this.pos.direction === 48) {
      //   this.swordX -= 48;
      // } else if (this.pos.direction === 96) {
      //  this.swordY -= 48
      // } else if (this.pos.direction === 144) {
      //   this.swordX += 48;
      // }
      // ctx.drawImage(
      //   this.sprite,
      //   this.direction,
      //   204,
      //   48,
      //   48,
      //   this.swordX,
      //   this.swordY,
      //   48,
      //   48
      // )
      this.attackFrame--
    } else {
      ctx.drawImage(
        this.sprite,
        this.pos.direction,
        this.frame,
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
    }
    this.lastPos.x = this.pos.x;
    this.lastPos.y = this.pos.y;
  }
  // draw(ctx) {
  //   if (this.swordHitBox && !this.attackFrame) this.swordHitBox = null;
  //   if (this.cooldown) this.cooldown--
  //   if (this.runCycle < 9) {
  //     this.frame = 0;
  //   } else {
  //     this.frame = 48;
  //   }
  //   if (this.runCycle > 15) this.runCycle = 0;
  //   if (this.attackFrame) {
  //     ctx.drawImage(
  //       this.sprite,
  //       this.pos.direction,
  //       153,
  //       48,
  //       48,
  //       this.pos.x,
  //       this.pos.y,
  //       48,
  //       48
  //     )
  //     this.swordX = this.pos.x
  //     this.swordY = this.pos.y
  //     if (this.pos.direction === 0) {
  //       this.swordY += 48;
  //     } else if (this.pos.direction === 48) {
  //       this.swordX -= 48;
  //     } else if (this.pos.direction === 96) {
  //      this.swordY -= 48
  //     } else if (this.pos.direction === 144) {
  //       this.swordX += 48;
  //     }
  //     ctx.drawImage(
  //       this.sprite,
  //       this.direction,
  //       204,
  //       48,
  //       48,
  //       this.swordX,
  //       this.swordY,
  //       48,
  //       48
  //     )
  //     this.attackFrame--
  //   } else {
  //     ctx.drawImage(
  //       this.sprite,
  //       this.pos.direction,
  //       this.frame,
  //       48,
  //       48,
  //       this.pos.x,
  //       this.pos.y,
  //       48,
  //       48
  //     )
  //   }
  //   this.lastPos.x = this.pos.x;
  //   this.lastPos.y = this.pos.y;
  // }

  clear(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, 48, 48);
    if (this.cooldown) ctx.clearRect(this.swordX, this.swordY, 48, 48);
  }
}

export default Player;