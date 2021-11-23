import { useContext, useState } from "react";
import { AppContext } from "../../App";

import AddRecord from "../../tracking/AddRecord";
import ManageGoals from "../../tracking/goals/ManageGoals";
import CardStackLayout from "../../layouts/CardStackLayout";
import PaginatedParameterSummary from "../../tracking/PaginatedParameterSummary.jsx/PaginatedParameterSummary";
import { Box } from "@chakra-ui/react";
import RecordList from "../../../js/types/tracking/RecordList";

const Steps = () => {
     // Get user data object from global app context
     const [{ user }] = useContext(AppContext);
     // Store user step data object in local state
     const [trackingParameterState, setTrackingParameterState] = useState(user.getTrackingParameterByName("steps"));
     // This function will cause a re-render by updating the tracking data state with a new reference
     const refreshTrackingData = () => setTrackingParameterState((t) => (t.copy()));

     return (
          <CardStackLayout>
               <PaginatedParameterSummary trackingParameter={trackingParameterState} aggregator={RecordList.aggregators.sum} />
               <AddRecord trackingData={trackingParameterState} refreshTrackingData={refreshTrackingData} />
               <ManageGoals trackingData={trackingParameterState} />
          </CardStackLayout>
     )
}

export default Steps;