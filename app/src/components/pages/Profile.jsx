import { useState } from "react";
import { Select, Avatar, Editable, EditablePreview, EditableInput, Flex, VStack, SimpleGrid, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import CardStackLayout from "../layouts/CardStackLayout";

const Profile = (props) => {
     let [isEditing, setIsEditing] = useState(false);
     let { age = 29, sex = "Male", height = 190, weight = 77 } = {};
     let hideFieldProps = isEditing ? {} : { borderColor: "transparent", iconSize: 1, isReadOnly: true };

     return (
          <div>
               <VStack direction="column" justifyContent={"center"} alignItems="stretch" spacing={6}>
                    <VStack direction="column" justifyContent={"center"} alignItems={"center"} spacing={6}>
                         <Avatar size="2xl" />
                         <Editable
                              textAlign="center"
                              defaultValue="John Doe"
                              fontSize="2xl"
                              isPreviewFocusable={false}
                         >
                              <EditablePreview />
                              <EditableInput />
                         </Editable>
                    </VStack>
                    <CardStackLayout>

                         <SimpleGrid columns={2} rowGap={8} alignContent={"end"} alignItems={"center"} w="full">

                              <FormLabel htmlFor="age" m="0" verticalAlign={"middle"}>
                                   Age
                              </FormLabel>
                              <NumberInput id="age" value={age}>
                                   <NumberInputField p={3} {...hideFieldProps} />
                              </NumberInput>

                              <FormLabel htmlFor="sex" m="0" verticalAlign={"middle"}>
                                   Sex
                              </FormLabel>
                              <Select id="sex" defaultValue={sex} w={"full"} {...hideFieldProps}>
                                   <option value="male">Male</option>
                                   <option value="female">Female</option>
                              </Select>

                              <FormLabel htmlFor="height" m="0" verticalAlign={"middle"}>
                                   Height
                              </FormLabel>
                              <NumberInput id="height" value={height}>
                                   <NumberInputField p={3} {...hideFieldProps} />
                              </NumberInput>

                              <FormLabel htmlFor="weight" m="0" verticalAlign={"middle"}>
                                   Weight
                              </FormLabel>
                              <NumberInput id="weight" value={weight}>
                                   <NumberInputField p={3} {...hideFieldProps} />
                              </NumberInput>

                         </SimpleGrid>

                    </CardStackLayout>
               </VStack>
          </div>
     )
}

export default Profile
