import { Heading, Progress, Text } from '@chakra-ui/react';
import React from 'react'
import toTitleCase from "../../../js/utils/toTitleCase";

const GoalSummary = (props) => {
     let { goal } = props;
     let progressPercentage = Math.round(goal.computeProgress().progress * 100);
     return (
          <div className="flex flex-col border p-4 gap-6">
               <div>
                    <Heading size="sm">{`${toTitleCase(goal.period)} ${toTitleCase(goal.type)}`}</Heading>
               </div>
               <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                         <Text fontSize="xs">{0}</Text>
                         <Text fontSize="xs">{goal.value}</Text>
                    </div>
                    <Progress value={progressPercentage} height={1} colorScheme="green" />
               </div>
          </div>
     )
}

export default GoalSummary
