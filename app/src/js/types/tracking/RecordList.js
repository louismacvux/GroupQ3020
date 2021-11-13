class RecordList {
     constructor() {
          this.records = [];
     }
     addRecord(time, data) {
          if (time !== undefined && time !== null && data !== undefined && data !== null) {
               this.records.push({
                    time,
                    data
               });
          }
     }
     aggregateByTime(bucketDuration, startTime, endTime) {
          startTime = startTime ? new Date(startTime).getTime() : null;
          endTime = endTime ? new Date(endTime).getTime() : null;

          this.records.sort((a, b) => a.time < b.time ? -1 : 1);

          let currentBucketStartTime = startTime;
          let currentBucketEndTime = startTime + bucketDuration;
          let currentBucket = 0;
          let result = [];

          // For each record
          for (let i in this.records) {
               let timeOfRecord = this.records[i].time.getTime();
               // If record lies between the start time and end time
               if ((timeOfRecord >= startTime || !startTime) && (timeOfRecord < endTime || !endTime)) {
                    // If record should go in the next bucket
                    if (timeOfRecord >= currentBucketEndTime) {
                         // Increment bucket and update boundaries
                         if (result[currentBucket]) {
                              currentBucket++;
                         }
                         currentBucketStartTime = startTime + Math.floor((timeOfRecord - startTime) / bucketDuration) * bucketDuration;
                         currentBucketEndTime = currentBucketStartTime + bucketDuration;
                    }
                    if (!result[currentBucket]) {
                         result[currentBucket] = { time: new Date(currentBucketStartTime), end: new Date(currentBucketEndTime), data: 0 };
                    }
                    // Add record value to current bucket sum
                    result[currentBucket].data += this.records[i].data;
               }
          }

          return result;
     }
     computeTotalOverPeriod(startDate, endDate) {
          let bucketDuration = endDate.getTime() - startDate.getTime();
          let aggregated = this.aggregateByTime(bucketDuration, startDate, endDate);
          return aggregated[0].data;
     }
}

export default RecordList;