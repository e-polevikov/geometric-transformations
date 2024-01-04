import React from 'react';
import ReactDOM from 'react-dom/client';

import { GeomTransformationsStage } from './components/GeomTransformationsStage';

function App() {
  return (
    <>
      <GeomTransformationsStage />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
