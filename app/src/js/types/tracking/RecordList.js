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
          let result = [];
          let currentBucketStartTime = startTime - bucketDuration;
          let currentBucketEndTime = startTime;
          let currentBucket = -1;

          this.records.sort((a, b) => a.time < b.time ? -1 : 1);

          for (let i in this.records) {
               let timeOfRecord = this.records[i].time.getTime();
               if ((timeOfRecord >= startTime || !startTime) && (timeOfRecord < endTime || !endTime)) {
                    if (timeOfRecord >= currentBucketEndTime) {
                         currentBucket++;
                         currentBucketStartTime += bucketDuration;
                         currentBucketEndTime += bucketDuration;
                         result.push({ time: currentBucketStartTime, data: 0 });
                    }
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