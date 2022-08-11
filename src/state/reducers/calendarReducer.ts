import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EventItemResponse, EventsListResponse } from '../../api/types';

type InitialState = {
  items: EventItemResponse[];
  isAuth: boolean;
};

const initialState: InitialState = {
  items: [],
  isAuth: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventsListResponse>) => {
      state.items = action.payload.result.items;
    },
  },
});

export const { setEvents } = calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
