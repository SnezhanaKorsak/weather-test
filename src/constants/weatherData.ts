import clearImg from '@/assets/images/clear.jpg';
import stormImg from '@/assets/images/thunderstorm.jpg';
import drizzleImg from '@/assets/images/drizzle.jpg';
import rainImg from '@/assets/images/rain.jpg';
import snowImg from '@/assets/images/snow.jpg';
import fogImg from '@/assets/images/fog.jpg';
import cloudsImg from '@/assets/images/clouds.jpg';

export const backgroundList = [
  { icon: '01d', img: { backgroundImage: `url(${clearImg})` } },
  { icon: '02d', img: { backgroundImage: `url(${cloudsImg})` } },
  { icon: '03d', img: { backgroundImage: `url(${cloudsImg})` } },
  { icon: '04d', img: { backgroundImage: `url(${cloudsImg})` } },
  { icon: '09d', img: { backgroundImage: `url(${drizzleImg})` } },
  { icon: '10d', img: { backgroundImage: `url(${rainImg})` } },
  { icon: '11d', img: { backgroundImage: `url(${stormImg})` } },
  { icon: '13d', img: { backgroundImage: `url(${snowImg})` } },
  { icon: '50d', img: { backgroundImage: `url(${fogImg})` } },
];

export const date = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  day: 'numeric',
  month: 'long',
});

export const SIGN_IN = 'Sing in your account';
export const SYNCHRONIZE = 'Upcoming events';
