import { extendTheme } from "@chakra-ui/react"

const config = {
     useSystemColorMode: false,
     initialColorMode: "light",
}

const theme = extendTheme({ config })

export default theme