import { Heading } from '@chakra-ui/react';

const CardTitle = ({ children, leftIcon, rightIcon, ...rest }) => {
     return (
          <>
               {
                    children && (
                         <>
                              <div className="flex justify-between items-center mb-6">
                                   <div>{leftIcon}</div>
                                   <Heading as="h2" className="text-center" {...rest}>{children}</Heading>
                                   <div>{rightIcon}</div>
                              </div>
                         </>
                    )
               }
          </>
     )
}

export default CardTitle
