class Record {

     #startTime
     #endTime
     #value

     constructor(args) {
          this.#startTime = args.startTime;
          this.#endTime = args.endTime;
          this.#value = args.value;
     }

     get value() {
          return this.#value;
     }

     set value(newValue) {
          this.#value = newValue;
     }

     get startTime() {
          return this.#startTime;
     }

     set startTime(newStartTime) {
          this.#startTime = newStartTime;
     }

     get endTime() {
          return this.#endTime;
     }

     set endTime(newEndTime) {
          this.#endTime = newEndTime;
     }
}

export default Record;