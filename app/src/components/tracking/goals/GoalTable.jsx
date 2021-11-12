import { Table, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";
import toTitleCase from "../../../js/utils/toTitleCase";

const GoalTable = (props) => {
     let { period, goals } = props;
     let flattenedGoals = goals.getFlattened();
     return (
          <div>
               <Table variant="unstyled">
                    <Thead>
                         <Tr>
                              <Th>Type</Th>
                              <Th isNumeric={true}>Current</Th>
                              <Th isNumeric={true}>Goal</Th>
                              <Th isNumeric={true}>Progress</Th>
                         </Tr>
                    </Thead>
                    <Tbody>
                         {
                              Object.keys(flattenedGoals).map((goalKey, index) => {
                                   let goal = flattenedGoals[goalKey];
                                   let { current, progress } = goal.computeProgress();
                                   return (
                                        <Tr key={index}>
                                             <Td>{toTitleCase(`${goal.period} ${goal.type}`)}</Td>
                                             <Td isNumeric={true}>{current}</Td>
                                             <Td isNumeric={true}>{goal.value}</Td>
                                             <Td isNumeric={true}>{`${Math.round(progress * 100)}%`}</Td>
                                        </Tr>
                                   )
                              })
                         }
                    </Tbody>
               </Table>
          </div>
     )
}

export default GoalTable;