/* eslint-disable no-unused-vars */
const path = require('path');
const { LocalStorage } = require('node-localstorage');
let localstorage = new LocalStorage(path.resolve(__dirname, "local"));

let win = null;
let pos = localstorage.getItem('pos');
pos = pos ? JSON.parse(pos) : null;
module.exports = function createWindow(BrowserWindow) {
    if (win) return win;
    win = new BrowserWindow({
        minWidth: 200,
        minHeight: 65,
        width: 500,
        height: 600,
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
        "http://127.0.0.1:8080/#/time" :
        path.join(__dirname, "..", "dist", "index.html") + '#/time';

    win.loadURL(Url);
    win.show();
    if (pos) win.setPosition(pos[0], pos[1]);
    win.on('closed', (event) => {
        win = null;
    })
    win.on('moved', (event) => {
      let pos = win.getPosition();
      localstorage.setItem('pos', JSON.stringify(pos));
    })
    if(process.env.EXT_ENV == 'development') win.openDevTools();
    win.setAlwaysOnTop(true);
    win.setIgnoreMouseEvents(true);
    return win;
}