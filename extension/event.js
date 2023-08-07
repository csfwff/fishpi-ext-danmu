module.exports = function eventListen({ ipcMain }, getSetting) {
  ipcMain.on(`daunmu.get.setting`, (event, args) => {
    event.sender.send(`daunmu.get.setting.` + args.callback, getSetting())
  });
  
}