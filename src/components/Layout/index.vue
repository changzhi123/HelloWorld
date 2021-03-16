<template>
    <a-layout>
        <a-layout-sider class="sider-Box" v-model:collapsed="state.collapsed" :trigger="null" collapsible>
            <div class="sider-logo" ></div>
            <AppMenus />
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="header-Box">
                <menu-unfold-outlined v-if="state.collapsed" class="trigger"
                    @click="() => (state.collapsed = !state.collapsed)" />
                <menu-fold-outlined v-else class="trigger" @click="() => (state.collapsed = !state.collapsed)" />
                <AppHeader class="AppHeader"/>
            </a-layout-header>
            <a-layout-content class="content-Box">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
    import AppHeader from './AppHeader.vue';
    import AppMenus from './AppMenus.vue'
    import {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
    } from '@ant-design/icons-vue';
    import {
        reactive,
    } from "vue";
    const state = reactive({
        collapsed: false,
    })
</script>

<style lang="less" scoped>
    .sider-Box {
        height: 100vh;

        .sider-logo {
            height: 32px;
            background: rgba(255, 255, 255, 0.3);
            margin: 16px;
        }
    }

    .header-Box {
        background: #fff;
        padding: 0;
        display: flex;

        .AppHeader {
            width: 200px;
            height: 100%;
            flex: 1;
            // border: solid 1px #ccc;
        }

        .trigger {
            font-size: 18px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .trigger:hover {
            color: #1890ff;
        }
    }

    .content-Box {
        background: '#fff';
        margin: 15px;
        box-sizing: border-box;
        background: #fff;
    }
</style>