import RecordList from "./RecordList";
import GoalList from "./GoalList";
import Aggregator from "./Aggregator";

class TrackingParameter {

     #name
     #records
     #goals
     #displayFormatter
     #parent
     #periodAggregators

     constructor({ name, records, goals, displayFormatter, periodAggregators }) {
          this.#name = name;
          this.#records = records || new RecordList({ of: this, hasObjectValues: false });
          this.#goals = goals || new GoalList({ of: this });
          this.#displayFormatter = displayFormatter || ((recordData) => recordData);
          this.#periodAggregators = periodAggregators || { "daily": Aggregator.total, "weekly": Aggregator.total, "monthly": Aggregator.total };
     }

     addRecord(recordParams) {
          this.#records.insert(recordParams);
          this.parent.clearCache();
     }

     addGoal(goalParams) {
          this.#goals.insert(goalParams);
     }

     getAggregator(period) {
          return this.#periodAggregators[period];
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

     copy() {
          return new TrackingParameter({
               name: this.#name,
               records: this.#records,
               goals: this.#goals,
               displayFormatter: this.#displayFormatter,
          });
     }

}

export default TrackingParameter;