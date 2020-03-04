


const manager = {
  routes: [
    {
      path:'/commentList/list',
      name:'commentListList',
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
            name:'评价管理',
            path:'/commentList/list'
          }
        ]
      },
      component: () => import('@/project/views/commentList/list')
    },
    {
      path:'/commentList/show/:id',
      name:'commentListShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'评价管理',
            path:'/commentList/list'
          },
          {
            name:'评价详情',
            path:'/commentList/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/commentList/show')
    },
  ]
}
export default manager;
