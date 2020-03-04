const user = {
  routes: [
    {
      path:'/articleClassify/list',
      name:'articleClassifyList',
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
            name:'分类管理',
            path:'/articleClassify/list'
          }
        ]
      },
      component: () => import('@/project/views/articleClassify/list')
    }
  ]
}
export default user;
