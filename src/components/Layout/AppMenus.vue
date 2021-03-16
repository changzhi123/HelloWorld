<template>
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="state.selectedKeys">
        <a-menu-item key="1">
            <user-outlined />
            <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
            <video-camera-outlined />
            <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
            <upload-outlined />
            <span>nav 3</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup>
    import {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
    } from '@ant-design/icons-vue';
    import {
        reactive,
    } from "vue";
    const state = reactive({
        selectedKeys: '1',
    })
</script>

<style>

</style>