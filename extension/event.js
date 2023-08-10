module.exports = function eventListen({ ipcMain }, getSetting) {
  ipcMain.on(`danmu.get.setting`, (event, args) => {
    event.sender.send(`danmu.get.setting.` + args.callback, getSetting())
  });
  
}