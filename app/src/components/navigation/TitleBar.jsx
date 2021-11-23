import { HiArrowNarrowLeft, HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Link, useStyleConfig } from "@chakra-ui/react";


const TitleBar = (props) => {
     let { title, variant, children, ...rest } = props;
     let navigate = useNavigate();
     const styles = useStyleConfig("TitleBar", { variant });
     return (
          <div {...rest}>
               <Flex width="full" direction="row" justify="space-between" align="center" px="8" py="8">
                    <Link href="" onClick={() => navigate('../')}>
                         <HiArrowNarrowLeft className="w-6 h-6"></HiArrowNarrowLeft>
                    </Link>
                    <Heading as="h1" size="lg">{title}</Heading>
                    <Link>
                         <HiDotsVertical className="w-6 h-6"></HiDotsVertical>
                    </Link>
               </Flex>
          </div>
     )
}

export default TitleBar
