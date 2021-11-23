import GoalSummary from "./GoalSummary";
import { Heading } from "@chakra-ui/react";

const TrackingParameterGoals = (props) => {
     let { trackingParameter } = props;

     let goals = trackingParameter.goals.list;

     return (
          <div className="flex flex-col gap-4">
               {
                    <Heading size="md">{trackingParameter.name}</Heading>
               }
               {
                    goals.map((goal, index) => {
                         return (
                              <GoalSummary goal={goal} key={index} />
                         )
                    })
               }
          </div>
     )
}

export default TrackingParameterGoals
