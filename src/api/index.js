import ajax from './ajax';
import { Direction, StopStatus } from '../constant/vehicle';

const defaultNearby = {
  $spatialFilter: 'nearby(24.122771, 120.651540, 500)',
};

const initBusEstimatedRouteNearby = {
  $select: 'RouteUID,RouteName,StopStatus,EstimateTime,Direction',
  ...defaultNearby,
  $top: 10,
};
// 取得指定[位置範圍]的公車路線資料
export function getBusEstimatedNearby() {
  return ajax(`/Bus/EstimatedTimeOfArrival/NearBy`, { ...initBusEstimatedRouteNearby })
    .then(data =>
      data.map(item => ({
        ...item,
        RouteName: item.RouteName.Zh_tw,
        StopName: item.StopName?.Zh_tw || item.StopName,
        StopStatusName: StopStatus[item.StopStatus],
        DirectionName: Direction[item.Direction],
        EstimateTime: item.EstimateTime ?? undefined,
      }))
    )
    .then(data => {
      if (data.length) {
        const filterUIDs = Array.from(new Set(data.map(item => `'${item.RouteUID}'`)));
        return getBusRouteByUID({ $filter: `RouteUID in (${filterUIDs.join(',')})` }).then(routeList => {
          return [data, routeList];
        });
      }
      return [data];
    })
    .then(([data, routeList]) => {
      if (!routeList?.length) return data;
      return data.map(item => {
        const target = routeList.find(bus => bus.RouteUID === item.RouteUID);
        return {
          ...item,
          DepartureStopName: target?.DepartureStopNameZh,
          DestinationStopName: target?.DestinationStopNameZh,
        };
      });
    })
    .then(data =>
      data.sort((a, b) => {
        const aHas = typeof a.EstimateTime !== 'undefined';
        const bHas = typeof b.EstimateTime !== 'undefined';
        return bHas - aHas || (aHas === true && a.EstimateTime - b.EstimateTime) || 0;
      })
    );
}

const initNearbyStop = {
  $select: 'StopUID,StopID,StopName,StopPosition,Bearing,City,StopPosition',
  ...defaultNearby,
  $top: 1,
};
export function getNearbyStop() {
  return ajax(`/Bus/Stop/NearBy`, { ...initNearbyStop }).then(data => data.map(item => ({ ...item, StopName: item.StopName.Zh_tw })));
}

const initBusRouteNearby = {
  ...defaultNearby,
};
export function getBusRouteByUID(params) {
  return ajax(`/Bus/Route/NearBy`, { ...params, ...initBusRouteNearby });
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
