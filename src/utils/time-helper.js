import { format, addSeconds } from 'date-fns';

export const getTimeFormat = seconds => {
  if (seconds >= 1800) {
    const now = new Date();
    return format(addSeconds(now, seconds), 'HH:mm');
  }
};
