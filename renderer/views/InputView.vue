<template>
    <div v-if="input" class="layout"  style="height: 100%;">
        <div class="drag">🍓</div>
       <input v-model="data" @keyup.enter="sendMsg" style="flex:1"/>
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
            data:''
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
  
  