import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ResponsiveContainer, XAxis, YAxis, AreaChart, Area, CartesianGrid } from "recharts";
import { AppContext } from '../../App';
import dayjs from "dayjs";

const SleepAccordionPreview = () => {
     const [{ user }] = useContext(AppContext);
     const [graphData, setGraphData] = useState();
     let recordsToDisplay = 14;

     useEffect(() => {
          let wakeTimeRecords = user.getTrackingParameterByName("Wake Time").records.list.slice(-recordsToDisplay);
          let bedTimeRecords = user.getTrackingParameterByName("Bed Time").records.list.slice(-recordsToDisplay);

          let combinedData = Array(wakeTimeRecords.length).fill().map((_, index) => {
               return {
                    time: wakeTimeRecords[index].startTime,
                    sleepTimes: [bedTimeRecords[index].value, wakeTimeRecords[index].value]
               }
          })
          setGraphData(combinedData);
     }, [user])

     let dateLabelFormatter = (value) => {
          return dayjs(new Date(value)).format("MMM D");
     }

     let sleepTimeLabelFormatter = (value) => {
          let date = new Date();
          date.setHours(value, 0, 0, 0);
          return dayjs(date).format("h:mma");
     }

     return (
          <div className="h-80 cursor-pointer">
               <Link to="/sleep">
                    <ResponsiveContainer >
                         {
                              graphData && (
                                   <AreaChart data={graphData} margin={{}}>
                                        <CartesianGrid vertical={false} strokeDasharray={"2 8"} strokeOpacity={0.75} />
                                        <XAxis dataKey="time" padding={{ left: 80 }} axisList={false} tickFormatter={dateLabelFormatter} />
                                        <YAxis dataKey="sleepTimes" padding={{ bottom: 30, top: 30 }} mirror="true" axisList={false} tickFormatter={sleepTimeLabelFormatter} ticks={[-4, -2, 0, 2, 4, 6, 8, 10, 12]} domain={[-4, 10]} />
                                        <Area dataKey="sleepTimes" stroke="#319795" fill="#319795" />
                                   </AreaChart>
                              )
                         }
                    </ResponsiveContainer>
               </Link>
          </div>
     )
}

export default SleepAccordionPreview;