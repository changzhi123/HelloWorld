// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[
      'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg',
      'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg',
      'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg'
    ],
    circular:true,
    extraClasses: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(options,'options')
    wx.createIntersectionObserver().relativeToViewport().observe('.target-class', (res) => {
      res.id // 目标节点 id
      res.dataset // 目标节点 dataset
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
      console.log(res,'target-class')
    })
  },
  cartoon(){//跳转list
    wx.navigateTo({
      url: '../module/index'
    })
  },
  tag(){
    wx.navigateTo({
      url:'/moduleA/pages/rabbit/index'
    })
  },
  set(){
    //存储token
    wx.setStorage({
      key:"token",
      data:"changzhi123"
    })
    wx.setStorage({
      key:"key",
      data:"value"
    })
  },
  get(){
    //读取 token
   const token=wx.getStorageSync('token')
   const value = wx.getStorageSync('key')
   console.log(token,'token',value)
  },
  photo(){
    //调用相册或者相机
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
      }
    })
  },
  phototo(){
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  },
  phototsso(){
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles.tempFilePath)
        console.log(res.tempFiles.size)
      }
    })
  },
  login(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code,'code')
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
 getElement(){//获取界面上的节点信息
    const query = wx.createSelectorQuery()
    console.log('获取界面上的节点信息',query.select('#the-id'))
    query.select('#the-id').boundingClientRect(function(res){
      res.top // #the-id 节点的上边界坐标（相对于显示区域）
      console.log(res.top,'节点的上边界坐标（相对于显示区域）')
    })
    query.selectViewport().scrollOffset(function(res){
      res.scrollTop // 显示区域的竖直滚动位置
      console.log(res.scrollTop,'显示区域的竖直滚动位置')
    })
    query.exec()
  },
  triggerTransition: function () {//动画
    if (this.data.extraClasses == 'box-transition box-moved') {
      this.setData({
        extraClasses: 'box-transition'
      })
    } else {
      this.setData({
        extraClasses: 'box-transition box-moved'
      })
    }
  },
  triggerAnimation: function () {
    this.setData({
      extraClasses: 'box-animation'
    })
  },
  transitionEnd: function () {
    console.log('渐变已结束')
  },
  animationStart: function () {
    console.log('动画已开始')
  },
  animationIteration: function () {
    console.log('动画进行中')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})