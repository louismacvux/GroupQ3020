import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { AppContext } from '../../App';
import theme from '../../../theme/theme';
import Aggregator from '../../../js/types/tracking/Aggregator';
import toTitleCase from '../../../js/utils/toTitleCase';

const DietAccordionPreview = () => {
     // Obtain user data from context
     const [{ user }] = useContext(AppContext);
     // Initialize state to hold graph data
     const [graphData, setGraphData] = useState();

     // Update graph data state once user data has been obtained from context
     useEffect(() => {
          let startTime = new Date(Date.now());
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(Date.now());
          // Convert summarized record data to displayable graph data and store it in state
          setGraphData(() => {
               let data = user.getTrackingParameterByName("Diet")
                    .records
                    .aggregatePeriod(startTime, endTime, Aggregator.total);
               let newGraphData = [];
               Object.keys(data).forEach((parameterNameKey, index) => {
                    if (parameterNameKey != "energy") {
                         newGraphData.push({
                              "name": parameterNameKey,
                              "value": data[parameterNameKey]
                         })
                    }
               })
               return newGraphData;
          })
     }, [user])

     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

     const RADIAN = Math.PI / 180;
     const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, percent, index }) => {
          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
               <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(value).toFixed(0)}g`}
               </text>
          );
     };

     return (
          <div className="h-60 cursor-pointer">
               <Link to="/diet">
                    <ResponsiveContainer >
                         <PieChart>
                              <Legend verticalAlign="bottom" height={36} width="100%" formatter={(value) => toTitleCase(value)} />
                              <Pie data={graphData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={0} outerRadius={80} fill={theme.colors.primary["500"]} label={renderCustomizedLabel} labelLine={false}>
                                   {
                                        graphData && graphData.map((item, index) => (
                                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                   }
                              </Pie>
                         </PieChart>
                    </ResponsiveContainer>
               </Link>
          </div>
     )
}

export default DietAccordionPreview