import ApiCalendar from 'react-google-calendar-api';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const config = {
  clientId: GOOGLE_CLIENT_ID!,
  apiKey: GOOGLE_API_KEY!,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
};

export const apiCalendar = new ApiCalendar(config);
