import clearImg from '../assets/images/clear.jpg';

import { backgroundList } from '../constants';

export const getBackgroundImg = (icon?: string) => {
  const key = icon ? `${icon.slice(0, 2)}d` : '01d';
  const currentImg = backgroundList.find((item) => item.icon === key);

  return currentImg ? currentImg.img : { backgroundImage: `url(${clearImg})` };
};

export const generateKey = (latitude: number, longitude: number, id: string) =>
  `${latitude.toFixed(2)},${longitude.toFixed(2)}${id}`;

export const getTimeWithOffset = (time: number, offset: number) => {
  const dt = new Date((time + offset) * 1000);
  return dt
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    })
    .slice(0, 5);
};

export const getTime = (value: string) =>
  new Date(value).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
