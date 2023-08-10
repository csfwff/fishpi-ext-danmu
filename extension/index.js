/* eslint-disable no-unused-vars */
const path = require('path');
const { LocalStorage } = require('node-localstorage');
const hotkeyRegister = require('./hotkey')
const createWindow = require('./window');
const eventListen = require('./event');
const storage = require('./storage')
const createMsgWindow = require('./msgWindow')

let win
function activate(context, electron) {
    const { BrowserWindow, globalShortcut, ipcMain, Notification } = electron;
    win = createMsgWindow(BrowserWindow,electron);
    eventListen({ ipcMain, Notification }, () => storage.get());

    let ignore = true;
    hotkeyRegister(globalShortcut, 'mouse', 'win+shift+f1', () => {
        win.setIgnoreMouseEvents(!ignore);
        ignore = !ignore;
    })

    hotkeyRegister(globalShortcut, 'hide', 'win+esc', () => {
        win.webContents.send('on-hide-msg')
    })

    context.on('login', function(token) {
        console.dir(token);
    })

    context.on('logout', () => {
        console.dir('user logout')
    })

    context.on('quit', () => {
        console.dir('app was quit')
    })

    context.on('command', (command, args, callback) => {
        switch(command) {
            case 'fishpi.get.setting':
            {
                callback(storage.get());
                break;
            }
            case 'fishpi.set.setting':
            {
                storage.set(args);
                win.webContents.send(`danmu.change.setting`, args);
                break;
            }
        }
    })
}

function getSettingUrl() {
    let Url = process.env.EXT_ENV == 'development' ? 
        "http://127.0.0.1:8080" :
        path.join(__dirname, "..", "dist", "index.html");
    return Url;
}

function  hooks(){
    return{
        async messageEvent(msg) {
            console.log(msg);
            win.webContents.send('on-receive-msg', msg)
            return msg
        }
    } 
}
module.exports = { activate, getSettingUrl,hooks }