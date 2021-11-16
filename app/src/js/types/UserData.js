import TrackingData from "./tracking/TrackingData";
import VirtualTrackingData from "./tracking/VirtualTrackingData";
import TrackingDataGroup from "./tracking/TrackingDataGroup";

import { normal, uniform } from "jstat";
import { HOUR_DURATION, DAY_DURATION } from "../utils/time";

const { round, sqrt, abs } = Math;

const generatedDataParams = {
     DAY_COUNT: 28,
     ACTIVITY_PERIOD: { START: 9, END: 22, PEAK: 14, SPREAD: 3 },
     STEPS_PER_DAY: { MIN: 4000, MAX: 8000 },
     SLEEP: { MIN_BEDTIME_OFFSET: -3, MAX_BEDTIME_OFFSET: 1, MIN_WAKETIME_OFFSET: 6, MAX_WAKETIME_OFFSET: 10 },
}

class UserData {

     constructor() {
          this.trackingData = new TrackingDataGroup(
               {
                    steps: new TrackingData("Steps"),
                    distance: new TrackingData("Distance"),
                    diet: new TrackingDataGroup(
                         {
                              calories: new VirtualTrackingData(
                                   {
                                        name: "Calories",
                                        children: {
                                             protein: new TrackingData("Protein"),
                                             carbohydrates: new TrackingData("carbohydrates"),
                                             fat: new TrackingData("fat"),
                                        },
                                        computeFromChildren: (proteinValue, carbohydrateValue, fatValue) => {
                                             let calorieValue = (proteinValue * 4) + (carbohydrateValue * 4) + (fatValue * 9);
                                             return calorieValue;
                                        }
                                   })
                         }),
                    sleep: new TrackingDataGroup(
                         {
                              duration: new VirtualTrackingData(
                                   {
                                        name: "Duration",
                                        children: {
                                             wakeTime: new TrackingData("Wake Time"),
                                             bedTime: new TrackingData("Bed Time"),
                                        },
                                        computeFromChildren: (wakeTimeValue, bedTimeValue) => {
                                             let sleepDurationValue = bedTimeValue - wakeTimeValue;
                                             return sleepDurationValue;
                                        }
                                   })
                         }),
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
               SLEEP
          } = generatedDataParams;

          let userData = new UserData();

          let date = new Date(Date.now() - DAY_COUNT * DAY_DURATION);
          date.setHours(0, 0, 0, 0, 0);

          let generateSteps = (date, hour) => {
               let timeOfRecord = date.getTime() + hour * HOUR_DURATION;

               // Step count throughout follows a normal distribution + some noise
               let steps = round(
                    uniform.sample(STEPS_PER_DAY.MIN, STEPS_PER_DAY.MAX) *
                    normal.pdf(hour, ACTIVITY_PERIOD.PEAK, ACTIVITY_PERIOD.SPREAD)
               )

               userData.getRecords("steps").addRecord(new Date(timeOfRecord), steps);
          }

          let generateSleep = (date) => {
               const { MIN_BEDTIME_OFFSET, MAX_BEDTIME_OFFSET, MIN_WAKETIME_OFFSET, MAX_WAKETIME_OFFSET } = SLEEP;
               let bedTimeOffsetMean = (MIN_BEDTIME_OFFSET + MAX_BEDTIME_OFFSET) / 2;
               let wakeTimeOffsetMean = (MIN_WAKETIME_OFFSET + MAX_WAKETIME_OFFSET) / 2;

               // This computes the variance of a normal distribution whose values fall within a specified distance of the mean c% of the time.
               let computeVariance = (mean, distance, c) => {
                    let zScore = -2;
                    let lowerBound = mean - distance;
                    return abs((mean - lowerBound) / zScore);
               }

               let bedTimeOffsetVariance = computeVariance(bedTimeOffsetMean, bedTimeOffsetMean - MIN_BEDTIME_OFFSET, 0.6);
               let wakeTimeOffsetVariance = computeVariance(wakeTimeOffsetMean, wakeTimeOffsetMean - MIN_WAKETIME_OFFSET, 0.6);

               let bedTimeOffset = normal.sample(bedTimeOffsetMean, sqrt(bedTimeOffsetVariance));
               let wakeTimeOffset = normal.sample(wakeTimeOffsetMean, sqrt(wakeTimeOffsetVariance));

               userData.getRecords("Bed Time").addRecord(new Date(date), bedTimeOffset);
               userData.getRecords("Wake Time").addRecord(new Date(date), wakeTimeOffset);
          }

          // For each day in range
          for (let i = 0; i <= DAY_COUNT; i++) {

               // For each hour in day
               for (let hour = ACTIVITY_PERIOD.START; hour < ACTIVITY_PERIOD.END; hour++) {
                    generateSteps(date, hour);
               }

               generateSleep(date);
               date.setDate(date.getDate() + 1);
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