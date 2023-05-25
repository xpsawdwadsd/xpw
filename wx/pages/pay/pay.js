import {
  requestUtil,
  getBaseUrl,
  getWxLogin,
  getUserProfile
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    index:1,
    totalPrice:0,
    totalNum:0,
    
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
//处理订单支付
async handleOrderPay(){

 //请求封装成一个数组
 const token=wx.getStorageSync('token');//看看是否登录了
 if(!token){
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
 }) }
 else{
   //已经登录过了
   //就可以继续支付
   console.log("继续");
   this.creatOrder();
   wx.navigateTo({
    url: '/pages/order/order',
  })
 }
},

//创建订单
async creatOrder(){
  try{
    const amount = this.data.totalPrice;
    const table_id = this.data.index;
    let goods=[];
    this.data.cart.forEach(v=>goods.push({
      goodsid:v.id,
      goodsnumber:v.num,
      goodsprice:v.price,
      goodstitle:v.title,
      goodspic:v.cover
    }))
    
    const orderParam={
      amount,
      table_id,
      goods
    }
    const res = await requestUtil({
      url: '/order/create',
      method:"POST",
      data:orderParam});
    console.log(res.orderid);
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync('cart',newCart);
    wx.showToast({
      title: '下单成功',
      icon:'none'
    })
    wx.navigateTo({
      url: '/pages/order/order?type=0',
    })
  }catch(error){
    console.log(error);
    wx.showToast({
      title: '购买失败，稍后重试',
    })
  }
  
},
//请求后端获取用户的token
async wxlogin(loginParam){
  const result = await requestUtil({url:"/user/wxlogin",data:loginParam,method:"post"});
  console.log(result);
  const token = result.token;
  if(result.code===0){
    //存储token到缓存
    wx.setStorageSync('token', token);
    this.creatOrder();
  }
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const tableid = wx.getStorageSync('tableid');
    let cart = wx.getStorageSync('cart')||[];
    cart = cart.filter(v=>v.checked);
    let totalNum=0;
    let totalPrice=0;
    cart.forEach(v=>{
        totalNum+=v.num;
        totalPrice+=v.price*v.num;
    })
    this.setData({
      totalPrice,
      totalNum,
      index:tableid,
      cart
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  
 
 

})