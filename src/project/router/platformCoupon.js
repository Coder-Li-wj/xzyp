


const manager = {
  routes: [
    {
      path:'/platformCoupon/list',
      name:'platformCouponList',
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
            name:'平台优惠券管理',
            path:'/platformCoupon/list'
          }
        ]
      },
      component: () => import('@/project/views/platformCoupon/list')
    },
    {
      path:'/platformCoupon/show/:id',
      name:'platformCouponShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'平台优惠券管理',
            path:'/platformCoupon/list'
          },
          {
            name:'平台优惠券详情',
            path:'/platformCoupon/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/platformCoupon/show')
    },
  ]
}
export default manager;
