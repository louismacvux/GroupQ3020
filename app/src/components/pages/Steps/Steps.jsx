import { useContext } from "react";
import { AppContext } from "../../App";

import AddRecord from "../../tracking/AddRecord";
import RecordTable from "../../tracking/RecordTable";
import ManageGoals from "../../tracking/goals/ManageGoals";

const Steps = () => {
     const { user } = useContext(AppContext);
     let stepTrackingData = user.getTrackingData("steps");
     return (
          <div className="flex flex-col gap-4">
               <RecordTable recordList={stepTrackingData.records} summaryInterval={4} />
               <AddRecord />
               <ManageGoals trackingData={stepTrackingData} />
          </div>
     )
}

export default Steps;