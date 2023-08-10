/* eslint-disable no-unused-vars */
const path = require("path");
const { LocalStorage } = require("node-localstorage");

let localstorage = new LocalStorage(path.resolve(__dirname, "local"));
let win = null;
let pos = localstorage.getItem("pos");
pos = pos ? JSON.parse(pos) : null;
let size = localstorage.getItem("size");
size = size ? JSON.parse(size) : null;
module.exports = function createWindow(BrowserWindow, electron) {
  if (win) return win;
  win = new BrowserWindow({
    minWidth: 200,
    minHeight: 65,
    width: 1000,
    height: 800,
    transparent:  process.env.EXT_ENV != "development",
    show: true,
    frame: false,
    skipTaskbar: true,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: false,
      webSecurity: false,
      contextIsolation: false,
      preload: path.join(__dirname, "webview.js"),
    },
  });
  let Url =
    process.env.EXT_ENV == "development"
      ? "http://127.0.0.1:8080/#/msg"
      : path.join(__dirname, "..", "dist", "index.html") + "#/msg";

  win.loadURL(Url);
  win.show();
 
  console.log(size);
  console.log(pos);
  if(size){
    win.setContentSize(size[0],size[1])
  }else{
    let screen = electron.screen;
    let width = screen.getPrimaryDisplay().workAreaSize.width;
    let height = screen.getPrimaryDisplay().workAreaSize.height;
    win.setContentSize(width, height);
  }
  if (pos){
    win.setPosition(pos[0], pos[1]);
  }else{
    win.setPosition(0, 0);
  }
  win.on("closed", (event) => {
    win = null;
  });
  win.on("moved", (event) => {
    let pos = win.getPosition();
    localstorage.setItem("pos", JSON.stringify(pos));
  });

  win.on("resize", () => {
    win.webContents.send("resize");
    localstorage.setItem("size", JSON.stringify(win.getSize()));
  });

 
  if (process.env.EXT_ENV == "development") win.openDevTools();
  win.setAlwaysOnTop(true);

  if (process.env.EXT_ENV != "development") win.setIgnoreMouseEvents(true);
  return win;
};
