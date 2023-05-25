// 导入request请求工具类
import {
  requestUtil,
  getBaseUrl
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,//设置竖向滚动条位置
    currentIndex:0,//当前选中的左侧菜单
    //左侧的数据
    leftMenuList:[],
    //右侧数据
    rightContext:[]
  },
  //所有商品的
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求获取数据
    this.getCates();
  },
  //获取商品分类数据
  async getCates(){
    const result = await requestUtil({
      url: '/cuisine//findCategories',
      method: "GET"
    });
    this.Cates=result.message;
    //遍历获取菜系名
    let leftMenuList=this.Cates.map((v)=>{
      return v.title
    })
    let rightContext=this.Cates[0].menuList;
    this.setData({
      leftMenuList,
      rightContext
    })
  },
  //获取页面跳转过来获取商品数据
  async getCates2(index){
    const result = await requestUtil({
      url: '/cuisine//findCategories',
      method: "GET"
    });
    this.Cates=result.message;
    //遍历获取菜系名
    let leftMenuList=this.Cates.map((v)=>{
      return v.title
    })
    let rightContext=this.Cates[index].menuList;
    this.setData({
      leftMenuList,
      rightContext,
      currentIndex:index,
      scrollTop:0,
    })
  },
  //左侧菜单点击切换
  handMenuItemChange(e){
    const {index}=e.currentTarget.dataset;
    let rightContext=this.Cates[index].menuList;
    this.setData({
      currentIndex:index,
      rightContext,
      scrollTop:0
    })
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
    //console.log("onshow");
    const app = getApp();
    const {index} = app.globalData;
    //-1说明不是直接打开的
    if(index!=-1){
      this.getCates2(index);
      app.globalData.index=-1;//重置index
    }
   
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