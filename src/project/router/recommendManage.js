


const user = {
  routes: [
    {
      path:'/recommendManage/list',
      name:'recommendManageList',
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
            name:'推荐管理',
            path:'/recommendManage/list'
          }
        ]
      },
      component: () => import('@/project/views/recommendManage/list')
    }
  ]
}
export default user;
