import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";

import CardStackLayout from "../../layouts/CardStackLayout";
import AddRecord from "../../tracking/AddRecord";
import ManageGoals from "../../tracking/goals/ManageGoals";
import PaginatedParameterSummary from "../../tracking/PaginatedParameterSummary.jsx/PaginatedParameterSummary";
import AddSleepRecord from "./AddSleepRecord";

const Sleep = () => {
     // Get user data object from global app context
     const [{ user }] = useContext(AppContext);
     // Store user step data object in local state
     const [trackingParameterState, setTrackingParameterState] = useState(user.getTrackingParameterByName("Sleep"));
     // This function will cause a re-render by updating the tracking data state with a new reference
     const refreshTrackingParameter = () => setTrackingParameterState((t) => (t.copy()));

     return (
          <CardStackLayout>
               <PaginatedParameterSummary trackingParameter={trackingParameterState} />
               <AddSleepRecord trackingParameter={trackingParameterState} refreshTrackingParameter={refreshTrackingParameter} />
               <ManageGoals trackingParameter={trackingParameterState} />
          </CardStackLayout>
     )
}

export default Sleep;