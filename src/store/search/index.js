import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import geolocation from './geolocation';
import { getBusRouteInfo } from '../../api/index';

const initialState = {
  defaultPosition: [24.122771, 120.65154],
  currentPosition: [],
  isOpenGPS: false,
  gpsStatus: null,
  geoLoading: null,
  cityBusList: [],
  historyResult: [],
  loading: null,
};

export const getGeolocation = createAsyncThunk('search/geolocation', async (isShowMsg, thunkAPI) => {
  try {
    const position = await geolocation();
    return { isShowMsg, position };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const searchCityBusByKeyword = createAsyncThunk('search/cityBusByKeyword', async (params, thunkAPI) => {
  const { city, keyword } = params;
  if (!(city && keyword)) {
    return;
  }
  const query = {
    $filter: `contains(RouteName/Zh_tw, '${keyword}') or contains(DepartureStopNameZh, '${keyword}') or contains(DestinationStopNameZh, '${keyword}')`,
  };
  const response = await getBusRouteInfo(city, query);
  return response;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    openGPS: (state, action) => {
      state.isOpenGPS = action.payload;
    },
    clearSearch: (state, action) => {
      state.cityBusList = [];
    },
    saveHistory: (state, { payload }) => {
      const index = state.historyResult.findIndex((item) => item.RouteUID === payload.RouteUID);
      if (index === -1) {
        state.historyResult.unshift(payload);
      }
      if (state.historyResult.length > 6) {
        state.historyResult.pop();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGeolocation.pending, (state, action) => {
      state.gpsStatus = '定位中...';
      state.geoLoading = true;
    });
    builder.addCase(getGeolocation.fulfilled, (state, { payload }) => {
      const { position } = payload;
      state.gpsStatus = null;
      state.currentPosition = position;
      state.geoLoading = false;
    });
    builder.addCase(getGeolocation.rejected, (state, action) => {
      state.gpsStatus = action.payload;
      state.geoLoading = false;
    });
    builder.addCase(searchCityBusByKeyword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchCityBusByKeyword.fulfilled, (state, action) => {
      state.cityBusList = action.payload;
      state.loading = false;
    });
    builder.addCase(searchCityBusByKeyword.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { openGPS, clearSearch, saveHistory } = searchSlice.actions;

export default searchSlice.reducer;
