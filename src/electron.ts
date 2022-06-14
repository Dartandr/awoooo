import { BrowserWindow, ipcMain, app } from 'electron';

const path = require('path');
const isDev = require('electron-is-dev');

let pluginPath = path
  .join(__dirname, 'mpv/mpvjs.node;application/x-mpvjs')
  .split('\\')
  .join('/');
if (!isDev) {
  pluginPath = pluginPath.replace('app.asar', 'app.asar.unpacked');
}
let mainWindow: BrowserWindow | null = null;

app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('register-pepper-plugins', pluginPath);

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 980,
    height: 600,
    minWidth: 980,
    minHeight: 600,
    frame: false,
    transparent: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      plugins: true,
      contextIsolation: false,
    },
    backgroundColor: '#151E27',
    title: 'Awoooo',
    icon: path.join(__dirname, './icon.png'),
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3020/'
      : `file://${path.join(__dirname, './index.html')}`,
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', (): void => (mainWindow = null));
  mainWindow.webContents.setWindowOpenHandler(() => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: false,
        transparent: false,
        width: 561,
        height: 350,
        minWidth: 561,
        minHeight: 350,
        backgroundColor: '#151E27',
        title: 'Chat',
      },
    };
  });

};
const { protocol } = require('electron');

app.whenReady().then(() => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = request.url.replace('file:///', '');
    callback(pathname);
  });
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('max', () => {
  if (BrowserWindow.getFocusedWindow().isMaximized()) {
    BrowserWindow.getFocusedWindow().unmaximize();
  } else {
    BrowserWindow.getFocusedWindow().maximize();
  }
});

ipcMain.on('min', () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('close', () => {
  BrowserWindow.getFocusedWindow().close();
});

ipcMain.handle('path', async () => {
  // do stuff
  const path = await __dirname;
  return path;
});
