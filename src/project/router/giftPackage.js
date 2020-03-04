const user = {
  routes: [
    {
      path:'/giftPackage/list',
      name:'giftPackageList',
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
            name:'新人礼包设置',
            path:'/giftPackage/list'
          }
        ]
      },
      component: () => import('@/project/views/giftPackage/list')
    },
    {
      path:'/giftPackage/show/:id',
      name:'giftPackageShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'新人礼包设置',
            path:'/giftPackage/list'
          },
          {
            name:'平台优惠券详情',
            path:'/giftPackage/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/giftPackage/show')
    },
  ]
}
export default user;
