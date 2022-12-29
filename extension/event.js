const path = require('path');

module.exports = function eventListen({ ipcMain, Notification }, getSetting) {
  ipcMain.on(`offwork.get.setting`, (event, args) => {
    event.sender.send(`offwork.get.setting.` + args.callback, getSetting())
  });
  ipcMain.on(`offwork.notice.order`, (event, args) => {
    console.log('offwork.notice.order', args);
    try {
      new Notification({
        icon: path.join(__dirname, '..', 'public', 'icon.png'),
        title: '该订饭了！🍚', 
        body: `${args.hour.toString().padStart(2, '0')}:${args.min.toString().padStart(2, '0')} 快到了！该订饭了！`,
      }).show()
    } catch (error) {
      console.log(error);
    }
  });
  ipcMain.on(`offwork.notice.offwork`, (event, args) => {
    console.log('offwork.notice.offwork', args);
    try {
      new Notification({
        icon: path.join(__dirname, '..', 'public', 'icon.png'),
        title: '该下班了！🎉', 
        body: `${args.hour.toString().padStart(2, '0')}:${args.min.toString().padStart(2, '0')} 到了！该下班了！`,
      }).show()
    } catch (error) {
      console.log(error);
    }
  });
}