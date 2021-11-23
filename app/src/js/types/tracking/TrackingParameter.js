import RecordList from "./RecordList";
import GoalList from "./GoalList";
import { reduce } from "lodash";

class TrackingParameter {

     #name
     #records
     #goals
     #displayFormatter
     #parent

     constructor({ name, displayFormatter, aggregator }) {
          this.#name = name;
          this.#records = new RecordList({ of: this, hasObjectValues: false });
          this.#goals = new GoalList({ of: this });
          this.#displayFormatter = displayFormatter || ((recordData) => recordData);
     }

     addRecord(recordParams) {
          this.#records.insert(recordParams);
          this.parent.clearCache();
     }

     addGoal(goalParams) {
          this.#goals.insert(goalParams);
     }

     copy() {
          let copy = new TrackingParameter(this.name);
          copy.records = this.records;
          copy.goals = this.goals;
          return copy;
     }

     get name() {
          return this.#name;
     }

     set name(newName) {
          this.#name = newName;
     }

     get records() {
          return this.#records;
     }

     set records(newRecords) {
          this.#records = newRecords;
     }

     get goals() {
          return this.#goals;
     }

     get parent() {
          return this.#parent;
     }

     set parent(newParent) {
          this.#parent = newParent;
     }

     set goals(newGoals) {
          this.#goals = newGoals;
     }

     set displayFormatter(newDisplayFormatter) {
          this.#displayFormatter = newDisplayFormatter;
     }

     get displayFormatter() {
          return this.#displayFormatter;
     }

}

export default TrackingParameter;