const user = {
  routes: [
    {
      path:'/articleList/list',
      name:'articleListList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'message.index',
            path:'/index'
          },
          {
            name:'文章列表',
            path:'/articleList/list'
          }
        ]
      },
      component: () => import('@/project/views/articleList/list')
    }
  ]
}
export default user;
