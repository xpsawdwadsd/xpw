// 导入request请求工具类
import {
  requestUtil,
  getBaseUrl
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// pages/menu_detail/menu_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuObj:[]
  },
  menuInfo:{

  },
  async getMenuDetail(id){
    const result = await requestUtil({
      url: '/menu/detail',
      data:{id},
      method: "GET"
    });
    this.menuInfo=result.message;
    console.log(this.menuInfo);
    this.setData({
      menuObj:result.message
    })

  },
  //加入购物车
  handleCartAdd(){
    let cart = wx.getStorageSync('cart')||[];
    console.log(cart);
    //判断购物车中是否有该商品
    let index = cart.findIndex(v=>v.id===this.menuInfo.id);
    if(index===-1){
      //不存在商品
      this.menuInfo.num=1;
      this.menuInfo.checked=true;
      cart.push(this.menuInfo);
    }else{//存在
      cart[index].num++;
    }
    wx.setStorageSync('cart',cart);//把购物车添加到缓存中
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask:true
    })
    console.log(cart);
  },
  //点击立即购买
  handleBuy(){
    this.handleCartAdd();
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMenuDetail(options.id);
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