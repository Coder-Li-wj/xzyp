const user = {
  routes: [
    {
      path:'/guessYouLike/list',
      name:'guessYouLikeList',
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
            name:'猜你喜欢设置',
            path:'/guessYouLike/list'
          }
        ]
      },
      component: () => import('@/project/views/guessYouLike/list')
    }
  ]
}
export default user;
