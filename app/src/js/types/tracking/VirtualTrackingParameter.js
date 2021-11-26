import RecordList from "./RecordList";
import TrackingParameterGroup from "./TrackingParameterGroup";
import GoalList from "./GoalList";
import TrackingParameterParent from "./TrackingParameterParent";
import Aggregator from "./Aggregator";

class VirtualTrackingParameter extends TrackingParameterParent {

     #name
     #parent
     #computeFromChildren
     #displayFormatter
     #goals
     #periodAggregators

     constructor({ name, goals, children, computeFromChildren, displayFormatter, periodAggregators }) {
          super(children);
          this.#name = name;
          this.#computeFromChildren = computeFromChildren;
          this.#displayFormatter = displayFormatter || ((recordData) => recordData);
          this.#goals = goals || new GoalList({ of: this });
          this.#periodAggregators = periodAggregators || { "daily": Aggregator.total, "weekly": Aggregator.total, "monthly": Aggregator.total };
     }

     getDescendentByName(name) {
          let result;
          let keys = Object.keys(super.children);

          for (let i = 0; i < keys.length && !result; i++) {
               let key = keys[i];
               let child = super.children[key];
               if (child.name.toLowerCase() === name.toLowerCase()) {
                    result = child;
               }
               else if (child instanceof VirtualTrackingParameter || child instanceof TrackingParameterGroup) {
                    result = child.getDescendentByName(name);
               }
          }

          return result;
     }

     get records() {
          let recordCount = 0;
          let keys = Object.keys(super.children);
          let childRecordLists = {};
          let virtualRecordList = new RecordList({ of: this, hasObjectValues: false });

          // Add RecordLists from each child to childRecords
          for (let key of keys) {
               childRecordLists[key] = super.children[key].records;
          }

          recordCount = childRecordLists[keys[0]].list.length;

          // For each set of parallel records across the child RecordLists
          for (let i = 0; i < recordCount; i++) {
               let inputForIteration = {};
               let startTime;

               // Add the value from each of the parallel records to the input object
               for (let key of keys) {
                    inputForIteration[key] = childRecordLists[key].list[i].value;
                    startTime = startTime || childRecordLists[key].list[i].startTime;
               }

               virtualRecordList.addRecord({
                    startTime,
                    value: this.computeFromChildren(inputForIteration)
               })
          }

          return virtualRecordList;
     }

     getAggregator(period) {
          return this.#periodAggregators[period];
     }

     get name() {
          return this.#name;
     }

     get parent() {
          return this.#parent;
     }

     set parent(newParent) {
          this.#parent = newParent;
     }

     get computeFromChildren() {
          return this.#computeFromChildren;
     }

     get displayFormatter() {
          return this.#displayFormatter;
     }

     get goals() {
          return this.#goals;
     }

     copy() {
          return new VirtualTrackingParameter({
               name: this.#name,
               children: super.children,
               computeFromChildren: this.#computeFromChildren,
               goals: this.#goals,
               displayFormatter: this.#displayFormatter,
          });
     }

}

export default VirtualTrackingParameter;