import React from 'react';
import ReactDOM from 'react-dom/client';

import { GeomStage } from './components/GeomStage/GeomStage';

function App() {
  return (
    <>
      <GeomStage />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
TODO:
- Number of operations, path length, square intersection
- Minor UI improvements (highlighting)
- Stage boundaries?
- Refactoring
*/