window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/PWA/sw.js');
  }
};

//https://stackoverflow.com/questions/46228604/pwa-on-github-pages
