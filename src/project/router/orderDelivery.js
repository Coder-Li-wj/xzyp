const user = {
  routes: [
    {
      path:'/orderDelivery/list',
      name:'orderDeliveryList',
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
            name:'订单发货',
            path:'/orderDelivery/list'
          }
        ]
      },
      component: () => import('@/project/views/orderDelivery/list')
    },
    {
      path:'/orderDelivery/exportManage',
      name:'orderDeliveryShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'导出管理',
            path:'/orderDelivery/exportManage'
          }
        ]
      },
      component: () => import('@/project/views/orderDelivery/exportManage')
    }
  ]
}
export default user;
