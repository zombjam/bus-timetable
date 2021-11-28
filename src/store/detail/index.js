import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  busInfo: null,
  busRouteType: null,
};

export const detailSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setBusInfo: (state, { payload }) => {
      const { city, routeName, busRouteType } = payload;
      state.busRouteType = busRouteType;
      state.busInfo = { city, routeName, busRouteType };
    },
  },
  extraReducers: builder => {},
});

export const { setBusInfo } = detailSlice.actions;

export default detailSlice.reducer;
