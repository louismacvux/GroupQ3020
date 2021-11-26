import { Heading, Flex, Box, useStyleConfig } from '@chakra-ui/react';

const CardTitle = ({ children, leftIcon, rightIcon, variant, onClick, size, ...rest }) => {
     const styles = useStyleConfig("CardTitle", { variant })
     let onBarClick;
     let onLabelClick = onClick;
     if (!leftIcon && !rightIcon) {
          onBarClick = onClick;
          onLabelClick = null;
     }
     return (
          <>
               {
                    children && (
                         <Flex direction="row" justifyContent="space-between" alignItems="center" onClick={onBarClick} {...rest} {...styles}>
                              <Box>{leftIcon}</Box>
                              <Heading as="h2" className="text-center" size={size} onClick={onLabelClick}>{children}</Heading>
                              <Box>{rightIcon}</Box>
                         </Flex>
                    )
               }
          </>
     )
}

export default CardTitle
