const user = {
  routes: [
    {
      path:'/checkProjectManage/list',
      name:'checkProjectManageList',
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
            name:'质检报告列表',
            path:'/checkProjectManage/list'
          }
        ]
      },
      component: () => import('@/project/views/checkProjectManage/list')
    }
  ]
}
export default user;
