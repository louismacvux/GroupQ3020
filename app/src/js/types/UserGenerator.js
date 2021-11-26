import User from "./User";
import { normal, uniform } from "jstat";
import { DAYS_IN_PERIOD } from "../utils/time";

const { round, sqrt, abs, pow, log10, floor } = Math;

const randomGenerationParams = {
     DAY_COUNT: 28,
     ACTIVITY_PERIOD: { START: 9, END: 22, PEAK: 14, SPREAD: 3 },
     STEPS_PER_DAY: { MIN: 4000, MAX: 8000 },
     DISTANCE_PER_DAY: { MIN: 3, MAX: 12 },
     SLEEP: {
          MIN_BEDTIME_OFFSET_FROM_MIDNIGHT: -3,
          MAX_BEDTIME_OFFSET_FROM_MIDNIGHT: 1,
          MIN_WAKETIME_OFFSET_FROM_MIDNIGHT: 6,
          MAX_WAKETIME_OFFSET_FROM_MIDNIGHT: 10
     },
     DIET: {
          CARBOHYDRATES: { MIN: 2000 * 0.5 / 4, MAX: 3000 * 0.5 / 4 },
          PROTEIN: { MIN: 2000 * 0.25 / 4, MAX: 3000 * 0.25 / 4 },
          FAT: { MIN: 2000 * 0.25 / 9, MAX: 3000 * 0.25 / 9 },
     }
}

const { DAY_COUNT, ACTIVITY_PERIOD, STEPS_PER_DAY, DISTANCE_PER_DAY, SLEEP, DIET } = randomGenerationParams;

class UserGenerator {

     #user;

     generate() {
          this.#user = new User();

          let dateOfRecord = new Date(Date.now());
          dateOfRecord.setDate(dateOfRecord.getDate() - DAY_COUNT);
          dateOfRecord.setHours(0, 0, 0, 0, 0);

          // For each day
          for (let i = 0; i <= DAY_COUNT; i++) {

               // Generate hourly records
               for (let hour = ACTIVITY_PERIOD.START; hour < ACTIVITY_PERIOD.END; hour++) {

                    let hourOfRecord = new Date(dateOfRecord);
                    hourOfRecord.setHours(hour);

                    // if (hourOfRecord.getTime() <= Date.now()) {
                    this.generateNormalActivityRecord("steps", STEPS_PER_DAY, hourOfRecord, 0);
                    this.generateNormalActivityRecord("distance", DISTANCE_PER_DAY, hourOfRecord, 4);
                    // }
               }

               // Generate daily records
               this.generateSleepRecord(dateOfRecord);
               this.generateDietRecord(dateOfRecord);

               // Increment date
               dateOfRecord.setDate(dateOfRecord.getDate() + 1);
          }

          // Generate step goals
          this.addGoal("steps", this.generateStepGoal("daily", "minimum"));
          this.addGoal("steps", this.generateStepGoal("weekly", "minimum"));
          // Generate distance goals
          this.addGoal("distance", { period: "daily", type: "minimum", value: 8 })
          this.addGoal("distance", { period: "weekly", type: "minimum", value: 56 })
          // Generate diet goals
          this.addGoal("energy", { period: "daily", type: "minimum", value: 2500 })
          this.addGoal("protein", { period: "daily", type: "minimum", value: 100 })
          // Generate sleep goals
          this.addGoal("duration", { period: "daily", type: "minimum", value: 8 })

          this.initializeRecordCacheForParameters(["sleep", "diet"]);

          return this.#user;
     }

     addRecord(parameterName, recordParams) {
          this.#user.getTrackingParameterByName(parameterName).records.addRecord(recordParams);
     }

     generateNormalActivityRecord(parameterName, generationOptions, date, precision) {
          let hour = date.getHours();
          let { MIN, MAX } = generationOptions;
          // Step count throughout follows a normal distribution + some noise
          let value = Number(Number(
               uniform.sample(MIN, MAX) *
               normal.pdf(hour, ACTIVITY_PERIOD.PEAK, ACTIVITY_PERIOD.SPREAD)
          ).toFixed(precision));
          this.addRecord(parameterName, { startTime: date, value });
     }

     generateDietRecord(date) {
          let parameterGroupRecordInput = {
               startTime: new Date(date),
               values: {
                    carbohydrates: uniform.sample(DIET.CARBOHYDRATES.MIN, DIET.CARBOHYDRATES.MAX),
                    protein: uniform.sample(DIET.PROTEIN.MIN, DIET.PROTEIN.MAX),
                    fat: uniform.sample(DIET.FAT.MIN, DIET.FAT.MAX),
               }
          }
          this.#user.getTrackingParameterByName("Diet").addRecord(parameterGroupRecordInput);
     }

     generateSleepRecord(date) {
          const {
               MIN_BEDTIME_OFFSET_FROM_MIDNIGHT: MIN_BEDTIME,
               MAX_BEDTIME_OFFSET_FROM_MIDNIGHT: MAX_BEDTIME,
               MIN_WAKETIME_OFFSET_FROM_MIDNIGHT: MIN_WAKETIME,
               MAX_WAKETIME_OFFSET_FROM_MIDNIGHT: MAX_WAKETIME
          } = SLEEP;

          let bedTimeMean = (MIN_BEDTIME + MAX_BEDTIME) / 2;
          let wakeTimeMean = (MIN_WAKETIME + MAX_WAKETIME) / 2;
          let bedTimeVariance = computeVariance(bedTimeMean, bedTimeMean - MIN_BEDTIME, 0.9);
          let wakeTimeVariance = computeVariance(wakeTimeMean, wakeTimeMean - MIN_WAKETIME, 0.9);

          let bedTime = normal.sample(bedTimeMean, sqrt(bedTimeVariance));
          let wakeTime = normal.sample(wakeTimeMean, sqrt(wakeTimeVariance));

          this.#user.getTrackingParameterByName("Bed Time").records.addRecord({ startTime: new Date(date), value: bedTime });
          this.#user.getTrackingParameterByName("Wake Time").records.addRecord({ startTime: new Date(date), value: wakeTime });
     }

     addGoal(parameterName, goalParams) {
          this.#user.getTrackingParameterByName(parameterName).goals.addGoal(goalParams);
     }

     generateStepGoal(period, type) {
          if (DAYS_IN_PERIOD[period]) {
               let stepGoal = round(uniform.sample(STEPS_PER_DAY.MIN, STEPS_PER_DAY.MAX) * DAYS_IN_PERIOD[period]);
               // Round steps down according to the order of magnitude
               let roundToNearest = pow(10, floor(log10(stepGoal))) / 2;
               stepGoal = round(stepGoal / roundToNearest) * roundToNearest;
               return { period, type, value: stepGoal };
          }
     }

     generateDietGoal(period, type) {
          return {}
     }

     initializeRecordCacheForParameters(parameterNames) {
          parameterNames.forEach((parameterName) => this.#user.getTrackingParameterByName(parameterName).records);
     }

}

// This computes the variance of a normal distribution whose values fall within a specified distance of the mean c% of the time.
let computeVariance = (mean, distance, confidence) => {
     let zScore = -2;
     let lowerBound = mean - distance;
     return abs((mean - lowerBound) / zScore);
}

export default UserGenerator;