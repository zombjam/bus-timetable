import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBusEstimatedNearby, getNearbyStop } from '../../api/index';

export const fetchNearbyStop = createAsyncThunk('home/nearby/stop', async params => {
  const { position, ...remain } = params;
  const query = {
    $select: 'StopUID,StopID,StopName,StopPosition,Bearing,City,StopPosition',
    $top: 1,
    ...remain,
  };
  if (!!position.length) {
    query.$spatialFilter = `nearby(${position[0]}, ${position[1]}, 500)`;
    const response = await getNearbyStop(query);
    return response;
  }
  return [];
});

export const fetchBusEstimateNearby = createAsyncThunk('home/estimate/nearby', async params => {
  const { position, ...remain } = params;
  const query = { ...remain };
  if (!!position.length) {
    query.$spatialFilter = `nearby(${position[0]}, ${position[1]}, 500)`;
    const response = await getBusEstimatedNearby(query);
    return response;
  }
  return [];
});

const initialState = {
  nearbyStop: null,
  routeList: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchNearbyStop.fulfilled, (state, action) => {
      state.nearbyStop = action.payload[0];
    });
    builder.addCase(fetchBusEstimateNearby.fulfilled, (state, action) => {
      state.routeList = action.payload;
    });
  },
});

export default homeSlice.reducer;
