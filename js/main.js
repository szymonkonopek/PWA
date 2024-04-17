window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./https://szymonkonopek.github.io/sw.js');
  }
};

//https://stackoverflow.com/questions/46228604/pwa-on-github-pages
