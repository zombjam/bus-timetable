import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBusEstimatedNearby, getNearbyStop } from '../../api/index';

export const fetchNearbyStop = createAsyncThunk('home/nearby/stop', async () => {
  const response = await getNearbyStop({
    $select: 'StopUID,StopID,StopName,StopPosition,Bearing,City,StopPosition',
    $top: 1,
  });
  return response;
});

export const fetchBusEstimateNearby = createAsyncThunk('home/estimate/nearby', async params => {
  const response = await getBusEstimatedNearby(params);
  return response;
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
