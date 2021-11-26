import React from 'react'
import CollapsibleCard from '../../layouts/Card/CollapsibleCard';
import CardStackLayout from '../../layouts/CardStackLayout';
import DietAccordionPreview from '../Diet/DietAccordionPreview';
import DistanceAccordionPreview from '../Distance/DistanceAccordionPreview';
import SleepAccordionPreview from '../Sleep/SleepAccordionPreview';
import StepsAccordionPreview from '../Steps/StepsAccordionPreview';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
     return (
          <div className="Home">
               <div className="flex flex-col gap-6">
                    <CollapsibleCard title="Steps">
                         <StepsAccordionPreview />
                         <Link to="/steps" className="block">
                              <Button isFullWidth>Details</Button>
                         </Link>
                    </CollapsibleCard>
                    <CollapsibleCard title="Distance">
                         <DistanceAccordionPreview />
                         <Link to="/distance" className="block">
                              <Button isFullWidth>Details</Button>
                         </Link>
                    </CollapsibleCard>
                    <CollapsibleCard title="Diet">
                         <DietAccordionPreview />
                         <Link to="/diet" className="block">
                              <Button isFullWidth>Details</Button>
                         </Link>
                    </CollapsibleCard>
                    <CollapsibleCard title="Sleep">
                         <SleepAccordionPreview />
                         <Link to="/sleep" className="block">
                              <Button isFullWidth>Details</Button>
                         </Link>
                    </CollapsibleCard>
               </div>
          </div>
     )
}

export default Home
