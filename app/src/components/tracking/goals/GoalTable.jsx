import { Button, Table, Thead, Tr, Th, Td, Tbody, Divider, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi";
import toTitleCase from "../../../js/utils/toTitleCase";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react"

const GoalTable = (props) => {
     let { goals, isEditing } = props;
     const { isOpen: isAddDialogueOpen, onOpen: onAddDialogueOpen, onClose: onAddDialogueClose } = useDisclosure();
     return (
          <div className="flex flex-col gap-6">
               <div>
                    <Divider></Divider>
                    <Table>
                         <Thead>
                              <Tr>
                                   <Th>Type</Th>
                                   {/* <Th isNumeric={true}>Current</Th> */}
                                   <Th isNumeric={true}>Goal</Th>
                                   <Th isNumeric={true}>{isEditing ? "Delete" : "Progress"}</Th>
                              </Tr>
                         </Thead>
                         <Tbody>
                              {
                                   goals && goals.list && goals.list.map((goal, index) => {
                                        let { current, progress } = goal.computeProgress();
                                        let handleChangeValue = (_, v) => {
                                             goal.value = v;
                                        }
                                        let handleDelete = () => {
                                        }
                                        return (
                                             <Tr key={index}>
                                                  {
                                                       isEditing ? (
                                                            <>
                                                                 <Td>{toTitleCase(`${goal.period} ${goal.type}`)}</Td>
                                                                 {/* <Td isNumeric={true}>{current}</Td> */}
                                                                 <Td isNumeric={true}>
                                                                      <NumberInput className="flex-shrink-1" defaultValue={goal.value} min={0} onChange={handleChangeValue}>
                                                                           <NumberInputField />
                                                                      </NumberInput>
                                                                 </Td>
                                                                 <Td isNumeric={true}>
                                                                      <HiTrash className="cursor-pointer" onClick={handleDelete} />
                                                                 </Td>
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <Td>{toTitleCase(`${goal.period} ${/*goal.type*/""}`)}</Td>
                                                                 {/* <Td isNumeric={true}>{current}</Td> */}
                                                                 <Td isNumeric={true}>{goal.value}</Td>
                                                                 <Td isNumeric={true}>{`${Math.round(progress * 100)}%`}</Td>
                                                            </>
                                                       )
                                                  }
                                             </Tr>
                                        )
                                   })
                              }
                         </Tbody>
                    </Table>
               </div>
               {
                    isEditing && (
                         <Button type="submit" colorScheme="teal" variant="solid" onClick={onAddDialogueOpen}>
                              Add Goal
                         </Button>
                    )
               }
               <AddGoalModal isOpen={isAddDialogueOpen} onClose={onAddDialogueClose} />
          </div>
     )
}

export default GoalTable;


const AddGoalModal = ({ isOpen, onClose }) => {
     return (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
               <ModalOverlay />
               <ModalContent>
                    <ModalHeader>Add Goal</ModalHeader>
                    <ModalCloseButton />
               </ModalContent>
          </Modal>
     )
}