import { Heading, Divider } from "@chakra-ui/react";

const Card = (props) => {
     let { header, className } = props;
     return (
          <div className={`w-full h-full border-2 rounded p-6 ${className}`}>
               {props.children}
          </div>
     )
}

export default Card;