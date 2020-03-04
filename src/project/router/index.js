import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import login from './login'
import user from  './user.js'
import role from './role'
import manager from './manager'
import advice from './advice'
import basicParam from './basicParam'
import message from './message'
import version from './version'
import operateLog from './operateLog'
import imageSpace from './imageSpace'
import userList from './userList'
import inShelfGoodManage from './inShelfGoodManage'
import outShelfGoodManage from './outShelfGoodManage'
import classifyManage from './classifyManage'
import checkProjectManage from './checkProjectManage'
import orderManage from './orderManage'
import orderDelivery from './orderDelivery'
import logisticsCompanyManage from './logisticsCompanyManage'
import orderPara from './orderPara'
import freightTemplate from './freightTemplate'
import activityZone from './activityZone'
import flashSaleManage from './flashSaleManage'
import givingGiftManage from './givingGiftManage'
import platformCoupon from './platformCoupon'
import recommendManage from './recommendManage'
import zoneManage from './zoneManage'
import giftPackage from './giftPackage'
import commentList from './commentList'
import sensitiveManage from './sensitiveManage'
import articleList from './articleList'
import articleClassify from './articleClassify'
import articleComment from './articleComment'
import adManage from './adManage'
import helpCenterManage from './helpCenterManage'
import systemArticleManage from './systemArticleManage'
import hotKeywordManage from './hotKeywordManage'
import opinionFeedback from './opinionFeedback'
import platformMessage from './platformMessage'
import checkAccountList from './checkAccountList'
import withdrawalList from './withdrawalList'
import afterSaleManage from './afterSaleManage'
import guessYouLike from  './guessYouLike'

Vue.use(Router);
Vue.use(ElementUI);

let routeList = [
  login.routes,
  manager.routes,
  user.routes,
  role.routes,
  advice.routes,
  basicParam.routes,
  message.routes,
  version.routes,
  operateLog.routes,
  imageSpace.routes,
  userList.routes,
  inShelfGoodManage.routes,
  outShelfGoodManage.routes,
  classifyManage.routes,
  checkProjectManage.routes,
  orderManage.routes,
  orderDelivery.routes,
  logisticsCompanyManage.routes,
  orderPara.routes,
  freightTemplate.routes,
  activityZone.routes,
  flashSaleManage.routes,
  givingGiftManage.routes,
  platformCoupon.routes,
  recommendManage.routes,
  zoneManage.routes,
  giftPackage.routes,
  commentList.routes,
  sensitiveManage.routes,
  articleList.routes,
  articleClassify.routes,
  articleComment.routes,
  adManage.routes,
  helpCenterManage.routes,
  systemArticleManage.routes,
  hotKeywordManage.routes,
  opinionFeedback.routes,
  platformMessage.routes,
  checkAccountList.routes,
  withdrawalList.routes,
  afterSaleManage.routes,
  guessYouLike.routes
];

let routes = [];

//拼接路由
routeList.map(s => {
  routes = routes.concat(s);
});

const router = new Router({
  routes: routes
});

router.beforeEach((to,from,next) => {
  const loading = ElementUI.Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  next();
});

router.afterEach(route => {
  const loading = ElementUI.Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  //将滚动条恢复到最顶端
  window.scrollTo(0, 0);
  setTimeout(() => {
     loading.close();
  },200);
});

export default router;
