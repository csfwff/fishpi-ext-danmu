<template>
  <div v-if="enable" class="layout" :style="{fontSize: size + 'px', color, opacity }">
    <div class="tooltip" v-if="tooltip">{{tooltip}}</div>
    <div class="time" v-if="isTimeWork && !isTimeOffWork">
      <span>{{countTime.hour}}</span>
      <i>:</i>
      <span>{{countTime.min}}</span>
      <i>:</i>
      <span>{{countTime.second}}</span>
    </div>
    <div v-else>
      <span v-if="!isTimeOffWork">还没到上班时间</span>
      <span v-else>该下班啦！🎉</span>
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
      enable: true,
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
      },
      isTimeWork: true,
      isTimeOffWork: false,
      isTimeOrder: false,
      // eslint-disable-next-line no-undef
      ipc: $ipc,
    };
  },
  computed: {
  },
  async mounted() {
    let sendOrder = false;
    let sendOffWork = false;
    setInterval(() => {
      this.isTimeWork = this.timeOffset(this.begin) <= 0;
      this.isTimeOffWork = this.timeOffset(this.end) <= 0;
      this.countTime = this.offsetToTime(this.timeOffset(this.end));
      if (Math.abs(this.timeOffset(this.order)) <= 20000) {
        this.isTimeOrder = true;
        if(!sendOrder) this.ipc.send('offwork.notice.order', this.order);
        sendOrder = true;
      }
      else sendOrder = false;
      if (this.timeOffset(this.end) <= 0) {
        if(!sendOffWork) this.ipc.send('offwork.notice.offwork', this.end);
        sendOffWork = true;
      }
      else sendOffWork = false;
    }, 1000);
    this.ipc.invoke('offwork.get.setting').then(setting => this.update(setting))
    this.ipc.on('offwork.change.setting', (event, setting) => this.update(setting))
  },
  methods: {
    getNow() {
      return new Date();
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
    },
    update(setting) {
      this.tooltip = setting.tooltip;
      this.size = setting.size;
      this.color = setting.color;
      this.begin = setting.begin;
      this.end = setting.end;
      this.order = setting.order;
      this.opacity = setting.opacity;
      this.enable = setting.enable;
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

