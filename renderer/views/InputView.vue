<template>
    <div v-if="input" class="layout"  style="height: 100%; border-radius: 4px;" :style="{background:inputBg}">
        <div class="drag" style="margin-right: 4px;">🍓</div>
       <input v-model="data" @keyup.enter="sendMsg" style="flex:1;background: transparent; border-width: 1px; border-radius: 4px;"/>
    </div>
</template>
  
<script>

export default {
    name: 'MsgView',
    components: {
    },
    data() {
        return {
            input:true,
            data:'',
            inputBg: 'rgba(255,255,255,0.5)',
        };
    },
    computed: {

    },
    async mounted() {
       // eslint-disable-next-line no-undef
        $ipc.on('danmu.change.setting', (event, setting) => this.update(setting))

        // eslint-disable-next-line no-undef
        $ipc.invoke('danmu.get.setting').then(setting => this.update(setting))
    },
    methods: {
        sendMsg() {
            if(this.data.length > 0){
                console.log('send',this.data);
                // eslint-disable-next-line no-undef
                $ipc.send('fishpi.msg.send', {msg:this.data});
                this.data = ''
            }
        },
        update(setting) {
            this.input = setting.input;
            this.inputBg = setting.inputBg;
        },
 
    }
}
</script>
  
<style lang="less" scoped>


.layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px;
    background: #fff;

    .drag{
        -webkit-app-region: drag;
    }
}
</style>
  
  