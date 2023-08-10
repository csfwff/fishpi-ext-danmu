module.exports = function eventListen({ ipcMain }, getSetting,sendMsg) {
  ipcMain.on(`danmu.get.setting`, (event, args) => {
    event.sender.send(`danmu.get.setting.` + args.callback, getSetting())
  });
  ipcMain.on(`fishpi.msg.send`,(event, args)=>{
    console.log(args.msg)
    sendMsg(args.msg)
  })
}