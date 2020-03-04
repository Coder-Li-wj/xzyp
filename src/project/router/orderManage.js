const user = {
  routes: [
    {
      path:'/orderManage/list',
      name:'orderManageList',
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
            name:'订单管理',
            path:'/orderManage/list'
          }
        ]
      },
      component: () => import('@/project/views/orderManage/list')
    },
    {
      path:'/orderManage/show/:id',
      name:'orderManageShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'订单详情',
            path:'/orderManage/list'
          }
        ]
      },
      component: () => import('@/project/views/orderManage/show')
    }

  ]
}
export default user;
