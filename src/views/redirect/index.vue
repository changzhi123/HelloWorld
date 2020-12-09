
<script>
export default {
  // 刷新当前页所跳转的空白页
  created() {
    const { params, query } = this.$route
    const { path } = params
    console.log(params,query,path,'空白页')
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // 避免警告消息
  }
}
</script>
