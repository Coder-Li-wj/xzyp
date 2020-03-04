


const user = {
  routes: [
    {
      path:'/checkAccountList/list',
      name:'checkAccountListList',
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
            name:'平台流水',
            path:'/checkAccountList/list'
          }
        ]
      },
      component: () => import('@/project/views/checkAccountList/list')
    }
  ]
}
export default user;
