import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import { Text } from './Text.js';

import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
});

PIXI.loader
  .add('sprite.png')
  .load(setup);

function setup() {
  let sprite = new PIXI.Sprite(PIXI.loader.resources["sprite.png"].texture);
  app.stage.addChild(sprite)
}

class App extends Component{
  constructor() {
    super();
    this.state = {
      a: 10,
    }

    document.body.appendChild(app.view);

    // // 배경색 변경
    // app.renderer.backgroundColor = 0xf1df1f;
    
    // // 배경사이즈 변경
    // app.renderer.autoResize = true;
    // app.renderer.resize(500, 500);

    // app.renderer.view.style.position = 'absolute';
    // app.renderer.view.style.display = 'block';

    // // 전체화면
    // app.renderer.autoResize = true;
    // app.renderer.resize(window.innerWidth, window.innerHeight);

    // // 이미지 가져오기
    // let texture = PIXI.utils.TextureCache["./sprite.png"];
    // let sprite = new PIXI.Sprite(texture)

    // app.stage.addChild(sprite)
  }



  // 이미지를 

  // // 이미지를 가져오는 방법2
  // callImage2() { 
  //   app.loader
  //     .add("sprite.png")
  //     .load(setup)

  //   function setup() {
  //     // 이미지를 불러온 후에 텍스처로 변환
  //     let sprite = new app.Sprite(
  //       app.loader.resources["sprite.png"].texture
  //     )

  //     app.stage.addChild(sprite)
  //   }
  // }





  render() {

    return (
      <div id="App"></div>
    );
  }
}



export default App;
