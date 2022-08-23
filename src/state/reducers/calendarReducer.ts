import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventItemResponse, EventsListResponse } from '@/types/calendarTypes';

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
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setEvents, setAuth } = calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
