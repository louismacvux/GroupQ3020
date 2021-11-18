import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { daysInMonth, DAY_DURATION, HOUR_DURATION } from "../../js/utils/time";
import dayjs from "dayjs";
import { Table, Thead, Tr, Th, Td, Tbody, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import toTitleCase from "../../js/utils/toTitleCase";
import { pick } from "lodash"
import CardTitle from "../layouts/Card/CardTitle";

let periodParams = {
     "daily": {
          summaryInterval: HOUR_DURATION * 2,
          getStart: () => {
               let date = new Date(Date.now());
               date.setHours(0, 0, 0, 0);
               return date;
          },
          getDuration: (bucketStartTime) => DAY_DURATION,
          getTimeColumn: (bucketStartTime, bucketEndTime) => (`
                    ${dayjs(bucketStartTime).format("HH:mm A")} -
                    ${dayjs(bucketEndTime).format("HH:mm A")}
               `)
     },
     "weekly": {
          summaryInterval: DAY_DURATION + HOUR_DURATION,
          getStart: () => {
               let date = new Date(Date.now());
               date.setHours(0, 0, 0, 0);
               date.setDate(date.getDate() - date.getDay());
               return date;
          },
          getDuration: (bucketStartTime) => DAY_DURATION * 7,
          getTimeColumn: (bucketStartTime, bucketEndTime) => (
               dayjs(bucketStartTime).format("dddd D")
          )
     },
     "monthly": {
          summaryInterval: DAY_DURATION + HOUR_DURATION,
          getStart: (date) => {
               date.setHours(0, 0, 0, 0);
               date.setDate(1);
               return date;
          },
          getDuration: (bucketStartTime) => {
               return daysInMonth(bucketStartTime) * DAY_DURATION;
          },
          getTimeColumn: (bucketStartTime, bucketEndTime) => (
               dayjs(bucketStartTime).format("dddd D")
          )
     }
}

const TODAY = new Date(Date.now());

const TrackingDataTable = (props) => {
     let { trackingData, summaryInterval, periodOptions } = props;
     let { records } = trackingData;
     const { isOpen, onOpen, onClose } = useDisclosure();

     // Initialize start and end dates
     let start = new Date(Date.now());
     start.setHours(0, 0, 0, 0);
     let end = new Date(start);
     end.setDate(end.getDate() + 1);

     if (periodOptions) {
          periodParams = pick(periodParams, periodOptions);
     }

     let [period, setPeriod] = useState(Object.keys(periodParams)[0]);
     let [dateRange, setDateRange] = useState({ start, end });

     let firstRecordTime, lastRecordTime;
     let pooledRecords;
     let canPageLeft = false;
     let canPageRight = false;

     if (records.list.length > 0) {
          firstRecordTime = records.list[0].startTime.getTime();
          lastRecordTime = records.list[records.list.length - 1].startTime.getTime();
     }

     // Function to update date range when page is flipped. Left = -1, Right = 1.
     let flipPage = (direction) => {
          if (direction === -1 || direction === 1) {
               setDateRange(prevDateRange => {
                    let start = new Date(prevDateRange.start.getTime() + direction * periodParams[period].getDuration(TODAY));
                    let end = new Date(start.getTime() + periodParams[period].getDuration(TODAY));
                    return { start, end };
               })
          }
     }

     if (period) {
          // Summarize data in date range
          pooledRecords = records.aggregateByTime(periodParams[period].summaryInterval, dateRange.start, dateRange.end);
          // You can change pages only if the next page has entries
          canPageLeft = dateRange.end.getTime() - periodParams[period].getDuration(dateRange.start) < firstRecordTime;
          canPageRight = dateRange.start.getTime() + periodParams[period].getDuration(dateRange.start) > lastRecordTime;
     }

     // When period type changes (i.e. "daily", "weekly", "monthly"), update the date range accordingly.
     useEffect(() => {
          setDateRange(() => {
               let start = periodParams[period].getStart(TODAY);
               let end = new Date(start.getTime() + periodParams[period].getDuration(start));
               return { start, end };
          })
     }, [period]);

     // Create title based on period type
     const getTitle = () => {
          let title;
          if (period === "daily") {
               title = dayjs(dateRange.start).format("dddd, MMMM D");
          }
          else {
               title = `${dayjs(dateRange.start).format("MMMM D")} - ${dayjs(dateRange.end).format("MMMM D")}`;
          }
          return title
     }

     return (
          <div className="flex flex-col items-between gap-6 divide-y">
               {
                    pooledRecords.length > 0 ?
                         (
                              <>
                                   <div className="flex justify-between items-center">
                                        <HiChevronLeft className={`w-5 h-5 cursor-pointer ${!canPageLeft || "invisible"}`} onClick={() => canPageLeft || flipPage(-1)} />
                                        <span className="text-center cursor-pointer" onClick={onOpen}>{getTitle()}</span>
                                        <HiChevronRight className={`w-5 h-5 cursor-pointer ${!canPageRight || "invisible"}`} onClick={() => canPageRight || flipPage(1)} />
                                   </div>
                                   <Table>
                                        <Thead>
                                             <Tr>
                                                  <Th>Period</Th>
                                                  <Th isNumeric>Total</Th>
                                             </Tr>
                                        </Thead>
                                        <Tbody>
                                             {
                                                  pooledRecords && pooledRecords.map(({ startTime, endTime, value }, index) => {
                                                       return (
                                                            <Tr key={index}>
                                                                 <Td>{periodParams[period].getTimeColumn(startTime, endTime)}</Td>
                                                                 <Td isNumeric>{trackingData.displayFormatter(value)}</Td>
                                                            </Tr>
                                                       )
                                                  })
                                             }
                                        </Tbody>
                                   </Table>
                                   <PeriodSelectionModal periodOptions={Object.keys(periodParams)} period={period} setPeriod={setPeriod} isOpen={isOpen} onClose={onClose} />
                              </>
                         ) :
                         (
                              <div>
                                   <CardTitle>Activity</CardTitle>
                                   <Text align="center">No data has been recorded yet.</Text>
                              </div>
                         )
               }
          </div>
     )
}

export default TrackingDataTable;


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
                                        <div className="py-4 cursor-pointer" onClick={() => handleSelect(option)} key={index}>
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