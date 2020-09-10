PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const app = new PIXI.Application({
  width: 480,
  height: 320,
});

const tileSize = 16;

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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
  ],
};

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add("tileset", "asset.png").load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image

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
  let sky = 
    new PIXI.TilingSprite(
      tileTextures[74], 
      map.width * tileSize, 
      map.height * tileSize
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

  sky.scale.x = sky.scale.y = 2;
  background.scale.x = 2;
  background.scale.y = 2;

  app.stage.addChild(sky);
  app.stage.addChild(background);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    // background.rotation += 0.01;
  });
});

// 애러 핸들링
app.loader.onError.add((...args) => console.log(args));
