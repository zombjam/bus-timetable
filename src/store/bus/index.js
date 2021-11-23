import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setBusData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setBusData } = busSlice.actions;
export default busSlice.reducer;
