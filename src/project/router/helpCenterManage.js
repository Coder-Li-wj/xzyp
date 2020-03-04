const user = {
  routes: [
    {
      path:'/helpCenterManage/list',
      name:'helpCenterManageList',
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
            name:'帮助中心文章管理',
            path:'/helpCenterManage/list'
          }
        ]
      },
      component: () => import('@/project/views/helpCenterManage/list')
    }
  ]
}
export default user;
