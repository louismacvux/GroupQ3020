import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Card from "../layouts/Card";
import { daysInMonth, DAY_DURATION, HOUR_DURATION, MINUTE_DURATION } from "../../js/utils/time";
import {
     Text,
     Button,
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalFooter,
     ModalBody,
     ModalCloseButton,
     useDisclosure
} from "@chakra-ui/react"
import toTitleCase from "../../js/utils/toTitleCase";


const periods = {
     "daily": {
          summaryInterval: HOUR_DURATION * 2,
          getStart: () => {
               let date = new Date(Date.now());
               date.setHours(0, 0, 0, 0);
               return date;
          },
          getDuration: () => DAY_DURATION,
          formatTime: (bucketTime) => {
               return bucketTime.toTimeString().slice(0, 5)
          }
     },
     "weekly": {
          summaryInterval: DAY_DURATION + HOUR_DURATION,
          getStart: () => {
               let date = new Date(Date.now());
               date.setHours(0, 0, 0, 0);
               date.setDate(date.getDate() - date.getDay());
               return date;
          },
          getDuration: () => DAY_DURATION * 7,
          formatTime: (bucketTime) => {
               let options = { weekday: 'long', day: 'numeric' };
               return new Intl.DateTimeFormat('en-US', options).format(bucketTime)
          }
     },
     "monthly": {
          summaryInterval: DAY_DURATION + HOUR_DURATION,
          getStart: (date) => {
               date.setHours(0, 0, 0, 0);
               date.setDate(1);
               return date;
          },
          getDuration: (start) => {
               return daysInMonth(start) * DAY_DURATION;
          },
          formatTime: (bucketTime) => {
               let options = { month: 'long', day: 'numeric' };
               return new Intl.DateTimeFormat('en-US', options).format(bucketTime)
          }
     }
}

const TODAY = new Date(Date.now());

const RecordTable = (props) => {
     let { recordList, summaryInterval } = props;
     const { isOpen, onOpen, onClose } = useDisclosure()

     // Initialize start and end dates
     let start = new Date(Date.now());
     start.setHours(0, 0, 0, 0);
     let end = new Date(start);
     end.setDate(end.getDate() + 1);

     let [period, setPeriod] = useState("daily");
     let [dateRange, setDateRange] = useState({ start, end });

     let firstRecordTime = recordList.records[0].time.getTime();
     let lastRecordTime = recordList.records[recordList.records.length - 1].time.getTime();

     // You can change pages only if the new page has entries
     let canPageLeft = dateRange.end.getTime() - periods[period].getDuration() < firstRecordTime;
     let canPageRight = dateRange.start.getTime() + periods[period].getDuration() > lastRecordTime;

     // Function to update date range when page is flipped. Left = -1, Right = 1.
     let flipPage = (direction) => {
          if (direction === -1 || direction === 1) {
               setDateRange(prevDateRange => {
                    let start = new Date(prevDateRange.start.getTime() + direction * periods[period].getDuration(TODAY));
                    let end = new Date(start.getTime() + periods[period].getDuration(TODAY));
                    return { start, end };
               })
          }
     }

     // Summarize data in date range
     let pooledRecords = recordList.aggregateByTime(periods[period].summaryInterval, dateRange.start, dateRange.end);

     // When period type changes (i.e. "daily", "weekly", "monthly"), update the date range accordingly.
     useEffect(() => {
          setDateRange(() => {
               let start = periods[period].getStart(TODAY);
               let end = new Date(start.getTime() + periods[period].getDuration(start));
               return { start, end };
          })
     }, [period]);

     const getTitle = () => {
          let title = dateRange.start.toDateString();
          if (period != "daily") {
               title += '  -  ' + dateRange.end.toDateString();
          }
          return title
     }

     return (
          <Card className="flex flex-col gap-6 divide-y">
               <div className="flex justify-between items-center">
                    <HiChevronLeft className={`w-5 h-5 cursor-pointer ${!canPageLeft || "invisible"}`} onClick={() => canPageLeft || flipPage(-1)} />
                    <span className="text-center cursor-pointer" onClick={onOpen}>{getTitle()}</span>
                    <HiChevronRight className={`w-5 h-5 cursor-pointer ${!canPageRight || "invisible"}`} onClick={() => canPageRight || flipPage(1)} />
               </div>
               <div className="h-full pt-4">
                    {
                         pooledRecords.map((record, index) => {
                              return (
                                   <div className="flex flex-row w-full justify-between p-2" key={index}>
                                        <span>{periods[period].formatTime(record.time)}</span>
                                        <span>{record.data}</span>
                                   </div>
                              )
                         })
                    }
               </div>
               <PeriodSelectionModal periodOptions={Object.keys(periods)} period={period} setPeriod={setPeriod} isOpen={isOpen} onClose={onClose} />
          </Card>
     )
}

export default RecordTable;

const PeriodSelectionModal = (props) => {
     let { periodOptions, period, setPeriod, isOpen, onClose } = props;
     let handleSelect = (option) => {
          setPeriod(option);
          onClose();
     }
     return (
          <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
               <ModalOverlay />
               <ModalContent>
                    <ModalHeader>Select Period</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                         <div className="flex flex-col">
                              {
                                   periodOptions.map((option, index) => (
                                        <div className="py-4 cursor-pointer" onClick={() => handleSelect(option)}>
                                             <Text>{toTitleCase(option)}</Text>
                                        </div>
                                   ))
                              }
                         </div>
                    </ModalBody>
               </ModalContent>
          </Modal>
     )
}