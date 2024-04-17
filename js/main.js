window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
      './https://szymonkonopek.github.io//sw.js'
    );
  }
};
