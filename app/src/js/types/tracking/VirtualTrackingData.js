import RecordList from "./RecordList";
import TrackingData from "./TrackingData";
import TrackingDataGroup from "./TrackingDataGroup";

class VirtualTrackingData {
     constructor({ name, children, computeFromChildren, displayFormatter }) {
          this.name = name;
          this.children = children;
          this.computeFromChildren = computeFromChildren;
          this.displayFormatter = displayFormatter || ((recordData) => recordData);
     }
     getTrackingData(name) {
          let result;
          let keys = Object.keys(this.children);

          for (let i = 0; i < keys.length && !result; i++) {
               let key = keys[i];
               let child = this.children[key];
               if ((child instanceof TrackingData || child instanceof VirtualTrackingData) && child.name.toLowerCase() === name.toLowerCase()) {
                    result = child;
               }
               else if (child instanceof VirtualTrackingData || child instanceof TrackingDataGroup) {
                    result = child.getTrackingData(name);
               }
          }

          return result;
     }
     get records() {
          let keys = [];
          let childRecords = {};
          let virtualRecords = [];
          for (let key in this.children) {
               keys.push(key);
               childRecords[key] = this.children[key].records;
          }
          for (let i in childRecords[keys[0]].records) {
               let inputForIteration = {};
               for (let key of keys) {
                    inputForIteration[key] = childRecords[key].records[i].data;
               }
               virtualRecords.push({ time: childRecords[keys[0]].records[i].time, data: this.computeFromChildren(inputForIteration) });
          }
          return new RecordList(virtualRecords);
     }
}

export default VirtualTrackingData;