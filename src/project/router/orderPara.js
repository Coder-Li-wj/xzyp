


const user = {
  routes: [
    {
      path:'/orderPara/list',
      name:'orderParaList',
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
            name:'订单参数',
            path:'/orderPara/list'
          }
        ]
      },
      component: () => import('@/project/views/orderPara/list')
    }
  ]
}
export default user;
