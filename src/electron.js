const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 980,
        height: 600,
        minWidth: 980,
        minHeight: 600,
        frame: false,
        transparent: false,
        webPreferences: {
            webSecurity: false,
            enableRemoteModule: true,
            nodeIntegration: true,
            plugins: true,
            nativeWindowOpen: true,
        },
        backgroundColor: "#151E27",
        title: "Awoooo",
        //icon: path.join(__dirname, "./icon.png"),
    });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3020/"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on("closed", () => (mainWindow = null));

}
const { protocol } = require("electron");

app.whenReady().then(() => {
    protocol.registerFileProtocol("file", (request, callback) => {
        const pathname = request.url.replace("file:///", "");
        callback(pathname);
    });
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});