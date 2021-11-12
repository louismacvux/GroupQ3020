import Goal from "./Goal";

class GoalList {
     constructor(trackingData) {
          this.of = trackingData;
          this.list = {};
     }
     setGoal(period, type, value) {
          if (period === "daily" || period === "weekly" || period === "monthly") {
               if (!this.list[period]) {
                    this.list[period] = {};
               }
               this.list[period] = { ...this.list[type], [type]: new Goal(period, type, value, this.of) };
          }
     }
     getFlattened() {
          let result = [];
          Object.values(this.list).forEach((periodGoals) => {
               result.push(...Object.values(periodGoals));
          })
          return result;
     }
}

export default GoalList;