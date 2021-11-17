import { Heading } from '@chakra-ui/react';

const CardTitle = (props) => {
     let { title, leftIcon, rightIcon } = props;
     return (
          <>
               {
                    title && (
                         <>
                              <div className="flex justify-between items-center mb-6">
                                   <div>{leftIcon}</div>
                                   <Heading as="h2" size="md" className="text-center">{title}</Heading>
                                   <div>{rightIcon}</div>
                              </div>
                         </>
                    )
               }
          </>
     )
}

export default CardTitle
