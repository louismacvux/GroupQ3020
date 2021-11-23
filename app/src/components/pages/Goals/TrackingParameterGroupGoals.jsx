import { Divider, Heading } from '@chakra-ui/react';
import React from 'react'
import TrackingParameter from '../../../js/types/tracking/TrackingParameter';
import TrackingParameterGroup from '../../../js/types/tracking/TrackingParameterGroup';
import VirtualTrackingParameter from '../../../js/types/tracking/VirtualTrackingParameter';
import TrackingParameterGoals from './TrackingParameterGoals';
import Card from "../../layouts/Card/Card";
import CardTitle from "../../layouts/Card/CardTitle"
import { result } from 'lodash';

const TrackingParameterGroupGoals = (props) => {
     let { trackingParameterGroup } = props;
     return (
          <>
               {
                    Object.keys(trackingParameterGroup.children).map((key, index) => {
                         let child = trackingParameterGroup.children[key];
                         let result;

                         if (child instanceof TrackingParameter) {
                              result = <TrackingParameterGoals trackingParameter={child} key={index} />;
                         }
                         else if (child instanceof VirtualTrackingParameter) {
                         }
                         else if (child instanceof TrackingParameterGroup) {
                              result = <TrackingParameterGroupGoals trackingParameterGroup={child} isCard="false" key={index} />;
                         }

                         return result;
                    })
               }
          </>
     )
}

export default TrackingParameterGroupGoals
