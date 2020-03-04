const user = {
  routes: [
    {
      path:'/adManage/list',
      name:'adManageList',
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
            name:'广告管理',
            path:'/adManage/list'
          }
        ]
      },
      component: () => import('@/project/views/adManage/list')
    }
  ]
}
export default user;
