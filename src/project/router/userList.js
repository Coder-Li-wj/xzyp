


const user = {
  routes: [
    {
      path:'/userList/list',
      name:'userListList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'用户管理',
            path:'/index'
          },
          {
            name:'用户列表',
            path:'/userList/list'
          }
        ]
      },
      component: () => import('@/project/views/userList/list')
    },
    {
      path:'/userList/show/:id',
      name:'userListShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'用户列表',
            path:'/userList/list'
          },
          {
            name:'用户详情',
            path:'/userList/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/userList/show')
    }

  ]
}
export default user;
