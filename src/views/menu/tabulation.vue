<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px">固定标题，按标题顺序排序，</div>
    <fixed-thead />

    <div style="margin:30px 0 5px 20px">不固定的标题，按点击顺序排序</div>
    <unfixed-thead />
  </div>
</template>

<script>
export default {
  components: {
    FixedThead: () => import("./components/FixedThead"),
    UnfixedThead: () => import("./components/UnfixedThead")
  }
};
</script>