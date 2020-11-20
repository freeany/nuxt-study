// import request from '@/utils/request'
import { request } from '@/plugins/request'

// 获取全部的文章列表
export const articleList = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取 我 following的人的写的文章
export const articleFeedList = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}
//  去点赞
export const favorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const unfavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取 单个的 文章信息
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}
