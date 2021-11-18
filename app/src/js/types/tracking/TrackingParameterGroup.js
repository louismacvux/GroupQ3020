import TrackingParameter from "./TrackingParameter";
import VirtualTrackingParameter from "./VirtualTrackingParameter";

class TrackingParameterGroup {

     #group

     constructor(trackingDataMap) {
          this.#group = trackingDataMap;
     }

     getTrackingData(name) {
          let result;
          let keys = Object.keys(this.group);

          for (let i = 0; i < keys.length && !result; i++) {
               let key = keys[i];
               let groupMember = this.group[key];
               if ((groupMember instanceof TrackingParameter || groupMember instanceof VirtualTrackingParameter) && groupMember.name.toLowerCase() === name.toLowerCase()) {
                    result = groupMember;
               }
               else if (groupMember instanceof VirtualTrackingParameter || groupMember instanceof TrackingParameterGroup) {
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
               if (groupMember instanceof TrackingParameter) {
                    result = { ...result, [key]: groupMember.goals };
               }
               else if (groupMember instanceof TrackingParameterGroup) {
                    result = { ...result, [key]: groupMember.getGoals() };
               }
          }

          return result;
     }

     get group() {
          return this.#group;
     }

     set group(newGroup) {
          this.#group = newGroup;
     }

}

export default TrackingParameterGroup;