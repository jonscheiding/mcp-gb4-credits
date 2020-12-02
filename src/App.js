import React from 'react';

import { BASE_FONT_SIZE_PX } from './prepareElements';

const STYLES = {
  base: {
    fill: 'white',
    textTransform: 'uppercase',
    textAnchor: 'middle',
    dominantBaseline: 'hanging',
    fontStyle: 'normal'
  },
    
  title: {
    fontWeight: 700
  },
    
  byline: {
    fontWeight: 200,
    fontStyle: 'italic',
    textTransform: 'none'
  },
    
  role: {
    fontWeight: 100
  },

  name: {
    fontWeight: 400
  },

  name_small: {
    fontWeight: 400
  }
};

function CreditText({y, type, height, text}) {
  const style = {
    ...STYLES.base,
    ...STYLES[type],
    fontSize: `${height * BASE_FONT_SIZE_PX}px`
  };

  if(style.textTransform === 'uppercase') {
    text = text.toUpperCase();
  }

  return (
    <text x="50%" y={y * BASE_FONT_SIZE_PX} style={style}>
      {text}
    </text>
  );
}

function App({elements, width, height, ratio, className}) {
  ratio = ratio || 1;

  const renderWidth = width;
  const renderHeight = height;
  const displayWidth = renderWidth * ratio;
  const displayHeight = renderHeight * ratio;

  return (
    <svg className={className}
      style={{fontFamily: 'Lato, sans-serif'}}
      width={displayWidth} height={displayHeight}
      viewBox={`0 0 ${renderWidth} ${renderHeight}`}>

      <defs>
          <style>
              @import url("https://fonts.googleapis.com/css?family=Lato:100,200,300,400,700");
          </style>
      </defs>

      {elements.map(e => 
        <CreditText
          key={e.index} type={e.type}
          y={e.y} height={e.height}
          text={e.text} />
      )}
    </svg>
  );
}

export default App;
