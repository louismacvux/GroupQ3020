import TrackingData from "./TrackingData";

class TrackingDataGroup {

     constructor(trackingDataMap) {
          this.group = trackingDataMap;
     }

     getTrackingData(name) {
          let result;
          let keys = Object.keys(this.group);

          for (let i = 0; i < keys.length && !result; i++) {
               let key = keys[i];
               let groupMember = this.group[key];
               if (groupMember instanceof TrackingData && groupMember.name.toLowerCase() === name.toLowerCase()) {
                    result = groupMember;
               }
               else if (groupMember instanceof TrackingDataGroup) {
                    result = groupMember.getTrackingData(name);
               }
          }

          return result;
     }

     getGoals() {
          let result = {};
          let keys = Object.keys(this.group);

          for (let i = 0; i < keys.length; i++) {
               let key = keys[i];
               let groupMember = this.group[key];
               if (groupMember instanceof TrackingData) {
                    result = { ...result, [key]: groupMember.goals };
               }
               else if (groupMember instanceof TrackingDataGroup) {
                    result = { ...result, [key]: groupMember.getGoals() };
               }
          }

          return result;
     }

}

export default TrackingDataGroup;