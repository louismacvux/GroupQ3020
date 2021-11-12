import { Heading, Divider } from "@chakra-ui/react";

const Card = (props) => {
     let { children, className, title } = props;
     return (
          <div className={`w-full h-full border-2 rounded p-4 ${className}`}>
               {
                    title && (
                         <>
                              <div>
                                   <Heading as="h2" size="md" className="text-center">{title}</Heading>
                              </div>
                              <Divider></Divider>
                         </>
                    )
               }
               {props.children}
          </div>
     )
}

export default Card;