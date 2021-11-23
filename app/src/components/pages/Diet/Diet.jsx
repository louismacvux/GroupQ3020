import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../App';
import CardStackLayout from '../../layouts/CardStackLayout';
import PaginatedParameterSummary from '../../tracking/PaginatedParameterSummary.jsx/PaginatedParameterSummary';
import AddFood from './AddFood';
import ManageGoals from '../../tracking/goals/ManageGoals';

const Diet = () => {
     // Get user data object from global app context
     const [{ user }] = useContext(AppContext);

     // Store user step data object in local state
     const [trackingParameterState, setTrackingParameterState] = useState();

     // This function will cause a re-render by updating the tracking data state with a new reference
     const refreshTrackingParameters = () => setTrackingParameterState((t) => ({ ...t }));

     useEffect(() => {
          if (user) {
               setTrackingParameterState(user.getTrackingParameterByName("Diet"));
          }
     }, [user])

     return (
          <CardStackLayout>
               {
                    trackingParameterState && (
                         <PaginatedParameterSummary trackingParameter={trackingParameterState} />
                    )
               }
               <AddFood />
               {
                    user && (
                         <ManageGoals trackingData={user.getTrackingParameterByName("Calories")} />
                    )
               }
          </CardStackLayout>
     )
}

export default Diet
