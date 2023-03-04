﻿import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'


// 定义 mock 请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)
// 用户列表数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/get/,user.getUserList)

