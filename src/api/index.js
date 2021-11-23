import ajax from './ajax';

const defaultNearby = {
  $spatialFilter: 'nearby(24.122771, 120.651540, 1000)',
};

const initBusRouteNearby = {
  $select: 'RouteUID,RouteName,BusRouteType,DepartureStopNameZh,DestinationStopNameZh',
  ...defaultNearby,
  $top: 30,
};
// 取得指定[位置範圍]的公車路線資料
export function getBusRouteNearby() {
  return ajax(`/Bus/Route/Nearby`, { ...initBusRouteNearby });
}

const initBusStopNearby = {
  $select: 'StopUID,AuthorityID,StopName,StopPosition,StopAddress,City',
  ...defaultNearby,
  $top: 30,
};
// 取得指定[位置範圍]的公車站牌資料
export function getBusStopNearby(params) {
  return ajax(`/Bus/Stop/Nearby`, { ...initBusStopNearby, ...params });
}

// 取得指定[縣市]的市區公車營運業者資料
export function getBusOperatorByCity(city = 'NewTaipei') {
  return ajax(`/Bus/Operator/City/${city}`);
}

// 取得指定[縣市][路線名稱]的公車預估到站資料(逐筆更新)
export function getBusEstimatedTimeOfArrival(city, routeName) {
  return ajax(`Bus/EstimatedTimeofArrival/Streaming/City/${city}/${routeName}`);
}

// 路線站名關鍵字搜尋 $filter: 'contains(RouteName/Zh_tw, keyword)'
export function getBusStopByKeyword() {}
