const user = {
  routes: [
    {
      path:'/articleComment/list',
      name:'articleCommentList',
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
            name:'文章评论',
            path:'/articleComment/list'
          }
        ]
      },
      component: () => import('@/project/views/articleComment/list')
    }
  ]
}
export default user;
