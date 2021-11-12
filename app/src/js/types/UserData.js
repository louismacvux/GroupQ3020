import TrackingData from "./tracking/TrackingData";
import TrackingDataGroup from "./tracking/TrackingDataGroup";

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
          let stepsPerDay = { min: 2500, max: 7500 };
          let recordFrequency = 1000 * 60 * 60; // 1 Hour
          let recordCount = 24 * 28; // 24 hours * 28 days
          let userData = new UserData();

          // Generate step data
          for (let i = 0; i < recordCount; i++) {
               // Generate records moving backwards, starting from today
               let time = new Date(Date.now() - recordFrequency * i);
               // Random step count between min/max
               let steps = round(randomInRange(stepsPerDay.min, stepsPerDay.max) / 24);

               userData.getRecords("steps").addRecord(time, steps);
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