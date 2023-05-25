import {
  requestUtil,
  getBaseUrl
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
    array: [],
    allChecked:false,
    totalPrice:0,
    totalNum:0,
  },
  //选择餐桌
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.setStorageSync('tableid',++e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
//取消勾选
handleItemChange(e){
  const {id}=e.currentTarget.dataset;
  let {cart} = this.data;
  //修改被勾选
  let index = cart.findIndex(v=>v.id===id)
  cart[index].checked=!cart[index].checked;
  this.setCart(cart);
},
//设置购物车状态，重新计算底部工具栏的全选，总价，总数量，以及缓存
setCart(cart){
  let allChecked=true;
    let totalNum=0;
    let totalPrice=0;
    cart.forEach(v=>{
      if(v.checked){
        totalNum+=v.num;
        totalPrice+=v.price*v.num;
      }
      else{
        allChecked=false
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      totalPrice,
      totalNum,
      allChecked,
      cart
    })
    wx.setStorageSync('cart', cart)
},
//勾选全选的业务处理
handleItemAllCheck(){
  let {cart,allChecked}=this.data;
  allChecked=!allChecked;
  cart.forEach(v=>v.checked=allChecked);
  this.setCart(cart);
},
//增加或减少商品数量
NumEdit(e){
  const {id,operation}=e.currentTarget.dataset;
  console.log(id,operation);
  let {cart} = this.data;
  let index = cart.findIndex(v=>v.id===id)
  if(cart[index].num===1&&operation===-1){
    wx.showModal({
      title: '系统提示',
      content: '是否退选这道菜',
      complete: (res) => {
        if (res.confirm) {
          cart.splice(index,1);
          this.setCart(cart);
        }
      }
    })
  }
  else{
     cart[index].num+=operation;
  this.setCart(cart);
  }
 
},
//点击结算
handlePay(){
  const {index,totalNum}=this.data;
  if(!index){
    wx.showToast({
      title: '请先选择座位，美食马上送到！',
      icon:'none'
    })
    return ;
  }
  if(!totalNum){
    wx.showToast({
      title: '您还没有加购商品',
      icon:'none'
    })
    return ;
  }
  //商品和餐位都选了
  wx.navigateTo({
    url: '/pages/pay/pay',
  })
},
async gettable(){
  const result = await requestUtil({
    url: '/table',
    method: "GET"
  });
  let List=result.data.records.map((v)=>{
    return v.description
  })
  const array = List
  this.setData({
    array
  })
  console.log(this.array);
},
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettable()
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const tableid = wx.getStorageSync('tableid');
    const cart = wx.getStorageSync('cart')||[];
    this.setData({
      index:tableid,
    })
    this.setCart(cart);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  
 
 

})