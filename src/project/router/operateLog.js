const user = {
  routes: [
    {
      path:'/operateLog/list',
      name:'operateLogList',
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
            name:'操作日志',
            path:'/operateLog/list'
          }
        ]
      },
      component: () => import('@/project/views/operateLog/list')
    }
  ]
}
export default user;
