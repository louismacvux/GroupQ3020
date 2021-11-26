import TrackingParameter from "./tracking/TrackingParameter";
import VirtualTrackingParameter from "./tracking/VirtualTrackingParameter";
import TrackingParameterGroup from "./tracking/TrackingParameterGroup";
import UserGenerator from "./UserGenerator";

import { get24HourTimeFromMidnightHourOffset } from "../utils/time";

const unitFormatter = (amount, unit, precision) => `${Number(amount).toFixed(precision)} ${unit}`;

const trackingParameters = {
     steps: new TrackingParameter({ name: "Steps" }),
     distance: new TrackingParameter({ name: "Distance", displayFormatter: (distance) => unitFormatter(distance, "km", 1) }),
     protein: new TrackingParameter({ name: "Protein", displayFormatter: (protein) => unitFormatter(protein, "g", 1) }),
     carbohydrates: new TrackingParameter({ name: "Carbohydrates", displayFormatter: (carbohydrates) => unitFormatter(carbohydrates, "g", 1) }),
     fat: new TrackingParameter({ name: "Fat", displayFormatter: (fat) => unitFormatter(fat, "g", 1) }),
     wakeTime: new TrackingParameter({ name: "Wake Time", displayFormatter: get24HourTimeFromMidnightHourOffset }),
     bedTime: new TrackingParameter({ name: "Bed Time", displayFormatter: get24HourTimeFromMidnightHourOffset }),
}

class User {

     #name
     #trackingParameters

     constructor() {
          this.#trackingParameters = new TrackingParameterGroup(
               {
                    name: "Root",
                    children: {
                         exercise: new TrackingParameterGroup(
                              {
                                   name: "Exercise",
                                   children: {
                                        steps: trackingParameters.steps,
                                        distance: trackingParameters.distance,
                                   }
                              }),
                         diet: new TrackingParameterGroup(
                              {
                                   name: "Diet",
                                   children: {
                                        energy: new VirtualTrackingParameter(
                                             {
                                                  name: "Energy",
                                                  children: {
                                                       protein: trackingParameters.protein,
                                                       carbohydrates: trackingParameters.carbohydrates,
                                                       fat: trackingParameters.fat
                                                  },
                                                  computeFromChildren: ({ protein, carbohydrates, fat }) => {
                                                       let calories = (protein * 4) + (carbohydrates * 4) + (fat * 9);
                                                       return calories;
                                                  },
                                                  displayFormatter: (calories) => unitFormatter(calories, "cal", 1),
                                             })
                                   }
                              }),
                         sleep: new TrackingParameterGroup(
                              {
                                   name: "Sleep",
                                   children: {
                                        duration: new VirtualTrackingParameter(
                                             {
                                                  name: "Duration",
                                                  children: {
                                                       wakeTime: trackingParameters.wakeTime,
                                                       bedTime: trackingParameters.bedTime,
                                                  },
                                                  computeFromChildren: ({ wakeTime, bedTime }) => {
                                                       let duration = wakeTime - bedTime;
                                                       return duration;
                                                  },
                                                  displayFormatter: (hours) => unitFormatter(hours, "Hrs", 1)
                                             })
                                   }
                              }),
                    },
               });
     }

     getTrackingParameterByName(parameterName) {
          return this.#trackingParameters.getDescendentByName(parameterName);
     }

     getGoals() {
          return this.trackingParameters.goals;
     }

     static generateRandomUser() {
          let userGenerator = new UserGenerator();
          return userGenerator.generate();
     }

     get name() {
          return this.#name;
     }

     set name(newName) {
          return this.#name;
     }

     get trackingParameters() {
          return this.#trackingParameters;
     }

     set trackingParameters(newTrackingParameters) {
          this.#trackingParameters = newTrackingParameters;
     }

}

export default User;