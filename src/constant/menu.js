import mobileHomeSection_search from '../assets/images/section-image01_m.png';
import mobileHomeSection_nearby from '../assets/images/section-image02_m.png';
// import mobileHomeSection03 from '../assets/images/section-image03_m.png'

const routes = {
  home: '/',
  search: '/search',
  nearby: '/nearby',
  recommend: '/recommend',
};

export const HomeNavMenus = [
  { name: '公車快找', desc: '直接輸入路線名稱獲得資訊！', path: routes.search, img: mobileHomeSection_search },
  { name: '查詢站牌', desc: '附近站牌 / 公車動態及路線圖', path: routes.nearby, img: mobileHomeSection_nearby },
];

export const MobileMenus = [
  { name: '回首頁', path: routes.home },
  { name: '公車快找', path: routes.search },
  { name: '查詢站牌', path: routes.nearby },
];
