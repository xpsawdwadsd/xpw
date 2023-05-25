// 导入request请求工具类
import {
  requestUtil,
  getBaseUrl
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //推荐食品
    hotMenuList:[],
    //菜系
    cuiSine:[],
    cuiSine_row1:[],
    cuiSine_row2:[],
    //轮播图数组
    swiperList: [],
    baseUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.getSwiperList();
    this.getCuiSineList();
    this.getHotMenu();
  },
  //获取轮播图
  //async表示是一个异步方法
  async getSwiperList() {
    const result = await requestUtil({
      url: '/menu',
      method: "GET"
    });
    const baseUrl = getBaseUrl();
    const menu = result.data.records;
    const swiperList = menu.filter((item,index)=>{
      return index<4;
    });
    this.setData({
      swiperList,
      baseUrl
    })
  },
  async getCuiSineList(){
    const result = await requestUtil({
      url: '/cuisine',
      method: "GET"
    });
    console.log(result.data.records);
    const cuiSine = result.data.records;
    const cuiSine_row1 = cuiSine.filter((item,index)=>{
      return index<4;
    });
    const cuiSine_row2 = cuiSine.filter((item,index)=>{
      return index>=4;
    })
    this.setData({
      cuiSine,
      cuiSine_row1,
      cuiSine_row2,
    })

  },
  // 获取推荐
  async getHotMenu(){
    const result = await requestUtil({
      url: '/menu/findHot',
      method: "GET"
    });
    this.setData({
      hotMenuList:result.message
    })

  },
  //主页跳转到分类
  handleTypeJump(e){
    const {index} = e.currentTarget.dataset;
    console.log(index);
    const app = getApp();
    app.globalData.index=index;
    wx.switchTab({
      url: '/pages/category/category',
    })
  }
})