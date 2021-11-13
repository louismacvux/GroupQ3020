import TrackingData from "./tracking/TrackingData";
import TrackingDataGroup from "./tracking/TrackingDataGroup";

import { normal, uniform } from "jstat";
import randomInRange from "../utils/randomInRange";
const { round } = Math;

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
          const DAY_COUNT = 28;
          const HOUR_DURATION = 1000 * 60 * 60;
          const DAY_DURATION = HOUR_DURATION * 24;
          const ACTIVITY_PERIOD = { START: 9, END: 22, PEAK: 14, SPREAD: 3 };

          let stepsPerDay = { min: 4000, max: 8000 };
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

                    let maximumSteps = stepsPerDay.min + (stepsPerDay.max - stepsPerDay.min) * (3 / 2) * uniform.sample(0, 0.125);
                    let normalMagnitude = normal.pdf(hour, ACTIVITY_PERIOD.PEAK, ACTIVITY_PERIOD.SPREAD);
                    let steps = round(maximumSteps * normalMagnitude);

                    userData.getRecords("steps").addRecord(new Date(timeOfRecord), steps);
               }
          }

          // Generate step goals
          let generateRandomStepGoal = (type) => {
               const daysInPeriod = { "daily": 1, "weekly": 7, "monthly": 28 };
               if (daysInPeriod[type]) {
                    let goalValue = round(randomInRange(stepsPerDay.min, stepsPerDay.max) * daysInPeriod[type]);
                    goalValue = round(goalValue / 500) * 500;
                    userData.getTrackingData("steps").setGoal(type, "minimum", goalValue);
               }
          }

          generateRandomStepGoal("daily");
          generateRandomStepGoal("weekly");
          generateRandomStepGoal("monthly");

          return userData;
     }

}

export default UserData;