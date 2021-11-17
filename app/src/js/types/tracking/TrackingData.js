import RecordList from "./RecordList";
import GoalList from "./GoalList";

// The purpose of this class is to bind tracked data with goals

class TrackingData {
     constructor({ name, displayFormatter }) {
          this.name = name;
          this.records = new RecordList();
          this.goals = new GoalList(this);
          this.displayFormatter = displayFormatter || ((recordData) => recordData);
     }
     addRecord(time, data) {
          this.records.addRecord(time, data);
     }
     setGoal(period, type, value) {
          this.goals.setGoal(period, type, value);
     }
     copy() {
          let copy = new TrackingData(this.name);
          copy.records = this.records;
          copy.goals = this.goals;
          return copy;
     }
}

export default TrackingData;