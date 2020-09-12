PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const app = new PIXI.Application({
  width: 480,
  height: 320,
});

const tileSize = 16;
const characterSize = 32;
const SCALE = 2;

let map = {
  width: 30,
  height: 10,
  tiles: [
    12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,23,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,30,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,30,12,12,3, 4, 4, 5, 12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,30,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,37,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 12, 12, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 12, 12, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  ],
  collision: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  ],
};

function testCollision(worldX, worldY) {
  let mapX = Math.floor(worldX / tileSize / SCALE);
  let mapY = Math.floor(worldY / tileSize / SCALE);
  return map.collision[mapY * map.width + mapX];
}

class Keyboard {
  constructor () {
    this.pressed = {};
  }

  watch (el) {
    el.addEventListener('keydown', (e) => {
      console.log(e.key)
      this.pressed[e.key] = true;
    })
    el.addEventListener('keyup', (e) => {
      this.pressed[e.key] = false;
    })
  } 
}

app.view.setAttribute('tabindex', 0);

document.body.appendChild(app.view);


app.loader.add("tileset", "asset.png")
app.loader.add("character", "FinnSprite.png")
app.loader.add("characterMirror", "FinnSpriteMirror.png")
// app.loader.add("character", "FinnInstruction.png")

app.loader.load((loader, resources) => {

  let kb = new Keyboard();
  kb.watch(app.view);

  let tileTextures = [];
  for (let i = 0; i < 7 * 11; i++) {
    let x = i % 7;
    let y = Math.floor(i / 7);
    tileTextures[i] = new PIXI.Texture(
      resources.tileset.texture,
      // new PIXI.Rectangle(tx, ty, tw, th)
      new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
    );
  }

  let characterFrames = [];
  for (let i = 0; i < 25; i++) {
    characterFrames[i] = new PIXI.Texture(
      resources.character.texture,
      // new PIXI.Rectangle(tx, ty, tw, th)
      new PIXI.Rectangle(i * characterSize, 0, characterSize, characterSize)
    );
  }

  let characterFramesMirror = [];
  for (let i = 0; i < 25; i++) {
    characterFramesMirror[i] = new PIXI.Texture(
      resources.characterMirror.texture,
      // new PIXI.Rectangle(tx, ty, tw, th)
      new PIXI.Rectangle(i * characterSize, 0, characterSize, characterSize)
    );
  }

  const blob = new PIXI.Sprite(characterFrames[0]);
  blob.scale.x = SCALE;
  blob.scale.y = SCALE;

  // texture를 타일로 이어붙임
  let sky = new PIXI.TilingSprite(tileTextures[74], 
    map.width * tileSize, map.height * tileSize
  );
  
  let background = new PIXI.Container();
  for (let y = 0; y < map.width; y++) {
    for (let x = 0; x < map.width; x++) {
      let tile = map.tiles[y * map.width + x];
      let sprite = new PIXI.Sprite(tileTextures[tile]);
      sprite.x = x * tileSize;
      sprite.y = y * tileSize;
      background.addChild(sprite);
    }
  }

  sky.scale.x = sky.scale.y = SCALE;
  background.scale.y = SCALE;
  background.scale.x = SCALE;

  app.stage.addChild(sky);
  app.stage.addChild(background);
  app.stage.addChild(blob);

  let character = {
    x: 0, y: 0,
    vx: 0, vy: 0,
    dir: true,
    jumped: false,
  }

  let scrollX = 0;
  let scrollY = 0;

  // Listen for frame updates 
  app.ticker.add(() => {

    blob.x = character.x;
    blob.y = character.y;

    character.vy = character.vy + 1;
    character.x += character.vx;

    let touchingGround = testCollision(
      character.x,
      character.y + tileSize * SCALE * 2 + 1
    );

    if (character.vy > 0) {
      for (let i = 0; i < character.vy; i++) {
        let testX1 = character.x;
        let testX2 = character.x + tileSize * SCALE - 1;
        let testY = character.y + tileSize * SCALE * 2 - 10;
        if (testCollision(testX1, testY) || testCollision(testX2, testY)) {
          character.vy = 0;
          break;
        }
        character.y = character.y + 1;
      }
    }
    
    if (character.x + scrollX > app.view.width - tileSize * SCALE * 6){
      scrollX = Math.max(
        app.view.width - map.width * tileSize * SCALE,
        app.view.width - character.x - tileSize * SCALE * 6
      );
    }
    if (character.x + scrollX < tileSize * SCALE * 5){
      scrollX = Math.min(0, -character.x + tileSize * SCALE * 5);
    }
    
    app.stage.x = scrollX



    if (kb.pressed.ArrowUp && !character.jumped) {
      character.vy = -15;
      character.jumped = true;
    }
    if (kb.pressed.ArrowUp && touchingGround && character.jumped) {
      character.jumped = false;
    }
    if (kb.pressed.ArrowRight) {
      character.vx = Math.min(5, character.vx + 2);
    }
    if (kb.pressed.ArrowLeft) {
      character.vx = Math.max(-5, character.vx - 2);
    }

    if (character.vy < 0) {
      character.y += character.vy;
    }
    if (character.vx > 0) {
      character.vx -= 1;
    }
    if (character.vx < 0) {
      character.vx += 1;
    }

    if (!touchingGround) {
      blob.texture = character.dir ? characterFrames[0] : characterFramesMirror[24];
    } 

    if (character.x < 0 && kb.pressed.ArrowLeft) {
      character.vx = 0;
    }
    if (character.x > map.width * tileSize * SCALE - 50 && kb.pressed.ArrowRight) {
      character.vx = 0;
    }
    
    // character animate
    if (character.vx > 0) {
      blob.texture = characterFrames[(Math.floor(Date.now() / 100) % 6) + 10];
      character.dir = true;
    } else if (character.vx < 0) {
      blob.texture = characterFramesMirror[(Math.floor(Date.now() / 100) % 6) + 14];
      character.dir = false;
    } else {
      blob.texture = character.dir 
        ? characterFrames[(Math.floor(Date.now() / 200) % 6) + 0] 
        : characterFramesMirror[(Math.floor(Date.now() / 200) % 6) + 19];
    }
    

  });
});

// 애러 핸들링
app.loader.onError.add((...args) => console.log(args));
