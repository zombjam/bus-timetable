import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import geolocation from './geolocation';

const initialState = {
  defaultPosition: [24.122771, 120.65154],
  currentPosition: [],
  isOpenGPS: false,
  gpsStatus: null,
  geoLoading: null,
};

export const getGeolocation = createAsyncThunk('search/geolocation', async (isShowMsg, thunkAPI) => {
  try {
    const position = await geolocation();
    return { isShowMsg, position };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    openGPS: (state, action) => {
      state.isOpenGPS = action.payload;
    },
  },
  extraReducers: builder => {
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
  },
});

export const { openGPS } = searchSlice.actions;

export default searchSlice.reducer;
