<template>
  <div id="app" style="height: 100%;">
    <router-view />
  </div>
</template>

<script>
export default {
  async mounted() {
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less">
p {
  margin: 0px !important;
    margin-block: 0px !important;
    margin-inline: 0px !important;
}

img {
    max-width: 200px;
    max-height: 200px;
}

blockquote {
    margin: 0px !important;
    margin-block: 0px !important;
    margin-inline: 0px !important;
}

.vue-danmaku .danmus .dm {
  white-space: unset !important;
}
</style>
