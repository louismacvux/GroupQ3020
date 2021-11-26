import { useState, useEffect } from "react";
import { Icon, Text, useDisclosure } from "@chakra-ui/react"
import { daysInMonth, DAY_DURATION, HOUR_DURATION } from "../../../js/utils/time";
import dayjs from "dayjs";
import CardTitle from "../../layouts/Card/CardTitle";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SummaryIntervalSelectionModal from "./SummaryIntervalSelectionModal";
import toTitleCase from "../../../js/utils/toTitleCase";
import { pick } from "lodash";
import ListItemContainer from "../../layouts/ListItemContainer";
import Aggregator from "../../../js/types/tracking/Aggregator";
import TrackingParameterGroup from "../../../js/types/tracking/TrackingParameterGroup";

let datePeriodParams = {
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
          summaryInterval: DAY_DURATION,
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

let TODAY;

const PaginatedParameterSummary = (props) => {

     let { trackingParameter, periodOptions } = props;
     datePeriodParams = periodOptions ? pick(datePeriodParams, periodOptions) : datePeriodParams;

     TODAY = new Date(Date.now());
     TODAY.setHours(0, 0, 0, 0);

     const { isOpen, onOpen, onClose } = useDisclosure();
     let [period, setPeriod] = useState(Object.keys(datePeriodParams)[0]);

     // Initialize state
     let [dateRange, setDateRange] = useState(initializeDateRange(period));

     let canPageLeft = false;
     let canPageRight = false;

     if (period) {
          let firstRecordStartDate = trackingParameter.records.list[0].startTime;
          let lastRecordStartDate = trackingParameter.records.list[trackingParameter.records.list.length - 1].startTime;
          let { end: endDateAfterPageLeft } = nextDateRange(period, dateRange, -1);
          let { start: startDateAfterPageRight } = nextDateRange(period, dateRange, 1);
          canPageLeft = endDateAfterPageLeft.getTime() > firstRecordStartDate.getTime();
          canPageRight = startDateAfterPageRight.getTime() < lastRecordStartDate.getTime();
     }

     useEffect(() => {
          setDateRange(initializeDateRange(period));
     }, [period])

     let leftIcon = (
          <Icon as={HiChevronLeft} w={5} h={5} className={canPageLeft ? "cursor-pointer" : "cursor-not-allowed opacity-25"} onClick={() => canPageLeft && setDateRange(nextDateRange(period, dateRange, -1))} />
     )

     let rightIcon = (
          <Icon as={HiChevronRight} w={5} h={5} className={canPageRight ? "cursor-pointer" : "cursor-not-allowed opacity-25"} onClick={() => canPageRight && setDateRange(nextDateRange(period, dateRange, 1))} />
     )

     return (
          <div className="flex flex-col gap-8">
               <CardTitle leftIcon={leftIcon} rightIcon={rightIcon} size="sm" onClick={() => onOpen()} className="cursor-pointer">
                    {getTitle(period, dateRange)}
               </CardTitle>
               <ParameterSummaryResults trackingParameter={trackingParameter} dateRange={dateRange} period={period} />
               <SummaryIntervalSelectionModal
                    interval={period}
                    intervalOptions={Object.keys(datePeriodParams)}
                    setInterval={setPeriod}
                    isOpen={isOpen}
                    onClose={onClose}
               />
          </div>
     )
}

const initializeDateRange = (period) => {
     let end = new Date(TODAY.getTime() + DAY_DURATION - 1);
     let start = new Date(TODAY.getTime() + DAY_DURATION - datePeriodParams[period].getDuration(end));
     return { start, end };
}

// Create title based on period type
const getTitle = (period, dateRange) => {
     let title;
     if (period === "daily") {
          title = dayjs(dateRange.start).format("dddd, MMMM D");
     }
     else {
          title = `${dayjs(dateRange.start).format("MMMM D")} - ${dayjs(dateRange.end).format("MMMM D")}`;
     }
     return title
}

// Function to update date range when page is flipped. Left = -1, Right = 1.
let nextDateRange = (period, dateRange, direction) => {
     let newDateRange;
     if (direction === -1 || direction === 1) {
          let start = new Date(dateRange.start.getTime() + direction * datePeriodParams[period].getDuration(TODAY));
          let end = new Date(start.getTime() + datePeriodParams[period].getDuration(TODAY) - 1);
          newDateRange = { start, end };
     }
     return newDateRange;
}

const ParameterSummaryResults = (props) => {
     let { trackingParameter, dateRange, period } = props;

     let aggregator = trackingParameter.getAggregator(period);

     let aggregated;
     let results;

     if (trackingParameter.records.hasObjectValues) {
          aggregated = trackingParameter.records.aggregateByInterval(datePeriodParams[period].summaryInterval, dateRange.start, dateRange.end, aggregator)[0].value;
          results = Object.keys(aggregated).map((parameterName) => {
               let parameter = trackingParameter.getDescendentByName(parameterName);
               return {
                    label: aggregator.formatName(toTitleCase(parameterName), period),
                    value: parameter.displayFormatter(aggregated[parameterName])
               }
          })
     }
     else {
          let summaryIntervalDuration = datePeriodParams[period].summaryInterval;
          aggregated = trackingParameter.records.aggregateByInterval(summaryIntervalDuration, dateRange.start, dateRange.end, aggregator);
          results = aggregated.map((record) => {
               return {
                    label: aggregator.formatName(datePeriodParams[period].getTimeColumn(record.startTime, record.endTime), period),
                    value: trackingParameter.displayFormatter(record.value)
               }
          })
     }

     return (
          <div className="flex flex-col rounded gap-1 overflow-hidden">
               {
                    results && results.map((res, index) => {
                         return (
                              <ListItemContainer key={index} className="flex flex-row justify-between">
                                   <Text>{res.label}</Text>
                                   <Text>{res.value}</Text>
                              </ListItemContainer>
                         )
                    })
               }
          </div>
     )
}

export default PaginatedParameterSummary;