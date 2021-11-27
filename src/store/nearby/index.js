import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNearbyStation } from '../../api/index';

export const fetchNearbyStationList = createAsyncThunk('nearby/stations', async params => {
  const response = await getNearbyStation({
    $select: 'StationUID,Bearing,StationName,StationPosition,Stops',
    ...params,
  });
  return response;
});

const initialState = {
  stationList: [],
};

export const nearbySlice = createSlice({
  name: 'nearby',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchNearbyStationList.fulfilled, (state, action) => {
      state.stationList = action.payload;
    });
  },
});

export default nearbySlice.reducer;
