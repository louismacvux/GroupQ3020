import { AppContext } from "../../App";
import { useContext, useState } from "react";
import GoalList from "../../../js/types/tracking/GoalList";
import { Divider, Heading, Text } from "@chakra-ui/react";
import TrackingParameterGroupGoals from "./TrackingParameterGroupGoals";
import CardStackLayout from "../../layouts/CardStackLayout";
import CardTitle from "../../layouts/Card/CardTitle";

const Goals = () => {
     // Get user data object from global app context
     const [{ user }] = useContext(AppContext);
     // Store user step data object in local state
     const [trackingParameters] = useState(user.trackingParameters);

     return (
          <CardStackLayout>
               {
                    Object.values(trackingParameters.children).map((child, index) => (
                         <div className="flex flex-col gap-4" key={index}>
                              <div>
                                   <CardTitle>{child.name}</CardTitle>
                                   <Divider />
                              </div>
                              <TrackingParameterGroupGoals trackingParameterGroup={child} />
                         </div>
                    ))
               }
          </CardStackLayout>
     )
}

export default Goals
