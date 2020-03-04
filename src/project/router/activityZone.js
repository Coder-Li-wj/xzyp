


const manager = {
  routes: [
    {
      path:'/activityZone/list',
      name:'activityZoneList',
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
            name:'活动管理',
            path:'/activityZone/list'
          }
        ]
      },
      component: () => import('@/project/views/activityZone/list')
    },
    {
      path:'/activityZone/show/:id',
      name:'activityZoneShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'活动管理',
            path:'/activityZone/list'
          },
          {
            name:'促销活动详情',
            path:'/activityZone/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/activityZone/show')
    },
  ]
}
export default manager;
