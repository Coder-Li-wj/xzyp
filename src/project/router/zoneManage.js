


const user = {
  routes: [
    {
      path:'/zoneManage/list',
      name:'zoneManageList',
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
            name:'专区管理',
            path:'/zoneManage/list'
          }
        ]
      },
      component: () => import('@/project/views/zoneManage/list')
    }
  ]
}
export default user;
