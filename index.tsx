// *ENTRY POINT* 🚀
// The App Launcher - Gurnoor Tamber's Rosalind Franklin Revival!
// Where it all begins! *HEROIC MUSIC PLAYS* 🎵

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// *ROOT ELEMENT* Find the mount point! 🎯
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// *RENDER* Launch Gurnoor's app! *BOOM* 💥
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
