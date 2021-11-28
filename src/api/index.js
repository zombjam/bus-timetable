import ajax from './ajax';
import { Direction, StopStatus, Bearing } from '../constant/vehicle';

// const defaultNearby = {
//   $spatialFilter: 'nearby(24.122771, 120.651540, 500)',
// };

const initNearbyStop = {
  $top: 30,
};
// 取得指定[位置範圍]的公車站牌資料
export function getNearbyStop(params) {
  return ajax(`/Bus/Stop/NearBy`, { ...initNearbyStop, ...params }).then(data =>
    data.map(item => ({ ...item, StopName: item.StopName.Zh_tw, BearingName: Bearing[item.Bearing] }))
  );
}

export function getNearbyStation(params) {
  return ajax(`/Bus/Station/NearBy`, { ...params }).then(data =>
    data.map(item => {
      const filterStops = item.Stops?.filter((stop, indx, arr) => arr.findIndex(s => s.RouteUID === stop.RouteUID) === indx);
      return {
        ...item,
        StationName: item.StationName?.Zh_tw,
        BearingName: Bearing[item.Bearing],
        Stops: filterStops,
        StopsList: filterStops.map(stop => stop.RouteName.Zh_tw).join('、'),
      };
    })
  );
}

const initBusRouteNearby = {
  $select: 'RouteUID,RouteName,City,DepartureStopNameZh,DestinationStopNameZh',
};
// 取得指定[位置範圍]的公車路線資料
export function getBusRouteByUID(params) {
  return ajax(`/Bus/Route/NearBy`, { ...initBusRouteNearby, ...params });
}

const initBusEstimatedRouteNearby = {
  $select: 'RouteUID,RouteName,StopStatus,EstimateTime,Direction',
  $top: 20,
};
// 取得指定[位置範圍]的預測公車到站資料
export function getBusEstimatedNearby(params) {
  return ajax(`/Bus/EstimatedTimeOfArrival/NearBy`, { ...initBusEstimatedRouteNearby, ...params })
    .then(data =>
      data
        .filter((item, indx, arr) => arr.findIndex(i => i.RouteUID === item.RouteUID && i.Direction === item.Direction) === indx)
        .map(item => ({
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
        return getBusRouteByUID({ $filter: `RouteUID in (${filterUIDs.join(',')})`, ...params }).then(routeList => {
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

// 路線站名關鍵字搜尋 $filter: 'contains(RouteName/Zh_tw, keyword)'
