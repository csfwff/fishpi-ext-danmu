<template>
  <div class="layout" :style="{fontSize: size + 'px', color, opacity }">
    <div class="tooltip" v-if="tooltip">{{tooltip}}</div>
    <div class="time">
      <span>{{countTime.hour}}</span>
      <i>:</i>
      <span>{{countTime.min}}</span>
      <i>:</i>
      <span>{{countTime.second}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeView',
  components: {
    
  },
  data() {
    return {
      tooltip: '距离下班',
      size: 30,
      color: '#000',
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
      countTime: {
        hour: '00',
        min: '00',
        second: '00',
      }
    }
  },
  computed: {
  },
  async mounted() {
    setInterval(() => {
      this.countTime = this.offsetToTime(this.timeOffset(this.end));
    }, 1000);
    // eslint-disable-next-line no-undef
    let setting = await $ipc.invoke('fishpi.get.setting');
    if (setting) {
      this.tooltip = setting.tooltip;
      this.size = setting.size;
      this.color = setting.color;
      this.begin = setting.tooltip;
      this.end = setting.end;
      this.order = setting.order;
      this.opacity = setting.opacity;
    }
  },
  methods: {
    getNow() {
      return new Date();
      //return new Date('2022/12/28 10:20:00')
    },
    timeOffset(target) {
      let now = this.getNow();
      let targetDate = this.getNow();
      targetDate.setHours(target.hour);
      targetDate.setMinutes(target.min);
      targetDate.setSeconds(0);
      return (targetDate.getTime() - now.getTime())
    },
    offsetToTime(offset) {
      let time = new Date(offset);
      return {
        hour: time.getUTCHours().toString().padStart('2', '0'),
        min: time.getUTCMinutes().toString().padStart('2', '0'),
        second: time.getUTCSeconds().toString().padStart('2', '0'),
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-app-region: drag;
  .tooltip {
    font-size: 50%;
  }
  .time {
    line-height: 91%;
    span {
      font-family: Segment7;
    }
    i {
      vertical-align: 10%;
      font-style: normal;
    }
  }
}
</style>

