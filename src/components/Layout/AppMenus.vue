<template>
  <a-menu theme="dark" mode="inline" v-model:selectedKeys="state.selectedKeys">

    <template v-for="item in state.menusList" :key="item.name">
      <template v-if="item.children">
        <a-sub-menu :key="item.path">
          <template #title>
            <span>
              <user-outlined />
              <span>{{item.meta.title}}</span>
            </span>
          </template>
          <a-menu-item :key="v.path" v-for="v in item.children">
            <video-camera-outlined />
            <span> {{v.meta.title}}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="item.path">
          <upload-outlined />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const state = reactive({
  selectedKeys: '/dashboard',
  menusList: computed(() => {
    const arr = []
    store.getters.addRoutes.filter((item) => {
      if (item.children) arr.push(...fliterRouter(item.children))
    })
    return arr
  }),
})
function fliterRouter(data) {
  const arr = []
  data.filter((item) => {
    if (!item.display) return
    const obj = item
    if (item.children) obj.children = [...fliterRouter(item.children)]
    arr.push(obj)
  })
  return arr
}
</script>

<style>
</style>