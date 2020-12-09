<template>
  <aside>
   创建和编辑页面不能被keepalive缓存，因为keepalive包含当前不支持
基于路由的缓存，所以它当前是基于组件名缓存的。如果您希望实现类似的缓存
实际上，您可以使用浏览器缓存方案，如localStorage。或者不使用keep-alive include缓存所有内容
页直接。看到细节
    <a
      href="https://panjiachen.github.io/vue-element-admin-site/guide/essentials/tags-view.html"
      target="_blank"
    >Document</a>
  </aside>
</template>

