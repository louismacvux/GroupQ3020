import { useState, useEffect } from 'react'
import { Button, Icon, Input, InputGroup, InputRightElement, Text, useDisclosure, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { HiSearch, HiX } from 'react-icons/hi'
import FoodData from "../../../data/FoodData.json";
import ListItemContainer from '../../layouts/ListItemContainer';
import Card from "../../layouts/Card/Card";

const AddFood = () => {
     let [selectedFoods, setSelectedFoods] = useState(FoodData.slice(0, 3));
     const { isOpen, onOpen, onClose } = useDisclosure()

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
                         <Input type="food" placeholder="Food Search" onClick={onOpen} />
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
               <FoodSearchModal isOpen={isOpen} onClose={onClose} />
          </div>
     )
}

export default AddFood;

const FoodSearchModal = (props) => {
     let { isOpen, onClose } = props;
     let [searchResults, setSearchResults] = useState();

     let searchFoods = (name) => {
          let results = 0;
          let maxResults = 5;
          return name && FoodData.filter((food) => {
               let { Descrip: foodName } = food;
               let isMatch = results < maxResults && foodName && foodName.toLowerCase().includes(name.toLowerCase()) && results++;
               return isMatch;
          })
     }

     let handleSearch = (e) => {
          let results = searchFoods(e.target.value);
          setSearchResults(results);
     }

     let handleClose = () => {
          setSearchResults();
          onClose();
     }

     useEffect(() => {
     }, [searchResults])

     return (
          < Modal isOpen={isOpen} onClose={handleClose} isCentered>
               <ModalOverlay />
               <ModalContent>
                    <Card>
                         <div className="flex flex-col gap-6">
                              <div>
                                   <InputGroup>
                                        <Input type="food" placeholder="Food Search" onChange={handleSearch} variant="filled" />
                                        <InputRightElement
                                             pointerEvents="none"
                                             children={<HiSearch color="gray.300" />}
                                        />
                                   </InputGroup>
                              </div>
                              {
                                   searchResults && (
                                        <div className="flex flex-col gap-2">
                                             {
                                                  searchResults.map((food, index) => {
                                                       let { Descrip: name, Energy_kcal: calories, Protein_g: protein, Fat_g: fat, Carb_g: carbohydrates } = food;
                                                       name = name.slice(0, 36);
                                                       return (
                                                            <ListItemContainer>
                                                                 <div className="flex flex-col">
                                                                      <div>
                                                                           <Text>{name}</Text>
                                                                      </div>
                                                                      <div>
                                                                           <Text fontSize='sm' variant='secondary'>
                                                                                Calories: {calories}g
                                                                           </Text>
                                                                      </div>
                                                                 </div>
                                                            </ListItemContainer>
                                                       )
                                                  })
                                             }
                                        </div>

                                   )
                              }
                         </div>

                    </Card>
               </ModalContent>
          </Modal >
     )
}