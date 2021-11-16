import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { ResponsiveContainer, XAxis, YAxis, AreaChart, Area, CartesianGrid } from "recharts";
import { AppContext } from '../../App';
import dayjs from "dayjs";

const SleepAccordionPreview = () => {
     const [{ user }] = useContext(AppContext);
     const [graphData, setGraphData] = useState();
     let recordsToDisplay = 14;

     if (!graphData) {

          let wakeTimes = user.getRecords("Wake Time").records.slice(-recordsToDisplay);
          let bedTimes = user.getRecords("Bed Time").records.slice(-recordsToDisplay);

          let combinedData = Array(wakeTimes.length).fill().map((_, index) => {
               return {
                    time: wakeTimes[index].time,
                    sleepTimes: [bedTimes[index].data, wakeTimes[index].data]
               }
          })
          setGraphData(combinedData);
     }

     let recordDateFormatter = (value) => {
          return dayjs(new Date(value)).format("MMM D");
     }

     let sleepTimeFormatter = (value) => {
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
                                        <XAxis dataKey="time" padding={{ left: 80 }} axisList={false} tickFormatter={recordDateFormatter} />
                                        <YAxis dataKey="sleepTimes" padding={{ bottom: 30, top: 30 }} mirror="true" axisList={false} tickFormatter={sleepTimeFormatter} ticks={[-4, -2, 0, 2, 4, 6, 8, 10, 12]} domain={[-4, 10]} />
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