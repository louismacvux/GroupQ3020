import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import toTitleCase from "../../../js/utils/toTitleCase";

const SummaryIntervalSelectionModal = (props) => {
     let { interval, intervalOptions, setInterval, isOpen, onClose } = props;
     let handleSelect = (option) => {
          setInterval(option);
          onClose();
     }
     return (
          <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
               <ModalOverlay />
               <ModalContent>
                    <ModalHeader>Select Period</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                         <div className="flex flex-col">
                              {
                                   intervalOptions.map((option, index) => (
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

export default SummaryIntervalSelectionModal;