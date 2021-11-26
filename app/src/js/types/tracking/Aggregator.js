class Aggregator {
     #summaryNameFormatter
     #summaryValueFunction

     constructor(summaryNameFormatter, summaryValueFunction) {
          this.#summaryNameFormatter = summaryNameFormatter;
          this.#summaryValueFunction = summaryValueFunction;
     }

     formatName(parameterName) {
          return this.#summaryNameFormatter(parameterName);
     }

     computeSummary(parameterValues) {
          return this.#summaryValueFunction(parameterValues);
     }

     static total = new Aggregator(
          (parameterName, aggregationPeriod) => `${parameterName}`,
          (parameterValues) => parameterValues.reduce((previous, current) => previous + current),
     )
     static average = new Aggregator(
          (parameterName, aggregationPeriod) => `${aggregationPeriod !== "daily" ? "Average" : ""} ${parameterName}`,
          (parameterValues) => parameterValues.reduce((previous, current) => previous + current) / parameterValues.length,
     )
}

export default Aggregator;

