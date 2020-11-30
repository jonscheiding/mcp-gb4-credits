import './App.css';

function CreditText({y, className, height, children}) {
  return (
    <text x="50%" y={`${y}rem`} className={className}
      style={{fontSize: `${height}rem`}}>
      {children}
    </text>
  );
}

function App({elements, width, height, ratio, className}) {
  const renderWidth = width;
  const renderHeight = height;
  const displayWidth = renderWidth * ratio;
  const displayHeight = renderHeight * ratio;

  return (
    <svg className={className}
      width={displayWidth} height={displayHeight}
      viewBox={`0 0 ${renderWidth} ${renderHeight}`}>

      {elements.map(e => 
        <CreditText
          key={e.index} className={e.type}
          y={e.y} height={e.height}>
          {e.text}
        </CreditText>
      )}
    </svg>
  );
}

export default App;
