import { HiArrowNarrowLeft, HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";


const TitleBar = (props) => {
     let navigate = useNavigate();
     let { title } = props;
     return (
          <div className="flex justify-between items-center p-8">
               <div>
                    <a href="" onClick={() => navigate('../')}>
                         <HiArrowNarrowLeft className="w-6 h-6"></HiArrowNarrowLeft>
                    </a>
               </div>
               <div className="text-xl font-semibold">
                    <Heading as="h1" size="lg">{title}</Heading>
               </div>
               <div>
                    <a href="">
                         <HiDotsVertical className="w-6 h-6"></HiDotsVertical>
                    </a>
               </div>
          </div>
     )
}

export default TitleBar
