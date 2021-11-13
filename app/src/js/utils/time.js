export const MINUTE_DURATION = 1000 * 60;
export const HOUR_DURATION = MINUTE_DURATION * 60;
export const DAY_DURATION = HOUR_DURATION * 24;
export const daysInMonth = (date) => {
     return new Date(date.getFullYear(),
          date.getMonth() + 1,
          0).getDate();
}