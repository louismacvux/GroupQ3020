import { Heading } from '@chakra-ui/react';

const CardTitle = (props) => {
     let { children, leftIcon, rightIcon } = props;
     return (
          <>
               {
                    children && (
                         <>
                              <div className="flex justify-between items-center mb-6">
                                   <div>{leftIcon}</div>
                                   <Heading as="h2" size="md" className="text-center">{children}</Heading>
                                   <div>{rightIcon}</div>
                              </div>
                         </>
                    )
               }
          </>
     )
}

export default CardTitle
