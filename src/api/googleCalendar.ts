import ApiCalendar from 'react-google-calendar-api';

const GOOGLE_API_KEY = 'AIzaSyAcrQLnJyOqGwuKZ93zyNxlyGfolgXdoQo';
const GOOGLE_CLIENT_ID = '993897519438-6cdi2if333uc1chbe0nhk2rha6rihfp0.apps.googleusercontent.com';

const config = {
  clientId: GOOGLE_CLIENT_ID,
  apiKey: GOOGLE_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
};

export const apiCalendar = new ApiCalendar(config);
