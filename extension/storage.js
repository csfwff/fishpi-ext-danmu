const path = require('path');
const { LocalStorage } = require('node-localstorage');
let localstorage = new LocalStorage(path.resolve(__dirname, "local"));

let settings = localstorage.getItem('danmusetting');
settings = settings ? JSON.parse(settings) : {
    enable: true,
    input:true,
    speed:100,
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