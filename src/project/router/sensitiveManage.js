const user = {
  routes: [
    {
      path:'/sensitiveManage/list',
      name:'sensitiveManageList',
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
            name:'敏感词管理',
            path:'/sensitiveManage/list'
          }
        ]
      },
      component: () => import('@/project/views/sensitiveManage/list')
    }
  ]
}
export default user;
