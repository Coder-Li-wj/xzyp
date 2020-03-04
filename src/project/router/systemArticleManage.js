const user = {
  routes: [
    {
      path:'/systemArticleManage/list',
      name:'systemArticleManageList',
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
            name:'系统文章管理',
            path:'/systemArticleManage/list'
          }
        ]
      },
      component: () => import('@/project/views/systemArticleManage/list')
    }
  ]
}
export default user;
