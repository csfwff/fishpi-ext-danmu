import {
    ipcRenderer
} from 'electron'

export default {
    listen(event, fn) {
        ipcRenderer.on(event, fn);
    },
    removeListener(event, fn) {
        ipcRenderer.removeListener(event, fn)
    },
    send(event, data, fn) {
        let callback = fn ? parseInt(Math.random() * 10000).toString() : undefined;
        if (fn) ipcRenderer.once(`${event}-callback-${callback}`, fn);
        ipcRenderer.send(event, { ...data, callback })
    },
    sendSync(event, argv) {
        return new Promise((resolve, reject) => {
            try {
                this.send(event, argv, (event, data) => {
                    resolve(data);
                })
            } catch (error) {
                reject(error);
            }
        })
    }
};