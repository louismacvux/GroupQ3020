import RecordList from "./RecordList";
import GoalList from "./GoalList";

// The purpose of this class is to bind tracked data with goals

class TrackingData {
     constructor(name) {
          this.name = name;
          this.records = new RecordList();
          this.goals = new GoalList(this);
     }
     addRecord(time, data) {
          this.records.addRecord(time, data);
     }
     setGoal(period, type, value) {
          this.goals.setGoal(period, type, value);
     }
}

export default TrackingData;