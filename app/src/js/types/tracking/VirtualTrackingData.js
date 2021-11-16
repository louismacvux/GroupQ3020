import TrackingData from "./TrackingData";

class VirtualTrackingData {
     constructor({ name, children, computeFromChildren }) {
          this.name = name;
          this.children = children;
          this.computeFromChildren = computeFromChildren;
     }
     getTrackingData(name) {
          let result;
          let keys = Object.keys(this.children);

          for (let i = 0; i < keys.length && !result; i++) {
               let key = keys[i];
               let groupMember = this.children[key];
               if ((groupMember instanceof TrackingData || groupMember instanceof VirtualTrackingData) && groupMember.name.toLowerCase() === name.toLowerCase()) {
                    result = groupMember;
               }
               else if (groupMember instanceof VirtualTrackingData) {
                    result = groupMember.getTrackingData(name);
               }
          }

          return result;
     }
}

export default VirtualTrackingData;