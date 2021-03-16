<template>
  <div>user</div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
export default {
setup(){
  const route = useRoute()
  console.log(route.path,'route.path')
}

}
</script>

<style>

</style>