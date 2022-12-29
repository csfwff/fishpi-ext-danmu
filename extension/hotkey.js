let hotkeys = {

}

module.exports = function hotkeyRegister(globalShortcut, type, hotkey, fn) {
  hotkey = hotkey.replace(/win/i, 'Super');
  if (hotkeys[type]) {
      globalShortcut.unregister(hotkeys[type]);
  }
  globalShortcut.register(hotkey, fn)
  hotkeys[type] = hotkey;
}