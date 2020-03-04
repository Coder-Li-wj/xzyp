const user = {
  routes: [
    {
      path:'/hotKeywordManage/list',
      name:'hotKeywordManageList',
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
            name:'热门关键词管理',
            path:'/hotKeywordManage/list'
          }
        ]
      },
      component: () => import('@/project/views/hotKeywordManage/list')
    }
  ]
}
export default user;
