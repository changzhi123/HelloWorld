<template>
    <div class="toDoList" @dblclick='dblclick' ref="toDoList">
        toDoList
        <div v-for="item in lists" :key="item">{{item}}</div>
    </div>
</template>

<script>
    import {
        ref,
        toRefs,
        reactive,
    } from "vue";
    export default {
        setup() {
            const toDoList = ref(null)
            const state = reactive({
                lists: [1, 2, 3, ]

            })

            function dblclick() {
                console.log('双击事件', toDoList.value)
            }
            return {
                ...toRefs(state),
                dblclick,
                toDoList
            }
        }

    }
</script>
<style lang="less" scoped>
    .toDoList {
        width: 100%;
    }
</style>