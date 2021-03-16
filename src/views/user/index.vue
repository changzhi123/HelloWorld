<template>
  <div>user

    <h2>{{state.count}}</h2>
    <button>按钮</button>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
});
function get(){
  xhr.open('get','')
  xhr.send()
}
const state = reactive({ count: 123 });
</script>

<style>

</style>