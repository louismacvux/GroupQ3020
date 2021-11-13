import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from "recharts";
import { AppContext } from '../../App';

const MS_IN_HOUR = 3600000;

const StepsAccordionPreview = () => {
     const [{ user }] = useContext(AppContext);
     const [graphData, setGraphData] = useState();

     if (!graphData) {
          let startTime = new Date((Date.now() - MS_IN_HOUR * 12));
          startTime = startTime.setMinutes(0, 0, 0);
          setGraphData(user.getRecords("steps").aggregateByTime(MS_IN_HOUR * 2, startTime).map((e, i) => ({
               ...e,
               label: `${(new Date(e.time)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
          })));
     }

     return (
          <div className="h-60 cursor-pointer">
               <Link to="/steps">
                    <ResponsiveContainer >
                         <BarChart data={graphData}>
                              <CartesianGrid />
                              <XAxis dataKey="label" padding={{ left: 60 }} axisList={false} />
                              <YAxis dataKey="data" mirror="true" axisList={false} />
                              <Bar dataKey="data" fill="#319795" barSize={4} />
                         </BarChart>
                    </ResponsiveContainer>
               </Link>
          </div>
     )
}

export default StepsAccordionPreview