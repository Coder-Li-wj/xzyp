const manager = {
  routes: [
    {
      path:'/opinionFeedback/list',
      name:'opinionFeedbackList',
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
            name:'意见反馈',
            path:'/opinionFeedback/list'
          }
        ]
      },
      component: () => import('@/project/views/opinionFeedback/list')
    },
    {
      path:'/opinionFeedback/haveDealShow/:id',
      name:'opinionFeedbackShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'意见反馈',
            path:'/opinionFeedback/list'
          },
          {
            name:'意见反馈详情',
            path:'/opinionFeedback/haveDealShow/:id'
          }
        ]
      },
      component: () => import('@/project/views/opinionFeedback/haveDealShow')
    },
    {
      path:'/opinionFeedback/toBeDealShow/:id',
      name:'opinionFeedbackShow2',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'意见反馈',
            path:'/opinionFeedback/list'
          },
          {
            name:'意见反馈详情',
            path:'/opinionFeedback/toBeDealShow/:id'
          }
        ]
      },
      component: () => import('@/project/views/opinionFeedback/toBeDealShow')
    },
  ]
}
export default manager;
