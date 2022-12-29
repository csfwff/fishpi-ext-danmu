<p align="center">
  <img width="200" src="./public/icon.png">
</p>

这是 [摸鱼派客户端](https://github.com/imlinhanchao/fishpi-desktop) 下班倒计时扩展，可以在桌面显示一个下班时间倒计时。

## 安装方式

1. 下载 [Release](https://github.com/imlinhanchao/fishpi-ext-off-work/releases) 最新版本的压缩包。
2. 解压缩到客户端扩展目录。
3. 重新开启客户端即可。

## 功能说明
可以设置上下班时间，和订饭时间。将会在桌面显示一个不可点击的下班倒计时，当订饭时间或下班时间到时，将会发出一个系统消息提醒。

> 默认会显示在主荧幕中间，按下快捷键 `Win + Shift + F1` 即可拖动，再按一次快捷键将会重新变为不可点击的状态。

## 调试说明
1. 首先，将代码 clone 到扩展目录，运行 `npm run serve`，启动 vue 服务。
2. 添加 `--dev` 命令行参数启动程序：
```bash
# Windows
.\fishpi.exe --dev

# MacOS
fishpi.app/Contents/MacOS/fishpi --dev
```
1. 点击扩展界面的扩展设置按钮。即可启动对扩展 `webview` 调试。