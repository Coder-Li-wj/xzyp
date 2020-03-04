


const user = {
  routes: [
    {
      path:'/givingGiftManage/list',
      name:'givingGiftManageList',
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
            name:'赠品管理',
            path:'/givingGiftManage/list'
          }
        ]
      },
      component: () => import('@/project/views/givingGiftManage/list')
    }
  ]
}
export default user;
