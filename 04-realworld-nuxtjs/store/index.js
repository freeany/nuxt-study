const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  // 在服务端渲染的时候会自动调用这个方法，初始化容器以及传递给客户端需要的数据。
  // 这个特殊的action方法只会在服务端渲染期间运行,
  // 这个钩子在组件渲染之前会被调用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    // 如果请求头中有cookie
    if (req.headers.cookie) {
      // 解析cookie数据。
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    // 修改 state状态
    commit('setUser', user)
  }
}
