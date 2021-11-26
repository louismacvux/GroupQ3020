import { useState } from "react";
import GoalTable from "./GoalTable";
import CardTitle from "../../layouts/Card/CardTitle";
import { HiCheck, HiPencil } from "react-icons/hi";
import { Icon } from "@chakra-ui/react";

import TrackingParameter from "../../../js/types/tracking/TrackingParameter";
import VirtualTrackingParameter from "../../../js/types/tracking/VirtualTrackingParameter";
import TrackingParameterGroup from "../../../js/types/tracking/TrackingParameterGroup";

const ManageGoals = (props) => {
     let { trackingParameter } = props;

     const [isEditing, setIsEditing] = useState(false);

     let aggregateGoals = (trackingParameter) => {
          let goals = [];
          if (trackingParameter instanceof TrackingParameter || trackingParameter instanceof VirtualTrackingParameter) {
               goals.push(...trackingParameter.goals.list);
          }
          if (trackingParameter instanceof VirtualTrackingParameter || trackingParameter instanceof TrackingParameterGroup) {
               Object.values(trackingParameter.children).forEach((child) => {
                    goals.push(...aggregateGoals(child));
               })
          }
          return goals;
     }

     let [goals, setGoals] = useState(aggregateGoals(trackingParameter));

     let rightIconProps = {
          as: isEditing ? HiCheck : HiPencil,
          onClick: () => setIsEditing(!isEditing),
          className: "cursor-pointer"
     }

     let rightIcon = <Icon {...rightIconProps} />;

     return (
          <div className="flex flex-col gap-8">
               <CardTitle rightIcon={rightIcon} size="md">Goals</CardTitle>
               <GoalTable goals={aggregateGoals(trackingParameter)} title="Goals" isEditing={isEditing} />
          </div>
     )
}

export default ManageGoals;
