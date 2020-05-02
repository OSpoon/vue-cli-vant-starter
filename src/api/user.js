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
  创建user数据
*/
export function userPost(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/*
  更新user数据
*/
export function userPut(data) {
  return request({
    url: '/user/put',
    method: 'put',
    data
  })
}

/*
  删除user数据
*/
export function userDel(id) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params: id
  })
}
