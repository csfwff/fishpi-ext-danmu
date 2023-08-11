let isListening = false
module.exports = function eventListen({ ipcMain }, getSetting,sendMsg) {
  if(isListening)return;
  isListening = true
  ipcMain.on(`danmu.get.setting`, (event, args) => {
    event.sender.send(`danmu.get.setting.` + args.callback, getSetting())
  });
  ipcMain.on(`fishpi.msg.send`,(event, args)=>{
    sendMsg(args.msg)
  })
}