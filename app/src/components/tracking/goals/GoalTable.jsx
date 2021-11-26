import { createContext, useRef, useState, useEffect, useContext } from "react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, Table, Thead, Tr, Th, Td, Tbody, Divider, Input, NumberInput, NumberInputField, Flex, Text, Badge, Icon } from "@chakra-ui/react";
import { HiCheckCircle, HiTrash } from "react-icons/hi";
import toTitleCase from "../../../js/utils/toTitleCase";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react"
import ListItemContainer from "../../layouts/ListItemContainer";
import theme from "../../../theme/theme";

const { round, max, min } = Math;

const GoalTable = (props) => {
     let { goals, isEditing } = props;
     const { isOpen: isAddDialogueOpen, onOpen: onAddDialogueOpen, onClose: onAddDialogueClose } = useDisclosure();
     return (
          <div className="flex flex-col gap-4">
               {
                    goals.map((goal, index) => {
                         let { of, period, type, value } = goal;
                         let { displayFormatter } = of;
                         let { current, progress } = goal.computeProgress();
                         let start = 0;
                         let lowerBound = 0;
                         let upperBound = 0;
                         if (type === "minimum") {
                              lowerBound = value;
                         }
                         if (type === "maximum") {
                              upperBound = value;
                         }
                         let end = max(value, current);
                         let isComplete = progress >= 1;
                         return (
                              <ListItemContainer className="flex flex-col gap-6" key={index}>
                                   <div className="flex items-center gap-4">
                                        <Text>{toTitleCase(`${type} ${period} ${of.name}`)}</Text>
                                        {
                                             isComplete ?
                                                  (
                                                       <Icon as={HiCheckCircle} w={5} h={5} fill={theme.colors.primary["500"]}></Icon>
                                                  ) :
                                                  (
                                                       <Text fontSize="sm" variant="secondary">{Math.round(progress * 100)}%</Text>
                                                  )
                                        }
                                   </div>
                                   <div>
                                        <RangeSlider start={start} lowerBound={lowerBound} value={current} upperBound={upperBound} end={end} labelFormatter={displayFormatter} />
                                   </div>
                              </ListItemContainer>
                         )
                    })
               }
          </div>
     )
}

const RangeSliderContext = createContext();

const RangeSlider = (props) => {
     let { start, lowerBound, value, upperBound, end, barHeight = 4, thumbSize = 10, labelSize = 12, labelMargin = 10, labelFormatter = (value) => value } = props;
     let [width, setWidth] = useState();
     let sliderRef = useRef(null);
     useEffect(() => {
          setWidth(sliderRef.current.offsetWidth);
     }, [sliderRef.current])
     let getPercentDistance = (v) => {
          return Number((v - start) / (end - start)).toPrecision(2) * 100;
     }
     let rangeSliderContextValue = { getPercentDistance, thumbSize, labelSize, labelMargin, labelFormatter, width };
     return (
          <RangeSliderContext.Provider value={rangeSliderContextValue}>
               <div ref={sliderRef} style={{ paddingTop: labelSize + labelMargin, paddingBottom: labelSize + labelMargin }}>
                    <div className="relative w-full h-1 bg-gray-200 rounded-full" style={{ height: barHeight }}>
                         <RangeSliderTrack value={value} />
                         <RangeSliderThumb value={start} labelPosition="bottom" labelOnly />
                         {
                              lowerBound !== undefined && (
                                   <RangeSliderThumb value={lowerBound} labelPosition="bottom" labelOnly />
                              )
                         }
                         <RangeSliderThumb value={value} />
                         {
                              upperBound !== undefined && (
                                   <RangeSliderThumb value={upperBound} labelPosition="bottom" labelOnly />
                              )
                         }
                    </div>
               </div>
          </RangeSliderContext.Provider>
     )
}

const RangeSliderTrack = (props) => {
     let { value } = props;
     let { getPercentDistance } = useContext(RangeSliderContext);
     let width = 0;
     if (getPercentDistance) {
          width = min(getPercentDistance(value), 100);
     }
     return (
          <div className="absolute h-full bg-blue-500 left-0 top-0  rounded-full" style={{ width: width + "%", backgroundColor: "var(--chakra-colors-primary-500)" }} />
     )
}

const RangeSliderThumb = (props) => {
     let { value, labelPosition, labelOnly } = props;
     let { getPercentDistance, thumbSize, labelSize, labelMargin, labelFormatter, width: sliderWidth } = useContext(RangeSliderContext);
     let left = 0;
     let offsetX = 0;
     let offsetY = - (labelSize + labelMargin);
     let labelRef = useRef();
     let [labelWidth, setLabelWidth] = useState();
     if (sliderWidth && labelWidth) {
          let labelLeftEnd = getPercentDistance(value) / 100 * sliderWidth - labelWidth / 2;
          let labelRightEnd = getPercentDistance(value) / 100 * sliderWidth + labelWidth / 2;
          if (labelLeftEnd < 0) {
               offsetX = - labelLeftEnd;
          }
          else if (labelRightEnd > sliderWidth) {
               offsetX = sliderWidth - labelRightEnd;
          }
     }
     useEffect(() => {
          if (labelRef.current) {
               setLabelWidth(labelRef.current.offsetWidth);
          }
     }, [labelRef.current])
     if (getPercentDistance) {
          left = min(getPercentDistance(value), 100);
     }
     if (labelPosition === "bottom") {
          offsetY = - offsetY;
     }
     else {
          console.log()
     }
     return (
          <div className={`absolute ${labelOnly ? "" : "bg-white rounded-full shadow "}`} style={{ height: thumbSize, width: thumbSize, left: left + "%", top: "50%", transform: "translate(-50%, -50%)" }}>
               {
                    (
                         <div ref={labelRef} className={`absolute`} style={{ width: "max-content", fontSize: `${labelSize}px`, left: "50%", bottom: "-50%", transform: `translate(calc(${offsetX}px - 50%), ${offsetY}px)` }}>
                              <Text variant="secondary">{labelFormatter(round(value))}</Text>
                         </div>
                    )
               }
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