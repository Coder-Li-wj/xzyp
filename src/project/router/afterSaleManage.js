const user = {
  routes: [
    {
      path:'/afterSaleManage/list',
      name:'afterSaleManageList',
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
            name:'售后订单管理',
            path:'/afterSaleManage/list'
          }
        ]
      },
      component: () => import('@/project/views/afterSaleManage/list')
    },
    {
      path:'/afterSaleManage/show/:id',
      name:'afterSaleManageShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'售后订单管理',
            path:'/afterSaleManage/list'
          },
          {
            name:'售后订单详情',
            path:'/afterSaleManage/show'
          }
        ]
      },
      component: () => import('@/project/views/afterSaleManage/show')
    }

  ]
}
export default user;
