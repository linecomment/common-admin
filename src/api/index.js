﻿import http from '@/utils/request'

// 请求首页数据
export const getData = () => {
    // 返回一个 promise 对象
    return http.get('/home/getData')
}

export const getUser = (params) => {
    // 返回用户列表
    return http.get('/user/get',params)
}

export const addUser = (data) => {
    return http.post('/user/add',data)
}

export const editUser = (data) => {
    return http.post('/user/edit',data)
}

export const deleteUser = (data) => {
    return http.post('/user/del',data)
}

