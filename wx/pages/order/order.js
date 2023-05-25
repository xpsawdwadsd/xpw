import {
  requestUtil,
  getBaseUrl,
  getWxLogin,
  getUserProfile
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// pages/order/order.js
Page({
  orders:[],//接受后端参数
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:"全部订单",
      isActive:true
    },
    {
      id:1,
      value:"待取餐",
      isActive:false
    },
    {
      id:2,
      value:"退款",
      isActive:false
    }
  ]
  },
  // //携带orderid进入详情
  // handleTypeJump(e){
  //  console.log(e.currentTarget.dataset);
  //  const {orderid} = e.currentTarget.dataset
  //  console.log("orderid:"+orderid);
  //  const app = getApp();
  //  app.globalData.orderid=orderid;
  //  wx.setStorageSync('orderid', orderid)
  //  wx.navigateTo({
  //    url: '/pages/orderDetail/orderDetail',
  //  })
  // },
  //接口参数
  QueryParams:{
    type:0,
    page:1,//第几页
    pagesize:10,//每页记录数
  },
  //总页数
  totalPage:1,
  //根据标题索引激活所选中的标签
  changeTitleByIndex(index){
  //切换标题
  let {tabs} = this.data;
  tabs.forEach((v,i) =>i==index?v.isActive=true:v.isActive=false);

  this.setData({
    tabs
  })
  },
//页面切换
handleItemTap(e){
  const {index}=e.currentTarget.dataset;
  //切换标题
  this.changeTitleByIndex(index);
  // console.log(index);

  //获取订单列表
  this.QueryParams.type=index;
  this.QueryParams.Page=1;
  this.setData({
    orderList:[]
  })
  this.getOrder();
},
//获取订单
async getOrder(){
  const res=await requestUtil({url:'/order/list',data:this.QueryParams});
  this.totalPage=res.totalPage
  this.setData({
    // orders:[...this.data.orders,...res.ordersList]//拼接
    orders:res.orderList
  })
  console.log(this.data.orders);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
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
   
    let pages=getCurrentPages();
    let currentPage= pages[pages.length-1];
    const {type} = currentPage.options;
    console.log("type="+type);
    this.QueryParams.type=type;
    this.changeTitleByIndex(type);
    this.QueryParams.page=1;
    this.setData({
      orders:[]
    })
    this.getOrder();
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
    this.QueryParams.page=1;
    this.setData({
      orders:[]
    })
    this.getOrder();
    //
    wx.stopPullDownRefresh({

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.QueryParams.page>=this.totalPage){
      //没有下一页数据了
      wx.showToast({
        title: '没有下一页啦',
      })
    } else{
        //还有数据
        this.QueryParams.Page++;
        this.getOrder();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})