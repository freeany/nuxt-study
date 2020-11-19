// 如果登录过了， 使用这个中间件的组件直接跳转到首页
export default function({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (store.state.user) {
    return redirect('/')
  }
}
