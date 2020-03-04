


const user = {
  routes: [
    {
      path:'/logisticsCompanyManage/list',
      name:'logisticsCompanyManageList',
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
            name:'物流公司管理',
            path:'/logisticsCompanyManage/list'
          }
        ]
      },
      component: () => import('@/project/views/logisticsCompanyManage/list')
    }
  ]
}
export default user;
