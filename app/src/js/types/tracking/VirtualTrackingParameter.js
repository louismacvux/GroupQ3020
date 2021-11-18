import Record from "./Record";
import RecordList from "./RecordList";
import TrackingParameter from "./TrackingParameter";
import TrackingParameterGroup from "./TrackingParameterGroup";

class VirtualTrackingParameter {

     #name
     #children
     #computeFromChildren
     #displayFormatter

     constructor({ name, children, computeFromChildren, displayFormatter }) {
          this.#name = name;
          this.#children = children;
          this.#computeFromChildren = computeFromChildren;
          this.#displayFormatter = displayFormatter || ((recordData) => recordData);
     }

     getTrackingData(name) {
          let result;
          let keys = Object.keys(this.children);

          for (let i = 0; i < keys.length && !result; i++) {
               let key = keys[i];
               let child = this.children[key];
               if ((child instanceof TrackingParameter || child instanceof VirtualTrackingParameter) && child.name.toLowerCase() === name.toLowerCase()) {
                    result = child;
               }
               else if (child instanceof VirtualTrackingParameter || child instanceof TrackingParameterGroup) {
                    result = child.getTrackingData(name);
               }
          }

          return result;
     }

     get records() {
          let recordCount = 0;
          let keys = Object.keys(this.children);
          let childRecordLists = {};
          let virtualRecordList = new RecordList();

          // Add RecordLists from each child to childRecords
          for (let key of keys) {
               childRecordLists[key] = this.children[key].records;
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

     get children() {
          return this.#children;
     }

     get computeFromChildren() {
          return this.#computeFromChildren;
     }

     get displayFormatter() {
          return this.#displayFormatter;
     }

}

export default VirtualTrackingParameter;