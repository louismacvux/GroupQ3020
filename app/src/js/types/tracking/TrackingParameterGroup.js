import Record from "./Record";
import VirtualTrackingParameter from "./VirtualTrackingParameter";
import RecordList from "./RecordList";
import TrackingParameterParent from "./TrackingParameterParent";
import Aggregator from "./Aggregator";

class TrackingParameterGroup extends TrackingParameterParent {

     #name
     #parent
     #displayFormatter
     #periodAggregators

     constructor({ name, children, displayFormatter, periodAggregators }) {
          super(children);
          this.#name = name;
          this.#displayFormatter = displayFormatter;
          this.#periodAggregators = periodAggregators || { "daily": Aggregator.total, "weekly": Aggregator.average, "monthly": Aggregator.average };
     }

     addRecord(recordData) {
          let { startTime, endTime, values } = recordData;
          let parameterNameList = Object.keys(values);
          // Add a new record for each child, using the appropriate value if one was provided.
          for (let childParameterName of parameterNameList) {
               let childParameter = this.getDescendentByName(childParameterName);
               // If tracking parameter is non-virtual
               if (childParameter && !(childParameter instanceof VirtualTrackingParameter)) {
                    let recordValue = 0;
                    if (values[childParameterName]) {
                         recordValue = values[childParameterName];
                    }
                    childParameter.records.addRecord({ startTime, endTime, value: recordValue });
               }
          }
     }

     get records() {
          if (super.cache && super.cache.records) {
               return super.cache.records;
          }
          else {
               let groupParameters = this.getDescendents();

               let combinedRecords = [];
               let recordCount = groupParameters[0].records.list.length;

               for (let i = 0; i < recordCount; i++) {
                    // Initialize record constructor arguments
                    let recordDetails = {
                         startTime: groupParameters[0].records.list[i].startTime,
                         endTime: groupParameters[0].records.list[i].endTime,
                         value: {}
                    };
                    // Add the value from the i'th record of each child
                    for (let parameter of groupParameters) {
                         let parameterName = parameter.name.toLowerCase();
                         let parameterValue = parameter.records.list[i].value;
                         recordDetails.value[parameterName] = parameterValue;
                    }
                    let record = new Record(recordDetails);
                    combinedRecords.push(record);
               }
               let recordList = new RecordList({ records: combinedRecords, of: this, hasObjectValues: true });
               super.cache = { ...super.cache, records: recordList };
               return recordList;
          }
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

     get parent() {
          return this.#parent;
     }

     set parent(newParent) {
          this.#parent = newParent;
     }

     get displayFormatter() {
          return this.#displayFormatter;
     }

     set displayFormatter(newDisplayFormatter) {
          this.#displayFormatter = newDisplayFormatter;
     }
}

export default TrackingParameterGroup;