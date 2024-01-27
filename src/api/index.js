import ajax from './ajax';
import { Direction, StopStatus, Bearing } from '../constant/vehicle';
import { CityObject } from '../constant/city';
import { distance } from '../utils/geo-helper';

const initNearbyStop = {
  $select: 'StationID,StationGroupID,StopUID,StopID,StopName,StopPosition,Bearing,StopAddress,City',
  $top: 10,
};

// 取得指定[位置範圍]的公車站牌資料
export function getNearbyStop(params, position) {
  return ajax(`/advanced/v2/Bus/Stop/NearBy`, { ...initNearbyStop, ...params })
    .then((data) => {
      const result = data
        .map((item) => ({
          ...item,
          StopName: item.StopName.Zh_tw,
          BearingName: Bearing[item.Bearing],
          distance: distance(position[0], position[1], item.StopPosition.PositionLat, item.StopPosition.PositionLon),
        }))
        .sort((a, b) => a.distance - b.distance);
      return result[0];
    })
    .then((busStop) => {
      if (!busStop) {
        return { busStop: null, filterParams: '', routes: [] };
      }
      return getNearbyStation({ ...params, $filter: `StationID eq '${busStop.StationID}'` }).then((data) => {
        if (data[0]) {
          const routeUIDs = data[0].Stops.map((x) => `'${x.RouteUID}'`);
          if (routeUIDs.length) {
            const filterParams = `RouteUID in (${routeUIDs.join(',')})`;
            return getBusEstimatedNearby({ $filter: filterParams, ...params }).then((routes) => {
              return { busStop, filterParams, routes };
            });
          }
        }
        return { busStop };
      });
    });
}

export function getNearbyStation(params) {
  return ajax(`/advanced/v2/Bus/Station/NearBy`, { ...params }).then((data) =>
    data.map((item) => {
      const filterStops = item.Stops?.filter((stop, indx, arr) => arr.findIndex((s) => s.RouteUID === stop.RouteUID) === indx);
      return {
        ...item,
        StationName: item.StationName?.Zh_tw,
        BearingName: Bearing[item.Bearing],
        Stops: filterStops,
        StopsList: filterStops.map((stop) => stop.RouteName.Zh_tw).join('、'),
      };
    })
  );
}

const initBusRouteNearby = {
  $select: 'RouteUID,RouteName,City,DepartureStopNameZh,DestinationStopNameZh',
};
// 取得指定[位置範圍]的公車路線資料
export function getBusRouteByUID(params) {
  return ajax(`/advanced/v2/Bus/Route/NearBy`, { ...initBusRouteNearby, ...params });
}

const initBusEstimatedRouteNearby = {
  $select: 'RouteUID,RouteName,StopStatus,EstimateTime,Direction',
  $top: 30,
};
// 取得指定[位置範圍]的預測公車到站資料
export function getBusEstimatedNearby(params) {
  return ajax(`/advanced/v2/Bus/EstimatedTimeOfArrival/NearBy`, { ...initBusEstimatedRouteNearby, ...params })
    .then((data) =>
      data
        .filter((item, indx, arr) => arr.findIndex((i) => i.RouteUID === item.RouteUID && i.Direction === item.Direction) === indx)
        .map((item) => ({
          ...item,
          RouteName: item.RouteName.Zh_tw,
          StopName: item.StopName?.Zh_tw || item.StopName,
          StopStatusName: StopStatus[item.StopStatus],
          DirectionName: Direction[item.Direction],
          EstimateTime: item.EstimateTime ?? undefined,
        }))
    )
    .then((data) => {
      if (data.length) {
        const filterUIDs = Array.from(new Set(data.map((item) => `'${item.RouteUID}'`)));
        return getBusRouteByUID({ $filter: `RouteUID in (${filterUIDs.join(',')})`, ...params }).then((routeList) => {
          return [data, routeList];
        });
      }
      return [data];
    })
    .then(([data, routeList]) => {
      if (!routeList?.length) return data;
      return data.map((item) => {
        const target = routeList.find((bus) => bus.RouteUID === item.RouteUID);
        return {
          ...item,
          DepartureStopName: target?.DepartureStopNameZh,
          DestinationStopName: target?.DestinationStopNameZh,
          City: target?.City,
          BusRouteType: target?.BusRouteType,
        };
      });
    })
    .then((data) =>
      data.sort((a, b) => {
        const aHas = typeof a.EstimateTime !== 'undefined';
        const bHas = typeof b.EstimateTime !== 'undefined';
        return bHas - aHas || (aHas === true && a.EstimateTime - b.EstimateTime) || 0;
      })
    );
}

// 路線站名關鍵字搜尋 $filter: 'contains(RouteName/Zh_tw, keyword)'

const initBusRouteInfo = {
  $select: 'RouteUID,Operators,RouteName,DepartureStopNameZh,DestinationStopNameZh,TicketPriceDescriptionZh,RouteMapImageUrl,City',
};
export function getBusRouteInfo(city, params) {
  const url = `/basic/v2/Bus/Route/${city === 'InterCity' ? city : `City/${city}`}`;
  return ajax(url, { ...initBusRouteInfo, ...params }).then((data) =>
    data.map((item) => {
      const { DepartureStopNameZh, DestinationStopNameZh, ...model } = item;
      return {
        ...model,
        RouteName: item.RouteName.Zh_tw,
        DepartureStopName: DepartureStopNameZh,
        DestinationStopName: DestinationStopNameZh,
        CityName: CityObject[item.City],
      };
    })
  );
}

const initStopOfRoute = {
  $select: 'RouteUID,RouteName,Direction,City,Stops',
};
export function getStopOfRoute(city, routeUID) {
  const url = `/basic/v2/Bus/StopOfRoute/${city === 'InterCity' ? city : `City/${city}`}`;
  const params = {
    $filter: `RouteUID eq '${routeUID}'`,
  };
  return ajax(url, { ...initStopOfRoute, ...params }).then((data) =>
    data.map((item) => ({
      ...item,
      DirectionName: Direction[item.Direction],
      RouteName: item.RouteName.Zh_tw,
      Stops: item.Stops.map((stop) => ({
        ...stop,
        StopName: stop.StopName.Zh_tw,
      })),
    }))
  );
}

const initBusShape = {
  $select: 'RouteUID,RouteName,Direction,Geometry,EncodedPolyline',
};
export function getBusRouteShape(city, routeUID) {
  const url = `/basic/v2/Bus/Shape/${city === 'InterCity' ? city : `City/${city}`}`;
  const params = {
    $filter: `RouteUID eq '${routeUID}'`,
  };
  return ajax(url, { ...initBusShape, ...params })
    .then((data) =>
      data.map((item) => ({
        ...item,
        Coordinates: item.Geometry.match(/\(([^)]+)\)/)
          .pop()
          .split(',')
          .map((latLng) =>
            latLng
              .split(' ')
              .map((x) => parseFloat(x))
              .reverse()
          ),
      }))
    )
    .then((data) => data[0]?.Coordinates);
}

const initBusEstimatedTimeOfArrivalList = {
  $select: 'PlateNumb,StopUID,StopName,RouteUID,RouteName,Direction,EstimateTime,Estimates,StopCountDown,StopSequence,StopStatus,IsLastBus',
};
export function getBusEstimatedTimeOfArrivalList(city, routeUID) {
  const url = `/basic/v2/Bus/EstimatedTimeOfArrival/${city === 'InterCity' ? city : `City/${city}`}`;
  const params = {
    $filter: `RouteUID eq '${routeUID}'`,
  };
  return ajax(url, { ...initBusEstimatedTimeOfArrivalList, ...params }).then((data) =>
    data.map((item) => ({
      ...item,
      StopStatusName: StopStatus[item.StopStatus],
    }))
  );
}
