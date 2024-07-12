import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//

// TODO
// let deferredPrompt;
// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   deferredPrompt = e;
//   // Update UI to show an install button
//   btnAdd.style.display = 'block';

//   btnAdd.addEventListener('click', (e) => {
//     // Hide the install button
//     btnAdd.style.display = 'none';
//     // Show the install prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the install prompt');
//       } else {
//         console.log('User dismissed the install prompt');
//       }
//       deferredPrompt = null;
//     });
//   });
// });
