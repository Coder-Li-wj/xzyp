


const user = {
  routes: [
    {
      path:'/freightTemplate/list',
      name:'freightTemplateList',
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
            name:'运费模板设置',
            path:'/freightTemplate/list'
          }
        ]
      },
      component: () => import('@/project/views/freightTemplate/list')
    }
  ]
}
export default user;
