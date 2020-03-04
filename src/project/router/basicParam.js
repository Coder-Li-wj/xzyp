


const user = {
  routes: [
    {
      path:'/basicParam/list',
      name:'basicParamList',
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
            name:'基本参数',
            path:'/basicParam/list'
          }
        ]
      },
      component: () => import('@/project/views/basicParam/list')
    }
  ]
}
export default user;
