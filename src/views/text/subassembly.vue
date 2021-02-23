<template>
    <div>subassembly
        <a-button type="primary" @click="open">Primary</a-button>
    </div>
</template>

<script>
    import {
        ref,
        reactive,
        computed
    } from 'vue'
    export default {
        // props:{
        // },
        setup(props,ctx) {
            console.log({...props},'和',{...ctx.attrs})
            const state = reactive({})
            const open=()=>{
                console.log('open',props)
                ctx.emit('set',1238)
            }
            return {
                state,open
            }
        }
    }
</script>

<style>

</style>