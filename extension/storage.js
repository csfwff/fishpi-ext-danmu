const path = require('path');
const { LocalStorage } = require('node-localstorage');
let localstorage = new LocalStorage(path.resolve(__dirname, "local"));

let settings = localstorage.getItem('danmusetting');
settings = settings ? JSON.parse(settings) : {
    enable: true,
    input:false,
    speed:100,
    borderEnable:false,
    danmuBg: 'rgba(0,0,0,0.5)',
    inputBg: 'rgba(255,255,255,0.5)',
    danmuTvColor: 'rgba(10,10,10,1)',
};

module.exports = {
  get() {
    return settings
  },
  set(setting) {
    settings = setting
    localstorage.setItem('danmusetting', JSON.stringify(settings));
    return settings;
  }
}