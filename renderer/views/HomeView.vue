<template>
  <div class="layout">
    <p>
      <input class="pretty" type="checkbox" id="enable" v-model="setting.enable"/>
      <label for="enable">是否开启</label>
    </p>
    <p>
      <label for="tooltip">ToolTip</label>
      <input class="pretty" type="text" id="tooltip" v-model="setting.tooltip"/>
    </p>
    <p>
      <label for="size">字号</label>
      <input class="pretty" type="number" id="size" v-model="setting.size"/>
    </p>
    <p>
      <label for="size">颜色</label>
      <input class="pretty" type="color" id="size" v-model="setting.color"/>
    </p>
    <p>
      <label for="opacity">透明度</label>
      <input type="range" id="opacity" min="0" max="1" step="0.01" v-model="setting.opacity">
    </p>
    <p>
      <label for="begin-hour">上班时间</label>
      <select v-model="setting.begin.hour" id="begin-hour">
        <option v-for="h in hours" :key="h" :value="h">{{h.toString().padStart(2, '0')}}</option>
      </select>
      <span>:</span>
      <select v-model="setting.begin.min" id="begin-min">
        <option v-for="m in mins" :key="m" :value="m">{{m.toString().padStart(2, '0')}}</option>
      </select>
    </p>
    <p>
      <label for="begin-hour">下班时间</label>
      <select v-model="setting.end.hour" id="begin-hour">
        <option v-for="h in hours" :key="h" :value="h">{{h.toString().padStart(2, '0')}}</option>
      </select>
      <span>:</span>
      <select v-model="setting.end.min" id="begin-min">
        <option v-for="m in mins" :key="m" :value="m">{{m.toString().padStart(2, '0')}}</option>
      </select>
    </p>
    <p>
      <label for="begin-hour">订饭时间</label>
      <select v-model="setting.order.hour" id="begin-hour">
        <option v-for="h in hours" :key="h" :value="h">{{h.toString().padStart(2, '0')}}</option>
      </select>
      <span>:</span>
      <select v-model="setting.order.min" id="begin-min">
        <option v-for="m in mins" :key="m" :value="m">{{m.toString().padStart(2, '0')}}</option>
      </select>
    </p>
    <p><button @click="save">设置</button></p>
    <p>{{error}}</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      error: '',
      setting: {
        tooltip: '距离下班',
        size: 30,
        color: '#000000',
        opacity: .50,
        enable: true,
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
      },
      hours: Array(24).fill(0).map((_, i) => i),
      mins: Array(60).fill(0).map((_, i) => i),
    }
  },
  computed: {
  },
  async mounted() {
    // eslint-disable-next-line no-undef
    let setting = await $ipc.invoke('fishpi.get.setting');
    if (setting) this.setting = setting;
  },
  methods: {
    save() {
      // eslint-disable-next-line no-undef
      $ipc.send('fishpi.set.setting', this.setting);
      this.error = '设置成功';
      setTimeout(() => this.error = '', 2000);
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  padding: 10px;
  label {
    display: inline-block;
    width: 5em;
    text-align: right;
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
}
</style>

