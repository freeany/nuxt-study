- 明天进行合并


- nuxtjs 约定的路由 固然很好，但是比较适合小项目。 项目稍微复杂一点，不如全部自定义配置来的简洁。
- 所以使用extendRoutes方法自定义路由表规则





- 在vue中，路由query参数的变化，是不会让组件重新渲染的。
  - query的改变不会调用asyncData方法。如果要监听这个行为，例如，在构建分页组件时，您可以设置应通过页面组件的watchQuery属性监听参数。
  - watchQuery属性：
    - 监听参数字符串更改并在更改时执行组件方法。
  - 使用watchQuery属性可以监听参数字符串的更改，如果定义的字符串发生变化，将调用所有组件方法(asyncData, fetch, vaildate, layout...), ps: 不会执行created，为了提高性能，默认情况下为[] , 如果要为所有的参数字符串设置监听，请设置watchQuery: true
- 使用Promise.all  对无关联接口进行并发请求。
- 当如何某个标签的列表时，点击分页，这时候会把标签在query上的数据清除，所以在分页的nuxt-link上多加一个tag参数其值为$route.query.tag