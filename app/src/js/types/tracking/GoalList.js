import Goal from "./Goal";

class GoalList {

     #of
     #list

     constructor(goalListParams) {
          let { goals, of } = goalListParams || {};
          this.#list = goals || [];
          this.#of = of;
     }

     addGoal({ period, type, value }) {
          this.#list.push(new Goal(period, type, value, this.of));
     }

     get of() {
          return this.#of;
     }

     get list() {
          return this.#list;
     }

}

export default GoalList;