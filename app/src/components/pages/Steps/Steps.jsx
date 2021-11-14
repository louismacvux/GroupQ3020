import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";

import AddRecord from "../../tracking/AddRecord";
import RecordTable from "../../tracking/RecordTable";
import ManageGoals from "../../tracking/goals/ManageGoals";

const Steps = () => {
     // Get user data object from global app context
     const [{ user }] = useContext(AppContext);
     // Store user step data object in local state
     const [trackingDataState, setTrackingDataState] = useState(user.getTrackingData("steps"));
     // This function will cause a re-render by updating the tracking data state with a new reference
     const refreshTrackingData = () => setTrackingDataState((t) => (t.copy()));

     return (
          <div className="flex flex-col gap-4">
               <RecordTable recordList={trackingDataState.records} summaryInterval={2} />
               <AddRecord trackingData={trackingDataState} refreshTrackingData={refreshTrackingData} />
               <ManageGoals trackingData={trackingDataState} />
          </div>
     )
}

export default Steps;