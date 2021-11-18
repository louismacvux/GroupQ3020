import RecordList from "./RecordList";
import GoalList from "./GoalList";

// The purpose of this class is to bind tracked data with goals

class TrackingParameter {

     #name
     #records
     #goals
     #displayFormatter

     constructor({ name, displayFormatter }) {
          this.#name = name;
          this.#records = new RecordList();
          this.#goals = new GoalList(this);
          this.#displayFormatter = displayFormatter || ((recordData) => recordData);
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

     get records() {
          return this.#records;
     }

     get goals() {
          return this.#goals;
     }

     get displayFormatter() {
          return this.#displayFormatter;
     }

     set name(newName) {
          this.#name = newName;
     }

     set records(newRecords) {
          this.#records = newRecords;
     }

     set goals(newGoals) {
          this.#goals = newGoals;
     }

     set displayFormatter(newDisplayFormatter) {
          this.#displayFormatter = newDisplayFormatter;
     }
}

export default TrackingParameter;