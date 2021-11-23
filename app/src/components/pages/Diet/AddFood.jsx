import { useState } from 'react'
import { Button, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { HiSearch, HiX } from 'react-icons/hi'
import FoodData from "../../../data/FoodData.json";
import ListItemContainer from '../../layouts/ListItemContainer';

const AddFood = () => {
     let [selectedFoods, setSelectedFoods] = useState(FoodData.slice(0, 3));
     let handleRemoveSelectedFood = (index) => {
          setSelectedFoods(prevSelectedFoods => {
               let newSelectedFoods = [...prevSelectedFoods];
               newSelectedFoods.splice(index, 1);
               return newSelectedFoods;
          });
     }
     return (
          <div className="flex flex-col gap-8">
               <div>
                    <InputGroup>
                         <Input type="food" placeholder="Food Search" />
                         <InputRightElement
                              pointerEvents="none"
                              children={<HiSearch color="gray.300" />}
                         />
                    </InputGroup>
               </div>
               <div>
                    <div className="flex flex-col gap-1">
                         {
                              selectedFoods.map((food, index) => {
                                   return (
                                        <ListItemContainer key={index} className="flex">
                                             <div className="flex flex-col flex-grow gap-2">
                                                  <Text>{food.Descrip}</Text>
                                                  <Text variant="secondary" fontSize="xs" >1 Serving, {food.Energy_kcal} Calories</Text>
                                             </div>
                                             <div className="flex flex-shrink items-center cursor-pointer">
                                                  <Icon as={HiX} w={4} h={4} color="gray.500" onClick={() => handleRemoveSelectedFood(index)} variant="clickable" />
                                             </div>
                                        </ListItemContainer>
                                   )
                              })
                         }
                    </div>
               </div>
               <div>
                    <Button width="full">Add</Button>
               </div>
          </div>
     )
}

export default AddFood;