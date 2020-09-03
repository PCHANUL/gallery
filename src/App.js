import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Text } from './Text.js';

var WebFont = require('webfontloader');

class App {
  constructor() {

    WebFont.load({
      google: {
        families: ['Hind:700']
      },
      fontactive: () => {
        this.text = new Text();
        this.text.setText(
          'A',
          2,
          document.body.clientWidth,
          document.body.clientHeight,
          
        )
      }
    });

  }


  render() {
    return (
      <div className="App">
        {WebFont}
      </div>
    );
  }
}



export default App;
