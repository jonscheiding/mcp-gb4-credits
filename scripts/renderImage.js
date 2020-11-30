import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parseArgs from 'command-line-args';
import fs from 'fs';
import svg2img from 'svg2img';

import prepareElements from '../src/prepareElements';
import App from '../src/App';

const args = parseArgs([
  { name: 'render-width', alias: 'w', type: Number, defaultValue: '1920' },
  { name: 'output-svg', alias: 's', type: String, defaultValue: './data/credits.svg' },
  { name: 'output-png', alias: 'p', type: String, defaultValue: './data/credits.png' }
]);

console.log(`Rendering SVG to ${args['output-svg']} at ${args['render-width']}px wide.`);

const {elements, width, height} = prepareElements();
const pixelsWidth = args['render-width'];
const pixelsHeight = height * (pixelsWidth / 1920);

const renderedSvg = ReactDOMServer.renderToString(
  <App width={width} height={height} elements={elements} />
);

fs.writeFileSync(args['output-svg'], renderedSvg);

console.log(`Rendering PNG to ${args['output-png']}.`);

svg2img(renderedSvg, { width: pixelsWidth, height: pixelsHeight },
  (error, renderedPng) => {
    if(error) {
      console.error(error);
      return;
    }

    fs.writeFileSync(args['output-png'], renderedPng);
  }
);
