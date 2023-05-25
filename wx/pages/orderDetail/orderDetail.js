// 导入request请求工具类
import {
  requestUtil,
  getBaseUrl
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderObj:[]
  },
  orderInfo:{

  },
  //获取订单详情
  async getorderDetail(id){
    const result = await requestUtil({
      url: '/orderDetail/get',
      data:{id},
      method: "GET"
    });
    console.log(result);
    this.setData({
      orderObj:result.list
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.getorderDetail(options.id)
    // this.getorderDetail(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})