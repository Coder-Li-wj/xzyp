const user = {
  routes: [
    {
      path:'/imageSpace/list',
      name:'imageSpaceList',
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
            name:'图片空间',
            path:'/imageSpace/list'
          }
        ]
      },
      component: () => import('@/project/views/imageSpace/list')
    }
  ]
}
export default user;
