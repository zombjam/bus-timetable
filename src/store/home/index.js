import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBusEstimatedNearby, getNearbyStop } from '../../api/index';

const initialState = {
  nearbyStop: null,
  nearbyFilter: '',
  routeList: [],
  loading: null,
};

export const fetchNearbyStop = createAsyncThunk('home/nearby/stop', async params => {
  const { position, ...remain } = params;
  const query = {
    ...remain,
  };
  if (!!position.length) {
    query.$spatialFilter = `nearby(${position[0]}, ${position[1]}, 500)`;
    const response = await getNearbyStop(query, position);

    return response;
  }
  return null;
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

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchNearbyStop.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNearbyStop.fulfilled, (state, { payload }) => {
      if (payload) {
        const { busStop, filterParams, routes } = payload;
        state.nearbyStop = busStop;
        state.nearbyFilter = filterParams;
        state.routeList = routes;
        state.loading = false;
      }
    });
    builder.addCase(fetchBusEstimateNearby.fulfilled, (state, action) => {
      state.routeList = action.payload;
    });
  },
});

export default homeSlice.reducer;
