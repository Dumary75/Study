// preload.js

// 1. Importiere die Werkzeuge — hier darfst du require nutzen!
const { contextBridge, ipcRenderer } = require('electron');

// 2. Erstelle eine "Brücke" in die Renderer-Welt (Main World)
contextBridge.exposeInMainWorld(
  'electronAPI', // 👈 Name des globalen Objekts: window.electronAPI

  {
    // 3a. Funktion "send" — um Nachrichten an Main zu schicken
    send: (channel, data) => {
      // Intern: nutze ipcRenderer.send — aber der Renderer sieht das nicht!
      ipcRenderer.send(channel, data);
    },

    // 3b. Funktion "on" — um Nachrichten von Main zu empfangen
    on: (channel, func) => {
      // Leite die Nachricht weiter — aber ohne das "event"-Objekt (sicherer!)
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
  }
);