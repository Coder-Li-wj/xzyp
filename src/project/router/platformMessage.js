const user = {
  routes: [
    {
      path:'/platformMessage/list',
      name:'platformMessageList',
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
            name:'消息管理',
            path:'/platformMessage/list'
          }
        ]
      },
      component: () => import('@/project/views/platformMessage/list')
    },
    {
      path:'/platformMessage/show/:id',
      name:'platformMessageShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'消息管理',
            path:'/platformMessage/list'
          },
          {
            name:'消息详情',
            path:'/platformMessage/show'
          }
        ]
      },
      component: () => import('@/project/views/platformMessage/show')
    }

  ]
}
export default user;
