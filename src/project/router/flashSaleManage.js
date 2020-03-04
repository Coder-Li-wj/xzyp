const manager = {
  routes: [
    {
      path:'/flashSaleManage/list',
      name:'flashSaleManageList',
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
            name:'限时购管理',
            path:'/flashSaleManage/list'
          }
        ]
      },
      component: () => import('@/project/views/flashSaleManage/list')
    },
    {
      path:'/flashSaleManage/show/:id',
      name:'flashSaleManageShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'限时购管理',
            path:'/flashSaleManage/list'
          },
          {
            name:'促销活动详情',
            path:'/flashSaleManage/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/flashSaleManage/show')
    },
  ]
}
export default manager;
