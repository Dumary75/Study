const { app, BrowserWindow, Menu, MenuItem} = require('electron');
const path = require('node:path');



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,           // Feste Breite
    height: 720,           // Feste Höhe
    minWidth: 1280,        // Minimale Breite (optional, falls du doch minimal skalieren willst)
    minHeight: 720,        // Minimale Höhe
    resizable: false,      // 👈 WICHTIG: Deaktiviert manuelles Größenändern!
    maximizable: false,    // 👈 Optional: Deaktiviert "Maximieren"-Button
    fullscreenable: false, // 👈 Optional: Deaktiviert Vollbildmodus
    title: "Netflix Clone Desktop", // 👈 Titel in der Fensterleiste
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 👈 WICHTIG!
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('https://couchingtv.vercel.app/');

  const menu = new Menu();

  // "Ansicht"-Menü
  const viewMenu = new MenuItem({
        label: 'Entwicklertools',
        click: () => {
          mainWindow.webContents.toggleDevTools();
        }
  });

  menu.append(viewMenu);

  // Setze das Menü für das Fenster
  Menu.setApplicationMenu(menu);


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
