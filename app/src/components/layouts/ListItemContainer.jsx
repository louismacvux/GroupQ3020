import { Box, useStyleConfig } from "@chakra-ui/react"

const ListItemContainer = ({ children, className, ...rest }) => {
     const styles = useStyleConfig("ListItemContainer");
     return (
          <Box className={className} {...styles} {...rest}>
               {
                    children
               }
          </Box>
     )
}

export default ListItemContainer