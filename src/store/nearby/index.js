import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { defaultPosition } from 'constant/general';
import { getNearbyStation } from '../../api/index';

export const fetchNearbyStationList = createAsyncThunk('nearby/stations', async params => {
  const { position, ...remain } = params;
  let currPosition = !!position?.length ? position : defaultPosition;
  const query = {
    $select: 'StationUID,Bearing,StationName,StationPosition,Stops',
    $spatialFilter: `nearby(${currPosition[0]}, ${currPosition[1]}, 500)`,
    ...remain,
  };

  const response = await getNearbyStation(query);
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
