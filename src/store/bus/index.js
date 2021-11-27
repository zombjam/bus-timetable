import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBusEstimatedNearby, getNearbyStop } from '../../api/index';

export const fetchNearbyStop = createAsyncThunk('bus/nearby/stop', async () => {
  const response = await getNearbyStop();
  return response;
});

export const fetchBusEstimateNearby = createAsyncThunk('bus/estimate/nearby', async params => {
  const response = await getBusEstimatedNearby(params);
  return response;
});

const initialState = {
  nearbyStop: null,
  nearbyList: [],
  routeList: [],
};

export const busSlice = createSlice({
  name: 'bus',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchNearbyStop.fulfilled, (state, action) => {
      state.nearbyStop = action.payload[0];
    });
    builder.addCase(fetchBusEstimateNearby.fulfilled, (state, action) => {
      state.nearbyList = action.payload;
    });
  },
});

// export const { searchNearbyBusList } = busSlice.actions;
export default busSlice.reducer;
