import TrackingData from "./tracking/TrackingData";
import TrackingDataGroup from "./tracking/TrackingDataGroup";

import { normal, uniform } from "jstat";
import { HOUR_DURATION, DAY_DURATION } from "../utils/time";

const { round } = Math;

const generatedDataParams = {
     DAY_COUNT: 28,
     ACTIVITY_PERIOD: { START: 9, END: 22, PEAK: 14, SPREAD: 3 },
     STEPS_PER_DAY: { MIN: 4000, MAX: 8000 },
}

class UserData {

     constructor() {
          this.trackingData = new TrackingDataGroup({
               steps: new TrackingData("Steps"),
               distance: new TrackingData("Distance"),
               diet: new TrackingDataGroup({
                    calories: new TrackingData("Calories"),
                    protein: new TrackingData("Protein"),
                    fat: new TrackingData("Fat"),
                    carbohydrates: new TrackingData("Carbohydrates"),
               }),
               sleep: new TrackingData("Sleep")
          });
     }

     getTrackingData(parameterName) {
          return this.trackingData.getTrackingData(parameterName);
     }

     getRecords(parameterName) {
          return this.getTrackingData(parameterName).records;
     }

     static generateUserData() {
          const {
               DAY_COUNT, // The number of days to generate records for
               ACTIVITY_PERIOD, // Object specifying the hours when activity starts, peaks, ends, and how spread it is
               STEPS_PER_DAY, // Object specifying the minimum and maximum number of steps the user can have in a day
          } = generatedDataParams;

          let userData = new UserData();

          let date = new Date(Date.now() - DAY_COUNT * DAY_DURATION);
          date.setHours(0, 0, 0, 0, 0);
          date = date.getTime();

          // For each day in range
          for (let i = 0; i <= DAY_COUNT; i++, date += DAY_DURATION) {

               // For each hour in day
               for (let hour = ACTIVITY_PERIOD.START; hour < ACTIVITY_PERIOD.END; hour++) {
                    let timeOfRecord = date + hour * HOUR_DURATION;
                    if (timeOfRecord > Date.now()) {
                         break;
                    }

                    let steps = round(
                         uniform.sample(STEPS_PER_DAY.MIN, STEPS_PER_DAY.MAX) *
                         normal.pdf(hour, ACTIVITY_PERIOD.PEAK, ACTIVITY_PERIOD.SPREAD)
                    )

                    userData.getRecords("steps").addRecord(new Date(timeOfRecord), steps);
               }
          }

          // Generate step goals
          let generateRandomStepGoal = (type) => {
               const daysInPeriod = { "daily": 1, "weekly": 7, "monthly": 28 };
               if (daysInPeriod[type]) {
                    let goalValue = round(uniform.sample(STEPS_PER_DAY.MIN, STEPS_PER_DAY.MAX) * daysInPeriod[type]);
                    goalValue = round(goalValue / 500) * 500;
                    userData.getTrackingData("steps").setGoal(type, "MINimum", goalValue);
               }
          }

          generateRandomStepGoal("daily");
          generateRandomStepGoal("weekly");
          generateRandomStepGoal("monthly");

          return userData;
     }

}

export default UserData;