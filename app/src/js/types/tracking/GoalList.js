import Goal from "./Goal";

class GoalList {

     #of
     #list

     constructor(trackingData) {
          this.#of = trackingData;
          this.#list = {};
     }

     addGoal(period, type, value) {
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

     get of() {
          return this.#of;
     }

     get list() {
          return this.#list;
     }

}

export default GoalList;