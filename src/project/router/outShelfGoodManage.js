


const user = {
  routes: [
    {
      path:'/outShelfGoodManage/list',
      name:'outShelfGoodManageList',
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
            name:'下架商品管理',
            path:'/outShelfGoodManage/list'
          }
        ]
      },
      component: () => import('@/project/views/outShelfGoodManage/list')
    }
  ]
}
export default user;
