// 如果没有登录， 使用这个中间件的组件跳转到登录路由
export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.user) {
    return redirect('/login')
  }
}
