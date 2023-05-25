import {
  requestUtil,
  getBaseUrl,
  getWxLogin,
  getUserProfile
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],//商品数组
    inputValue:"",//输入框的值
    isFocus:false//取消按钮是否显示
  },
  //定义一个新的计时器
  TimeoutId:-1,
  //处理input事件
handleInput(e){
  const {value} = e.detail;
  console.log(value);
  if(!value.trim()){
    //加入值为空
    this.setData({
      menuList:[],
      isFocus:false
    })
    return ;
  }
    //有值就要显示取消按钮
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeoutId);
    this.TimeoutId=setTimeout(()=>{
        this.search(value);
    },1000)//设置延迟搜索时间

},
////搜索查询
async search(q){
  const result = await requestUtil({
    url:'/menu/search',
    data:{q}
  })
  this.setData({
    menuList:result.message
  })
},
//点击取消按钮
handleCancel(){
  this.setData({
    menuList:[],
    inputValue:"",
    isFocus:false
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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