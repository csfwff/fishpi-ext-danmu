<template>
  <div class="layout">
    <p>
      <label for="enable">是否显示弹幕</label>
      <input class="pretty" type="checkbox" id="enable" v-model="setting.enable" />
    </p>
    <p>
      <label for="borderEnable">是否显示边框</label>
      <input class="pretty" type="checkbox" id="borderEnable" v-model="setting.borderEnable" />
    </p>
    <p>
      <label for="input">是否显示输入框</label>
      <input class="pretty" type="checkbox" id="input" v-model="setting.input" />
    </p>
    <p>
      <label for="speed">弹幕速度</label>
      <input class="prettyspeed" type="number" id="speed" v-model="setting.speed" />
    </p>
    <p class="colorRow">
      <label for="danmuBg">弹幕背景色</label>
      <label :style="{ backgroundColor: setting.danmuBg }" class="colorBlock" @click="danmuColorShow = !danmuColorShow">{{danmuColorShow?'关闭选择': '选择颜色' }}</label>
    </p>
    <color-picker class="colorP" v-show="danmuColorShow" :color="setting.danmuBg" :sucker-hide="true"
      @changeColor="changeDanmuColor" />
      <p class="colorRow">
      <label for="danmuBg">弹幕文字颜色</label>
      <label :style="{ backgroundColor: setting.danmuTvColor }" class="colorBlock" @click="danmuTvColorShow = !danmuTvColorShow">{{danmuTvColorShow?'关闭选择': '选择颜色' }}</label>
    </p>
    <color-picker class="colorP" v-show="danmuTvColorShow" :color="setting.danmuTvColor" :sucker-hide="true"
      @changeColor="changeDanmuTvColor" />
    <p class="colorRow">
      <label for="inputBg">输入框背景色</label>
      <label :style="{ backgroundColor: setting.inputBg }" class="colorBlock" @click="inputColorShow = !inputColorShow">{{inputColorShow?'关闭选择': '选择颜色' }}</label>
    </p>
    <color-picker class="colorP" v-show="inputColorShow" :color="setting.inputBg" :sucker-hide="true"
      @changeColor="changeInputColor" />
    <p><button @click="save" style="margin-top: 30px;">设置</button></p>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import colorPicker from '@caohenghu/vue-colorpicker'
export default {
  name: 'HomeView',
  components: {
    colorPicker
  },
  data() {
    return {
      error: '',
      setting: {
        borderEnable: false,
        enable: true,
        input: true,
        speed: 100,
        danmuBg: 'rgba(0,0,0,0.5)',
        danmuTvColor: 'rgba(10,10,10,1)',
        inputBg: 'rgba(255,255,255,0.5)',
      },
      danmuColorShow: false,
      inputColorShow: false,
      danmuTvColorShow:false
    }
  },
  computed: {
  },
  async mounted() {
    // eslint-disable-next-line no-undef
    let setting = await $ipc.invoke('fishpi.get.setting');
    if (setting) this.setting = setting;
    // eslint-disable-next-line no-undef
    // $ipc.on('on-hide-msg', () => {
    //   this.enable = !this.enable
    // })
  },
  methods: {
    save() {
      // eslint-disable-next-line no-undef
      $ipc.send('fishpi.set.setting', this.setting);
      this.error = '设置成功';
      setTimeout(() => this.error = '', 2000);
    },
    changeDanmuColor(color) {
      const { r, g, b, a } = color.rgba
      this.setting.danmuBg = `rgba(${r}, ${g}, ${b}, ${a})`
    },
    changeDanmuTvColor(color) {
      const { r, g, b, a } = color.rgba
      this.setting.danmuTvColor = `rgba(${r}, ${g}, ${b}, ${a})`
    },
    changeInputColor(color) {
      const { r, g, b, a } = color.rgba
      this.setting.inputBg = `rgba(${r}, ${g}, ${b}, ${a})`
    },
  }
}
</script>

<style lang="less" scoped>
.layout {
  padding: 10px;

  label {
    display: inline-block;
    width: 10em;
    text-align: left;
    padding-right: 10px;
  }

  textarea {
    width: 100%;
  }

  button {
    width: 100%;
    background: var(--global-active-color);
    border: none;
    padding: 10px;
    color: inherit;
    cursor: pointer;
  }

  .form-flex {
    display: flex;
  }

  .form-input {
    padding: 5px;
    height: 30px;
    flex: 1;
    line-height: 30px;
    margin-left: 5px;
    border: 1px solid var(--global-background-color);

    &:focus {
      outline: 0;
    }
  }

  .colorBlock {
    text-align: center;
    cursor: pointer;
  }

  .colorBtn {
    width: 80px;
    margin-left: 10px;
    margin-bottom: 0px !important;
  }

  .colorRow {
    display: flex;
    align-items: center;
    margin-top: 6px !important;
  }

  .colorP {
    position: absolute;
    left: 120px;
    width: 220px !important;
  }
}
</style>

