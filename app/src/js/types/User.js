import TrackingParameter from "./tracking/TrackingParameter";
import VirtualTrackingParameter from "./tracking/VirtualTrackingParameter";
import TrackingParameterGroup from "./tracking/TrackingParameterGroup";

import { normal, uniform } from "jstat";
import { HOUR_DURATION, DAY_DURATION, get24HourTimeFromMidnightHourOffset } from "../utils/time";

const { round, sqrt, abs } = Math;

const randomGenerationParams = {
     DAY_COUNT: 28,
     ACTIVITY_PERIOD: { START: 9, END: 22, PEAK: 14, SPREAD: 3 },
     STEPS_PER_DAY: { MIN: 4000, MAX: 8000 },
     SLEEP: { MIN_BEDTIME_OFFSET: -3, MAX_BEDTIME_OFFSET: 1, MIN_WAKETIME_OFFSET: 6, MAX_WAKETIME_OFFSET: 10 },
}

const trackingParameters = {
     steps: new TrackingParameter({ name: "Steps" }),
     distance: new TrackingParameter({ name: "Distance" }),
     protein: new TrackingParameter({ name: "Protein", displayFormatter: (protein) => `${protein}g` }),
     carbohydrates: new TrackingParameter({ name: "Carbohydrates", displayFormatter: (carbohydrates) => `${carbohydrates}g` }),
     fat: new TrackingParameter({ name: "Fat", displayFormatter: (fat) => `${fat}g` }),
     wakeTime: new TrackingParameter({ name: "Wake Time", displayFormtter: get24HourTimeFromMidnightHourOffset }),
     bedTime: new TrackingParameter({ name: "Bed Time", displayFormatter: get24HourTimeFromMidnightHourOffset }),
}

class User {

     #name
     #trackingParameters

     constructor() {
          this.#trackingParameters = new TrackingParameterGroup(
               {
                    steps: trackingParameters.steps,
                    distance: trackingParameters.distance,
                    diet: new TrackingParameterGroup(
                         {
                              calories: new VirtualTrackingParameter(
                                   {
                                        name: "Calories",
                                        children: {
                                             protein: trackingParameters.protein,
                                             carbohydrates: trackingParameters.protein,
                                             fat: trackingParameters.fat
                                        },
                                        computeFromChildren: ({ protein, carbohydrates, fat }) => {
                                             let calories = (protein * 4) + (carbohydrates * 4) + (fat * 9);
                                             return calories;
                                        }
                                   })
                         }),
                    sleep: new TrackingParameterGroup(
                         {
                              duration: new VirtualTrackingParameter(
                                   {
                                        name: "Duration",
                                        children: {
                                             wakeTime: trackingParameters.wakeTime,
                                             bedTime: trackingParameters.bedTime,
                                        },
                                        computeFromChildren: ({ wakeTime, bedTime }) => {
                                             let duration = wakeTime - bedTime;
                                             return duration;
                                        },
                                        displayFormatter: (hours) => `${round(hours * 10) / 10} Hrs`
                                   })
                         }),
               });
     }

     getTrackingParameterByName(parameterName) {
          return this.#trackingParameters.getTrackingData(parameterName);
     }

     static generateRandomUser() {
          const {
               DAY_COUNT, // The number of days to generate records for
               ACTIVITY_PERIOD, // Object specifying the hours when activity starts, peaks, ends, and how spread it is
               STEPS_PER_DAY, // Object specifying the minimum and maximum number of steps the user can have in a day
               SLEEP
          } = randomGenerationParams;

          let userData = new User();

          let date = new Date(Date.now() - DAY_COUNT * DAY_DURATION);
          date.setHours(0, 0, 0, 0, 0);

          let generateSteps = (date, hour) => {
               let timeOfRecord = date.getTime() + hour * HOUR_DURATION;

               // Step count throughout follows a normal distribution + some noise
               let steps = round(
                    uniform.sample(STEPS_PER_DAY.MIN, STEPS_PER_DAY.MAX) *
                    normal.pdf(hour, ACTIVITY_PERIOD.PEAK, ACTIVITY_PERIOD.SPREAD)
               )

               userData.getTrackingParameterByName("steps").records.addRecord({ startTime: new Date(timeOfRecord), value: steps });
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

               userData.getTrackingParameterByName("Bed Time").records.addRecord({ startTime: new Date(date), value: bedTimeOffset });
               userData.getTrackingParameterByName("Wake Time").records.addRecord({ startTime: new Date(date), value: wakeTimeOffset });
          }

          // For each day in range
          for (let i = 0; i <= DAY_COUNT; i++) {

               // For each hour in daily activity period
               for (let hour = ACTIVITY_PERIOD.START; hour < ACTIVITY_PERIOD.END; hour++) {
                    let hourAsDate = new Date(date);
                    hourAsDate.setHours(hour);
                    if (hourAsDate.getTime() <= Date.now()) {
                         generateSteps(date, hour);
                    }
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
                    userData.getTrackingParameterByName("steps").goals.addGoal(type, "minimum", goalValue);
               }
          }

          generateRandomStepGoal("daily");
          generateRandomStepGoal("weekly");
          generateRandomStepGoal("monthly");

          return userData;
     }

     get name() {
          return this.#name;
     }

     set name(newName) {
          return this.#name;
     }

     get trackingParameters() {
          return this.#trackingParameters;
     }

     set trackingParameters(newTrackingParameters) {
          this.#trackingParameters = newTrackingParameters;
     }

}

export default User;