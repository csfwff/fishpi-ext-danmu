const path = require('path');
const { LocalStorage } = require('node-localstorage');
let localstorage = new LocalStorage(path.resolve(__dirname, "local"));

let settings = localstorage.getItem('setting');
settings = settings ? JSON.parse(settings) : {
  enable: true,
  tooltip: '距离下班',
  size: 30,
  color: '#000000',
  opacity: .50,
  begin: {
    hour: 9,
    min: 0,
  },
  end: {
    hour: 18,
    min: 0,
  },
  order: {
    hour: 11,
    min: 30,
  },
};

module.exports = {
  get() {
    return settings
  },
  set(setting) {
    settings = setting
    localstorage.setItem('setting', JSON.stringify(settings));
    return settings;
  }
}