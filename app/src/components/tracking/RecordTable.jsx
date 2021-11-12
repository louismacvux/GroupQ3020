import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Card from "../layouts/Card";

const HOUR = 1000 * 60 * 60;

const RecordTable = (props) => {
     let { recordList, summaryInterval } = props;

     // Initialize start and end dates
     let startDate = new Date(Date.now());
     startDate.setHours(0, 0, 0, 0);
     let endDate = new Date(startDate);
     endDate.setDate(endDate.getDate() + 1);

     // Summarize data within the period by interval
     let pooledRecords = recordList.aggregateByTime(HOUR * summaryInterval, startDate, endDate);

     return (
          <Card className="flex flex-col gap-6 divide-y">
               <div className="flex justify-between items-center">
                    <HiChevronLeft className="w-5 h-5 cursor-pointer" />
                    <span className="text-center cursor-pointer">{(new Date(startDate).toDateString())}</span>
                    <HiChevronRight className="w-5 h-5 cursor-pointer" />
               </div>
               <div className="h-full pt-4">
                    {
                         pooledRecords.map((record, index) => {
                              return (
                                   <div className="flex flex-row w-full justify-between p-2" key={index}>
                                        <span>{new Date(record.time).toTimeString().slice(0, 5)}</span>
                                        <span>{record.data}</span>
                                   </div>
                              )
                         })
                    }
               </div>
          </Card>
     )
}

export default RecordTable;