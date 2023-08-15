/* eslint-disable no-unused-vars */
const path = require('path');
const { LocalStorage } = require('node-localstorage');
const hotkeyRegister = require('./hotkey')
const createInputWindow = require('./window');
const eventListen = require('./event');
const storage = require('./storage')
const createMsgWindow = require('./msgWindow')

let win
function activate(context, electron) {
    const { BrowserWindow, globalShortcut, ipcMain, Notification } = electron;
    win = createMsgWindow(BrowserWindow, electron);
    const inputWin = createInputWindow(BrowserWindow,electron)
    eventListen({ ipcMain, Notification }, () => storage.get(),(msg)=>context.fishpi.chatroom.send(msg));

    let storageData = storage.get()    
    let ignore = true;
    hotkeyRegister(globalShortcut, 'mouse', 'win+shift+f2', () => {
        win.setIgnoreMouseEvents(!ignore);
        ignore = !ignore;
    })

    hotkeyRegister(globalShortcut, 'hide', 'win+esc', () => {
        win.webContents.send('on-hide-msg')
        win.isVisible() ? win.hide() : win.show()
        let data = storage.get()
        data.enable = win.isVisible()
        storage.set(data);
    })

    if(!storageData.enable){
        win.hide()
    }

    context.on('login', function (token) {
        console.dir(token);
    })

    context.on('logout', () => {
        console.dir('user logout')
    })

    context.on('quit', () => {
        console.dir('app was quit')
    })

    context.on('command', (command, args, callback) => {
        console.dir(command,args);
        switch (command) {
            case 'fishpi.get.setting':
                {
                    callback(storage.get());
                    break;
                }
            case 'fishpi.set.setting':
                {
                    storage.set(args);
                    win.webContents.send(`danmu.change.setting`, args);
                    inputWin.webContents.send(`danmu.change.setting`, args);
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

function hooks() {
    return {
        async messageEvent(msg) {
            console.log(msg);
            win.webContents.send('on-receive-msg', msg)
            return msg
        }
    }
}
module.exports = { activate, getSettingUrl, hooks }