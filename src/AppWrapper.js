import App from './App';
import prepareElements from './prepareElements';

import './AppWrapper.css';

function AppWrapper() {
  const {elements, width, height} = prepareElements();

  return (
    <App elements={elements} 
      width={width} height={height} 
      ratio={0.5} className="test"
    />
  );
}

export default AppWrapper;
