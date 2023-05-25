//请求的根路径baseUrl
const baseUrl="http://localhost:9092";
//返回请求根路径
export const getBaseUrl=()=>{
  return baseUrl;
}
//getUserProfile封装
export const getUserProfile=()=>{
  return new Promise((resolve,reject)=>{
    wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
      
    })
  });
}
//wx login 封装
export const getWxLogin=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      success: (res) => {
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}
/*
后端请求工具类
*/
export const requestUtil=(params)=>{
  //判断url是否带有order的路劲
  let header = {...params.header};
  if(params.url.includes("/order/")){
    //拼接header代刷token
    header["token"] = wx.getStorageSync('token')
  }
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data)
      },
      fail:(err)=>{
        reject(err)
      },
    })
  });
}