
<template>
  <div id="app">
    <!-- <router-view  v-if="isRouterAlive"/> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  // provide(){
  //   return{
  //     reload:this.reload
  //   }
  // },
  // data(){
  //   return{
  //     isRouterAlive:true
  //   }
  // },
  created(){
    this.startVisibilitychange()
     //  window.open(woUrl,'_self');//跳当前
     console.log('当前环境',`${process.env.NODE_ENV} - 
      ${process.env.ENV}  - ${process.env.VUE_APP_URL}-`)
  },
  methods:{
    /*
    document.visibilityState的值为：
    hidden（当浏览器最小化、切换tab、电脑锁屏时）、
    visible（用户正在查看当前页面时）、
    prerender（文档加载离屏或者不可见）、
    unloaded（当文档将要被unload时）。
    */
     // 开启切换选项卡操作 /监听浏览器窗口选项卡的切换
      startVisibilitychange(){
        console.log('startVisibilitychange')
        document.addEventListener('visibilitychange', this.onVisibilitychange);
        this.$once('hook:beforeDestroy', () => {
          console.log('beforeDestroy')
          document.removeEventListener('visibilitychange', this.onVisibilitychange);
        });
      },
      // 切换选项卡的操作
      onVisibilitychange(){
         console.log(document.visibilityState)
        if (document.visibilityState == 'visible') {
          //
          console.log(1)
        } else if (document.visibilityState == 'hidden') {
          //
           console.log(2)
        }
      },
  //   reload(){
  //     this.isRouterAlive=false
  //     this.$nextTick(function(){
  //       this.isRouterAlive=true
  //     })
  //   }
  }
};
</script>
