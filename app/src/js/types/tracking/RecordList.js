import Record from "./Record";

class RecordList {

     #list
     #of
     #hasObjectValues

     constructor(recordListParams) {
          let { records, of, hasObjectValues } = recordListParams || {}
          this.#list = records || [];
          this.#of = of;
          this.#hasObjectValues = hasObjectValues || false;
     }

     addRecord({ startTime, endTime, value }) {
          if (typeof value === "object") {
               this.#hasObjectValues = true;
          }
          let record = new Record({ startTime, endTime, value })
          this.#list.push(record);
          if (this.#of && this.#of.parent) {
               this.#of.parent.cache.records = null;
          }
     }

     aggregateByInterval(bucketDuration, periodStartTime, periodEndTime, aggregator) {
          periodStartTime = periodStartTime ? new Date(periodStartTime).getTime() : null;
          periodEndTime = periodEndTime ? new Date(periodEndTime).getTime() : null;

          this.list.sort((a, b) => a.startTime < b.startTime ? -1 : 1);

          let buckets = [];
          let bucketIndex = 0;
          let bucketStartTime = periodStartTime;
          let bucketEndTime = periodStartTime + bucketDuration;

          // Copy records into buckets
          for (let i in this.list) {
               let timeOfRecord = this.list[i].startTime.getTime();
               // If record lies between the start time and end time
               if ((timeOfRecord >= periodStartTime || !periodStartTime) && (timeOfRecord < periodEndTime || !periodEndTime)) {
                    // If record should go in the next bucket
                    if (timeOfRecord >= bucketEndTime) {
                         // Increment bucket and update boundaries
                         if (buckets[bucketIndex]) {
                              bucketIndex++;
                         }
                         bucketStartTime = periodStartTime + Math.floor((timeOfRecord - periodStartTime) / bucketDuration) * bucketDuration;
                         bucketEndTime = bucketStartTime + bucketDuration;
                    }

                    if (!buckets[bucketIndex]) {
                         buckets[bucketIndex] = { startTime: new Date(bucketStartTime), endTime: new Date(bucketEndTime), value: [] };
                    }

                    buckets[bucketIndex].value.push(this.list[i]);
               }
          }

          // Summarize buckets
          for (let bucket of buckets) {
               let recordsInBucket = bucket.value;
               let newValue;
               if (this.hasObjectValues) {
                    newValue = {};
                    for (let parameterKey in recordsInBucket[0].value) {
                         let parameterValues = bucket.value.map(record => record.value[parameterKey]);
                         newValue[parameterKey] = aggregator.computeSummary(parameterValues);
                    }
               }
               else {
                    let parameterValues = bucket.value.map(record => record.value);
                    newValue = aggregator.computeSummary(parameterValues);
               }
               bucket.value = newValue;
          }

          return buckets;
     }

     aggregatePeriod(startDate, endDate, aggregator) {
          if (!startDate) {
               startDate = this.getFirstRecord().startTime;
          }
          if (!endDate) {
               endDate = this.getLastRecord().startTime;
          }
          let bucketDuration = endDate.getTime() - startDate.getTime();
          let aggregated = this.aggregateByInterval(bucketDuration, startDate, endDate, aggregator);
          if (aggregated.length > 0) {
               return aggregated[0].value;
          }
          else {
               return 0;
          }
     }

     getFirstRecord() {
          return this.list[0];
     }

     getLastRecord() {
          return this.list[this.list.length - 1];
     }

     get list() {
          return this.#list;
     }

     set list(newList) {
          this.#list = newList;
     }

     get hasObjectValues() {
          return this.#hasObjectValues;
     }
}

export default RecordList;