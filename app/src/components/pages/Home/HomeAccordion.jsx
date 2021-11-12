import React, { useContext } from 'react'

import {
     Accordion,
     AccordionItem,
     AccordionButton,
     AccordionPanel,
     AccordionIcon,
} from "@chakra-ui/react"

import { AppContext } from '../../App';

const HomeAccordion = () => {
     const [appData] = useContext(AppContext);
     const { homeAccordionItems } = appData.settings;
     return (
          <div>
               <Accordion allowToggle="true">
                    {
                         homeAccordionItems.map((item, index) => {
                              return (
                                   <AccordionItem key={index}>
                                        <AccordionButton>
                                             <div className="flex w-full justify-between align-center p-4">
                                                  {
                                                       item.name
                                                  }
                                                  <AccordionIcon />
                                             </div>
                                        </AccordionButton>
                                        <AccordionPanel>
                                             <div className="p-4">
                                                  {
                                                       item.previewComponent()
                                                  }
                                             </div>
                                        </AccordionPanel>
                                   </AccordionItem>
                              )
                         })
                    }
               </Accordion>
          </div>
     )
}

export default HomeAccordion
