class Goal {
     constructor(period, type, value, trackingData) {
          this.period = period;
          this.type = type;
          this.value = value;
          this.of = trackingData;
     }
     computeProgress() {
          let periodStart = new Date(Date.now());
          periodStart.setHours(0, 0, 0, 0);

          if (this.period === "weekly") {
               // Period begins last sunday
               periodStart.setDate(periodStart.getDate() - periodStart.getDay());
          }
          if (this.period === "monthly") {
               // Period begins on the first of the month
               periodStart.setDate(1);
          }

          let periodEnd = new Date(Date.now());

          let current = this.of.records.computeTotalOverPeriod(periodStart, periodEnd);

          return {
               current,
               progress: current / this.value
          }
     }
}

export default Goal;