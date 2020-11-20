import request from '@/utils/request'

/*
  获取user数据
*/
export function userGet(query) {
  return request({
    url: '/user/get',
    method: 'get',
    params: query
  })
}

/*
  用户登录
*/
export function login(data) {
  return request({
    url: '/eduservice/user/login',
    method: 'post',
    data
  })
}

