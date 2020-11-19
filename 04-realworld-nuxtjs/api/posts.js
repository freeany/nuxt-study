import request from '@/utils/request'

export const articleList = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
