<template>
    <div class="layout"  style="height: 100%;">
        <vue-danmaku v-model="danmus"  style="height: 100%;width:100%;" :class="{bordered:borderEnable}" ref="danmakuRef" useSlot randomChannel isSuspend
            :speeds="speed">
            <!-- 弹幕插槽（vue 2.6.0 及以上版本可使用 v-slot:dm="{ index, danmu }"语法） -->
            <template slot="dm" slot-scope="{  danmu }">
                <div class="danmuItem" :style="{background:danmuBg}">
                    <div class="danmuUser">
                        <img :src="danmu.userAvatarURL" class="headImg">
                        <div :style="{color:danmuTvColor}">{{ danmu.userNickname }}：({{ danmu.userName }})</div>
                    </div>
                    <div :style="{color:danmuTvColor}" v-html="danmu.content" class="danmuContent"></div>
                </div>
            </template>       
        </vue-danmaku>

    </div>
</template>
  
<script>
import vueDanmaku from 'vue-danmaku'
export default {
    name: 'MsgView',
    components: {
        vueDanmaku
    },
    data() {
        return {
            danmus: [],
            speed: 100,
            borderEnable:false,
            danmuBg: 'rgba(0,0,0,0.5)',
            danmuTvColor: 'rgba(10,10,10,1)',
        };
    },
    computed: {

    },
    async mounted() {
        // eslint-disable-next-line no-undef
        $ipc.on('on-receive-msg', (sender, data) => {
            if (this.enable&&data.type == 'msg') {
                this.$refs.danmakuRef.add(data.data)
            }
        })
        // eslint-disable-next-line no-undef
        $ipc.on('resize', () => {
            this.$refs.danmakuRef.resize()
        })


       // eslint-disable-next-line no-undef
        $ipc.on('danmu.change.setting', (event, setting) => this.update(setting))

        // eslint-disable-next-line no-undef
        $ipc.invoke('danmu.get.setting').then(setting => this.update(setting))

    },
    methods: {
        clearData() {
            this.danmus.length = 0
        },
        update(setting) {
            this.speed = Number(setting.speed);
            this.enable = setting.enable;
            this.borderEnable = setting.borderEnable;
            this.danmuBg= setting.danmuBg;
            this.danmuTvColor= setting.danmuTvColor;
        },
 
    }
}
</script>
  
<style lang="less" scoped>


.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-app-region: drag;

    .bordered{
        border: solid 1px #666666;
    }
    

    .danmuItem {
        display: flex;
        flex-direction: column;
        padding: 4px;
        border-radius: 8px;
        font-size: 16px;

        .danmuContent {

            &>p {
                margin: 0px;
            }

            &>img {
                max-width: 160px;
                max-height: 160px;
            }
        }


    }

    .danmuUser {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
    }

    .headImg {
        width: 24px;
        height: 24px;
        border: solid 2px white;
        border-radius: 16px;
    }
}
</style>
  
  