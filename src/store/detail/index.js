import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBusRouteInfo, getStopOfRoute, getBusRouteShape, getBusEstimatedTimeOfArrivalList } from '../../api/index';

const initialState = {
  busInfo: null,
  busStops: [],
  busShapes: null,
  estimatedList: [],
};

export const fetchBusStops = createAsyncThunk('bus/fetchBusStops', async (params) => {
  const { city, routeUID } = params;
  const query = {
    $filter: `RouteUID eq '${routeUID}'`,
  };
  const response = await Promise.all([getStopOfRoute(city, routeUID), getBusRouteInfo(city, query)]);
  return response;
});

export const fetchBusShapes = createAsyncThunk('bus/fetchBusShapes', async (params) => {
  const { city, routeUID } = params;
  const response = await getBusRouteShape(city, routeUID);
  return response;
});

export const fetchBusEstimatedTimeList = createAsyncThunk('bus/fetchBusEstimatedTimeList', async (params) => {
  const { city, routeUID } = params;
  const response = await getBusEstimatedTimeOfArrivalList(city, routeUID);
  return response;
});

export const detailSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBusStops.fulfilled, (state, { payload }) => {
      const [busStops, busInfo] = payload;
      state.busInfo = busInfo[0];
      state.busStops = busStops;
    });
    builder.addCase(fetchBusShapes.fulfilled, (state, { payload }) => {
      state.busShapes = payload;
    });
    builder.addCase(fetchBusEstimatedTimeList.fulfilled, (state, { payload }) => {
      state.estimatedList = payload;
    });
  },
});

// export const {  } = detailSlice.actions;

export default detailSlice.reducer;
