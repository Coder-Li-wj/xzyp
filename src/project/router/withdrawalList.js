const manager = {
  routes: [
    {
      path:'/withdrawalList/list',
      name:'withdrawalListList',
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
            name:'message.manager',
            path:'/withdrawalList/list'
          }
        ]
      },
      component: () => import('@/project/views/withdrawalList/list')
    },
    {
      path:'/withdrawalList/toBeCheckShow/:id',
      name:'withdrawalListShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'提现列表',
            path:'/withdrawalList/list'
          },
          {
            name:'提现详情',
            path:'/withdrawalList/toBeCheckShow/:id'
          }
        ]
      },
      component: () => import('@/project/views/withdrawalList/toBeCheckShow')
    },
    {
      path:'/withdrawalList/haveCheckShow/:id',
      name:'withdrawalListShow2',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'提现列表',
            path:'/withdrawalList/list'
          },
          {
            name:'提现详情',
            path:'/withdrawalList/haveCheckShow/:id'
          }
        ]
      },
      component: () => import('@/project/views/withdrawalList/haveCheckShow')
    },
  ]
}
export default manager;
