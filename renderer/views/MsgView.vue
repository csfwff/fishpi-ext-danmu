<template>
    <div class="layout" style="height: 100%;">
        <vue-danmaku v-model="danmus" style="height: 100%;width:100%;" ref="danmakuRef" useSlot randomChannel isSuspend
            :speeds="speeds">
            <!-- 弹幕插槽（vue 2.6.0 及以上版本可使用 v-slot:dm="{ index, danmu }"语法） -->
            <template slot="dm" slot-scope="{  danmu }">
                <div class="danmuItem">
                    <div class="danmuUser">
                        <img :src="danmu.userAvatarURL" class="headImg">
                        <div>{{ danmu.userNickname }}：({{ danmu.userName }})</div>
                    </div>
                    <div v-html="danmu.content" class="danmuContent"></div>
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
            speeds: 100,
        };
    },
    computed: {

    },
    async mounted() {
        // eslint-disable-next-line no-undef
        $ipc.on('on-receive-msg', (sender, data) => {
            if (data.type == 'msg') {
                this.$refs.danmakuRef.add(data.data)
            }
        })
        // eslint-disable-next-line no-undef
        $ipc.on('resize', () => {
            this.$refs.danmakuRef.resize()
        })
        // eslint-disable-next-line no-undef
        $ipc.invoke('danmu.get.setting').then(setting => this.update(setting))
        // eslint-disable-next-line no-undef
        $ipc.on('danmu.change.setting', (event, setting) => this.update(setting))
        
    },
    methods: {
        clearData() {
            this.danmus.length = 0
        },
        update(setting) {
            console.log(setting);
            this.speeds = setting.speeds;
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

    .danmuItem {
        display: flex;
        flex-direction: column;
        padding: 4px;
        border-radius: 4px;
        background: #00000088;

        .danmuContent {

            &>p {
                margin: 0px;
            }

            &>img {
                max-width: 200px;
                max-height: 200px;
            }
        }


    }

    .danmuUser {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .headImg {
        width: 32px;
        height: 32px;
        border: solid 2px white;
        border-radius: 4px;
    }
}
</style>
  
  