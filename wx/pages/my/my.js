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
    userInfo:{}
  },
//请求后端获取用户的token
async wxlogin(loginParam){
  const result = await requestUtil({url:"/user/wxlogin",data:loginParam,method:"post"});
  console.log(result);
  const token = result.token;
  if(result.code===0){
    //存储token到缓存
    wx.setStorageSync('token', token);
    
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求封装成一个数组
    const token = wx.getStorageSync('token'); //看看是否登录了
    if (!token) {
     wx.showModal({
       title: '友情提示',
       content: '微信授权登录后才可进入个人中心',
       success:(res)=>{
        Promise.all([getWxLogin(),getUserProfile()]).then((res)=>{
          console.log(res);
          console.log(res[1].userInfo.nickName,res[1].userInfo.avatarUrl);
          let loginParam={
            code:res[0].code,
            nickname:res[1].userInfo.nickName
          }
          console.log(loginParam);
          wx.setStorageSync('userInfo', res[1].userInfo);
          this.wxlogin(loginParam);
          this.setData({
            userInfo:res[1].userInfo
          })
         })
       }
       })
    } else {
      const userInfo = wx.getStorageSync('userInfo')
      this.setData({
        userInfo
      })
    }
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