PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const app = new PIXI.Application({
  width: 480,
  height: 320,
});

const tileSize = 16;
const characterSize = 32;
const SCALE = 2;

let map = {
  width: 16,
  height: 10,
  tiles: [
    12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,23,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,30,12,12,3, 4, 4, 5, 12,12,12,12,12,12,
    12,12,12,30,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,30,12,12,12,12,12,12,12,12,12,12,12,12,
    12,12,12,37,12,12,12,12,12,12,12,12,12,12,12,12,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  ],
  collision: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
  ],
};

function testCollision(worldX, worldY) {
  let mapX = Math.floor(worldX / tileSize / SCALE)
  let mapY = Math.floor(worldY / tileSize / SCALE)
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


document.body.appendChild(app.view);
app.view.setAttribute('tabindex', 0);


app.loader.add("tileset", "asset.png")
app.loader.add("character", "FinnSprite.png")
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

  const blob = new PIXI.Sprite(characterFrames[0]);
  blob.scale.x = SCALE;
  blob.scale.y = SCALE;

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
  }

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

    if (character.vy < 0) {
      character.y += character.vy;
    }

    if (kb.pressed.ArrowUp) {
      character.vy = -10;
    }
    if (kb.pressed.ArrowRight) {
      character.vx += 2;
    }
    if (kb.pressed.ArrowLeft) {
      character.vx -= 2;
    }

    if (character.vx > 0) {
      character.vx -= 1;
    }
    if (character.vx < 0) {
      character.vx += 1;
    }

    if (!touchingGround) {
      blob.texture = characterFrames[0];
    } else {
      blob.texture = characterFrames[0];
    }
  });
});

// 애러 핸들링
app.loader.onError.add((...args) => console.log(args));
