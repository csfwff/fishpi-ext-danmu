<template>
  <div class="layout">
    <p>
      <label for="enable">是否显示弹幕</label>
      <input class="pretty" type="checkbox" id="enable" v-model="setting.enable"/>
    
    </p>
    <p>
      <label for="borderEnable">是否显示边框</label>
      <input class="pretty" type="checkbox" id="borderEnable" v-model="setting.borderEnable"/>
    
    </p>
    <p>
      <label for="input">是否显示输入框</label>
      <input class="pretty" type="checkbox" id="input" v-model="setting.input"/>
    
    </p>
    <p>
      <label for="speed">弹幕速度</label>
      <input class="prettyspeed" type="number" id="speed" v-model="setting.speed"/>
    </p>
 
    <p><button @click="save" style="margin-top: 5px;">设置</button></p>
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
        borderEnable:false,
        enable: true,
        input:true,
        speed:100,
      },
    }
  },
  computed: {
  },
  async mounted() {
    // eslint-disable-next-line no-undef
    let setting = await $ipc.invoke('fishpi.get.setting');
    if (setting) this.setting = setting;
    // eslint-disable-next-line no-undef
    $ipc.on('on-event', (data) => {
    console.log(data) // 'your data'
})

    
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
}
</style>

