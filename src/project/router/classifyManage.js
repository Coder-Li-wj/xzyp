


const user = {
  routes: [
    {
      path:'/classifyManage/list',
      name:'classifyManageList',
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
            name:'分类管理',
            path:'/classifyManage/list'
          }
        ]
      },
      component: () => import('@/project/views/classifyManage/list')
    }
  ]
}
export default user;
