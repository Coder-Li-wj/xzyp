


const user = {
  routes: [
    {
      path:'/inShelfGoodManage/list',
      name:'inShelfGoodManageList',
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
            name:'在架商品管理',
            path:'/inShelfGoodManage/list'
          }
        ]
      },
      component: () => import('@/project/views/inShelfGoodManage/list')
    }
  ]
}
export default user;
