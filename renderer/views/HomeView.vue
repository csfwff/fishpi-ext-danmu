<template>
  <div class="layout">
    <p><input class="pretty" type="checkbox" id="filter_tail" v-model="setting.filterTail"/><label for="filter_tail">过滤小尾巴</label></p>
    <p><input class="pretty" type="checkbox" id="add_tail" v-model="setting.addTail"/><label for="add_tail">添加小尾巴</label></p>
    <p><textarea placeholder="设置你的小尾巴" rows="5" v-model="setting.tails"></textarea></p>
    <p class="form-flex"><label for="exclude_tail">除非包含</label><input class="form-input" type="text" placeholder="设置不要添加小尾巴的消息正则" v-model="setting.exclude" id="exclude_tail"/></p>
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
      setting: {
        filterTail: false,
        addTail: true,
        tails: "—— 已经水了 {{liveness}}% 了！",
        exclude: "^(凌|小冰|点歌|朗读)",
      },
      error: ''
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

