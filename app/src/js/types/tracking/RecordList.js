import Record from "./Record";

class RecordList {

     #list

     constructor(records) {
          this.#list = records || [];
     }

     addRecord({ startTime, endTime, value }) {
          if (startTime && value != null) {
               let record = new Record({ startTime, endTime, value })
               this.list.push(record);
          }
     }

     aggregateByTime(bucketDuration, periodStartTime, periodEndTime) {
          periodStartTime = periodStartTime ? new Date(periodStartTime).getTime() : null;
          periodEndTime = periodEndTime ? new Date(periodEndTime).getTime() : null;

          this.list.sort((a, b) => a.startTime < b.startTime ? -1 : 1);

          let currentBucketStartTime = periodStartTime;
          let currentBucketEndTime = periodStartTime + bucketDuration;
          let currentBucket = 0;
          let result = [];

          // For each record
          for (let i in this.list) {
               let timeOfRecord = this.list[i].startTime.getTime();
               // If record lies between the start time and end time
               if ((timeOfRecord >= periodStartTime || !periodStartTime) && (timeOfRecord < periodEndTime || !periodEndTime)) {
                    // If record should go in the next bucket
                    if (timeOfRecord >= currentBucketEndTime) {
                         // Increment bucket and update boundaries
                         if (result[currentBucket]) {
                              currentBucket++;
                         }
                         currentBucketStartTime = periodStartTime + Math.floor((timeOfRecord - periodStartTime) / bucketDuration) * bucketDuration;
                         currentBucketEndTime = currentBucketStartTime + bucketDuration;
                    }
                    // Initialize bucket if it does not exist
                    if (!result[currentBucket]) {
                         result[currentBucket] = new Record({
                              startTime: new Date(currentBucketStartTime),
                              endTime: new Date(currentBucketEndTime),
                              value: 0
                         });
                    }
                    // Add record value to current bucket sum
                    result[currentBucket].value += this.list[i].value;
               }
          }

          return result;
     }

     computeTotalOverPeriod(startDate, endDate) {
          let bucketDuration = endDate.getTime() - startDate.getTime();
          let aggregated = this.aggregateByTime(bucketDuration, startDate, endDate);
          if (aggregated.length > 0) {
               return aggregated[0].value;
          }
          else {
               return 0;
          }
     }

     get list() {
          return this.#list;
     }

     set list(newList) {
          this.#list = newList;
     }
}

export default RecordList;