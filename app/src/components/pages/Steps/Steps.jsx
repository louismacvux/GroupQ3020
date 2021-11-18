import { useContext, useState } from "react";
import { AppContext } from "../../App";

import AddRecord from "../../tracking/AddRecord";
import TrackingDataTable from "../../tracking/TrackingDataTable";
import ManageGoals from "../../tracking/goals/ManageGoals";
import CardStackLayout from "../../layouts/CardStackLayout";

const Steps = () => {
     // Get user data object from global app context
     const [{ user }] = useContext(AppContext);
     // Store user step data object in local state
     const [trackingDataState, setTrackingDataState] = useState(user.getTrackingParameterByName("steps"));
     // This function will cause a re-render by updating the tracking data state with a new reference
     const refreshTrackingData = () => setTrackingDataState((t) => (t.copy()));

     return (
          <CardStackLayout>
               <TrackingDataTable trackingData={trackingDataState} summaryInterval={2} periodOptions={["daily", "weekly", "monthly"]} />
               <AddRecord trackingData={trackingDataState} refreshTrackingData={refreshTrackingData} />
               <ManageGoals trackingData={trackingDataState} />
          </CardStackLayout>
     )
}

export default Steps;