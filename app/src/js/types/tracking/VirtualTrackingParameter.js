import RecordList from "./RecordList";
import TrackingParameterGroup from "./TrackingParameterGroup";
import GoalList from "./GoalList";
import TrackingParameterParent from "./TrackingParameterParent";

class VirtualTrackingParameter extends TrackingParameterParent {

     #name
     #parent
     #children
     #computeFromChildren
     #displayFormatter
     #goals

     constructor({ name, children, computeFromChildren, displayFormatter }) {
          super(children);
          this.#name = name;
          this.#computeFromChildren = computeFromChildren;
          this.#displayFormatter = displayFormatter || ((recordData) => recordData);
          this.#goals = new GoalList({ of: this });
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

               // Add the value from each of the parallel records to the input object
               for (let key of keys) {
                    inputForIteration[key] = childRecordLists[key].list[i].value;
               }

               virtualRecordList.addRecord({
                    startTime: childRecordLists[keys[0]].list[i].startTime,
                    value: this.computeFromChildren(inputForIteration)
               })
          }

          return virtualRecordList;
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
          let goals = { type: "virtual", goals: this.#goals, children: {} };
          for (let parameterKey in this.group) {
               goals.children[parameterKey] = super.children[parameterKey].goals;
          }
          return goals;
     }

}

export default VirtualTrackingParameter;