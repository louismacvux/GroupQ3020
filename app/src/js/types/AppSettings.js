import HomeAccordionItem from "../types/HomeAccordionItem";

import Steps from "../../components/pages/Steps/Steps";
import Diet from "../../components/pages/Diet/Diet";
import Distance from "../../components/pages/Distance/Distance";
import Sleep from "../../components/pages/Distance/Distance";
import DistanceAccordionPreview from "../../components/pages/Distance/DistanceAccordionPreview";
import StepsAccordionPreview from "../../components/pages/Steps/StepsAccordionPreview";
import DietAccordionPreview from "../../components/pages/Diet/DietAccordionPreview";
import SleepAccordionPreview from "../../components/pages/Sleep/SleepAccordionPreview";

const homeAccordionItems = [
     new HomeAccordionItem("Steps", Steps, StepsAccordionPreview),
     new HomeAccordionItem("Distance", Distance, DistanceAccordionPreview),
     new HomeAccordionItem("Diet", Diet, DietAccordionPreview),
     new HomeAccordionItem("Sleep", Sleep, SleepAccordionPreview),
]

export const options = {
     theme: ["light", "dark"],
     units: {
          height: ["cm", "in"],
          weight: ["kg", "lb"],
          distance: ["km", "m"],
          energy: ["calories"]
     },
     graphs: {
          stepMode: ["time"],
          caloriesMode: ["goals"]
     },
}

class AppSettings {
     constructor() {
          this.theme = options.theme[0];
          this.startofweek = 0;
          this.units = {
               height: options.units.height[0],
               weight: options.units.weight[0],
               distance: options.units.distance[0],
               energy: options.units.energy[0]
          };
          this.graphs = {
               stepMode: options.graphs.stepMode[0],
               caloriesMode: options.graphs.caloriesMode[0],
          };
          this.homeAccordionItems = homeAccordionItems;
     }
}

export default AppSettings;