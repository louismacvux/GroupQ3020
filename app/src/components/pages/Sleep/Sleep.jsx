import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";

import CardStackLayout from "../../layouts/CardStackLayout";
import AddRecord from "../../tracking/AddRecord";
import TrackingDataTable from "../../tracking/TrackingDataTable";
import ManageGoals from "../../tracking/goals/ManageGoals";

const Sleep = () => {
     // Get user data object from global app context
     const [{ user }] = useContext(AppContext);
     // Store user step data object in local state
     const [trackingDataState, setTrackingDataState] = useState(user.getTrackingParameterByName("duration"));
     // This function will cause a re-render by updating the tracking data state with a new reference
     const refreshTrackingData = () => setTrackingDataState((t) => (t.copy()));
     console.log(trackingDataState.records)

     return (
          <CardStackLayout>
               <TrackingDataTable trackingData={trackingDataState} summaryInterval={2} periodOptions={["weekly", "monthly"]} />
               <AddRecord trackingData={trackingDataState} refreshTrackingData={refreshTrackingData} />
               <ManageGoals trackingData={trackingDataState} />
          </CardStackLayout>
     )
}

export default Sleep;