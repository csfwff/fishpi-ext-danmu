/* eslint-disable no-unused-vars */
const path = require('path');
const { LocalStorage } = require('node-localstorage');
let localstorage = new LocalStorage(path.resolve(__dirname, "local"));

let win = null;
let pos = localstorage.getItem('posInput');
pos = pos ? JSON.parse(pos) : null;
let size = localstorage.getItem("sizeInput");
size = size ? JSON.parse(size) : null;
module.exports = function createWindow(BrowserWindow,electron) {
    if (win) return win;
    win = new BrowserWindow({
        resizable:false,
        width: 200,
        height: 40,
        transparent: true,
        show: true,
        frame: false,
        skipTaskbar: true,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
            preload: path.join(__dirname, 'webview.js'),
        },
    })
    let Url = process.env.EXT_ENV == 'development' ? 
        "http://127.0.0.1:8080/#/input" :
        path.join(__dirname, "..", "dist", "index.html") + '#/input';

    win.loadURL(Url);
    win.show();
    if(size){
       win.setContentSize(size[0],size[1])
    }
    if (pos) {
        win.setPosition(pos[0], pos[1]);
    }else{
        let screen = electron.screen;
        let height = screen.getPrimaryDisplay().workAreaSize.height;
        win.setPosition(40, height-100);
    }
    win.on('closed', (event) => {
        win = null;
    })
    win.on('moved', (event) => {
      let pos = win.getPosition();
      localstorage.setItem('posInput', JSON.stringify(pos));
    })
    win.on("resize", () => {
        localstorage.setItem("sizeInput", JSON.stringify(win.getSize()));
      });
    if(process.env.EXT_ENV == 'development') win.openDevTools();
    win.setAlwaysOnTop(true);
    return win;
}