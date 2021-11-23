import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { HOUR_DURATION } from '../../../js/utils/time';
import { AppContext } from '../../App';
import dayjs from 'dayjs';

const StepsAccordionPreview = () => {
     // Obtain user data from context
     const [{ user }] = useContext(AppContext);
     // Initialize state to hold graph data
     const [graphData, setGraphData] = useState();

     // Update graph data state once user data has been obtained from context
     useEffect(() => {
          let startTime = new Date(Date.now());
          startTime = startTime.setHours(startTime.getHours() - 12, 0, 0);
          // Convert summarized record data to displayable graph data and store it in state
          setGraphData(
               user.getTrackingParameterByName("steps")
                    .records
                    .aggregateByTime(HOUR_DURATION * 2, startTime)
                    .map((record) => ({
                         label: dayjs(new Date(record.startTime)).format("h:mma"),
                         value: record.value
                    }))
          )
     }, [user])

     return (
          <div className="h-60 cursor-pointer">
               <Link to="/steps">
                    <ResponsiveContainer >
                         <BarChart data={graphData} margin={{}}>
                              <XAxis dataKey="label" padding={{ left: 60 }} axisList={false} />
                              <YAxis dataKey="value" mirror="true" axisList={false} />
                              <Bar dataKey="value" fill="#319795" barSize={4} />
                         </BarChart>
                    </ResponsiveContainer>
               </Link>
          </div>
     )
}

export default StepsAccordionPreview