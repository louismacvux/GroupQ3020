import User from "./User";
import { normal, uniform } from "jstat";
import { DAYS_IN_PERIOD } from "../utils/time";
import FoodData from "../../data/FoodData.json";

const { round, sqrt, abs, pow, log10, floor } = Math;

const randomGenerationParams = {
     DAY_COUNT: 28,
     ACTIVITY_PERIOD: { START: 9, END: 22, PEAK: 14, SPREAD: 3 },
     STEPS_PER_DAY: { MIN: 4000, MAX: 8000, ROUND_TO_NEAREST: 500 },
     SLEEP: {
          MIN_BEDTIME_OFFSET_FROM_MIDNIGHT: -3,
          MAX_BEDTIME_OFFSET_FROM_MIDNIGHT: 1,
          MIN_WAKETIME_OFFSET_FROM_MIDNIGHT: 6,
          MAX_WAKETIME_OFFSET_FROM_MIDNIGHT: 10
     }
}

const { DAY_COUNT, ACTIVITY_PERIOD, STEPS_PER_DAY, SLEEP } = randomGenerationParams;

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

                    if (hourOfRecord.getTime() <= Date.now()) {
                         this.generateStepRecord(hourOfRecord);
                         this.generateDietRecord(hourOfRecord);
                    }
               }

               // Generate daily records
               this.generateSleepRecord(dateOfRecord);

               // Increment date
               dateOfRecord.setDate(dateOfRecord.getDate() + 1);
          }


          // Generate step goals
          this.generateStepGoal("daily", "minimum");
          this.generateStepGoal("weekly", "minimum");
          this.generateStepGoal("monthly", "minimum");

          this.initializeRecordCacheForParameters(["sleep", "diet"]);

          return this.#user;
     }

     generateStepRecord(date) {
          let hour = date.getHours();
          // Step count throughout follows a normal distribution + some noise
          let steps = round(
               uniform.sample(STEPS_PER_DAY.MIN, STEPS_PER_DAY.MAX) *
               normal.pdf(hour, ACTIVITY_PERIOD.PEAK, ACTIVITY_PERIOD.SPREAD)
          )
          this.#user.getTrackingParameterByName("steps").records.addRecord({ startTime: date, value: steps });
     }

     generateStepGoal(period, type) {
          if (DAYS_IN_PERIOD[period]) {
               let stepGoal = round(uniform.sample(STEPS_PER_DAY.MIN, STEPS_PER_DAY.MAX) * DAYS_IN_PERIOD[period]);
               // Round steps down according to the order of magnitude
               let roundToNearest = pow(10, floor(log10(stepGoal))) / 2;
               stepGoal = round(stepGoal / roundToNearest) * roundToNearest;
               this.#user.getTrackingParameterByName("steps").goals.addGoal({ period, type, value: stepGoal });
          }
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

     generateDietRecord(date) {
          let randomIndex = round(uniform.sample(0, FoodData.length - 1));
          let { Energy_kcal: calories, Protein_g: protein, Fat_g: fat, Carb_g: carbohydrates } = FoodData[randomIndex];
          let parameterGroupRecordInput = {
               startTime: date,
               values: { calories, protein, fat, carbohydrates }
          }
          this.#user.getTrackingParameterByName("Diet").addRecord(parameterGroupRecordInput);
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