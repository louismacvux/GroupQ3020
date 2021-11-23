import { extendTheme } from "@chakra-ui/react"

const themeConfig = {
     useSystemColorMode: true,
     initialColorMode: "light",
     styles: {
          global: {
               body: {
                    shadowColor: "red"
               }
          }
     },
     fonts: {
          heading: "Inter",
          body: "Inter"
     },
     components: {
          Heading: {
               baseStyle: ({ colorMode }) => ({
                    fontWeight: "regular",
                    color: colorMode === "light" ? "gray.900" : "gray.100"
               }),
          },
          Text: {
               baseStyle: ({ colorMode }) => ({
                    color: colorMode === "light" ? "gray.700" : "gray.100"
               }),
               variants: {
                    "secondary": ({ colorMode }) => ({
                         color: colorMode === "light" ? "gray.500" : "gray.100"
                    })
               },
          },
          Card: {
               baseStyle: ({ colorMode }) => ({
                    bg: colorMode === "light" ? "white" : "gray.800",
                    p: "8",
                    borderRadius: "lg",
                    shadow: "lg",
               }),
          },
          ListItemContainer: {
               baseStyle: ({ colorMode }) => ({
                    bg: colorMode === "light" ? "gray.50" : "gray.800",
                    p: "4",
                    border: "1px",
                    borderColor: colorMode === "light" ? "gray.200" : "gray.700",
                    borderRadius: "md",
               }),
          },
          Titlebar: {
               baseStyle: {
                    direction: "row",
                    shadow: "lg",
               },
          },
          Icon: {
               variants: {
                    "clickable": (props) => ({
                         cursor: "pointer"
                    }),
                    "disabled": (props) => ({
                         cursor: "not-allowed",
                         opacity: 0.5
                    }),
               },
          },
     }
}

const theme = extendTheme(themeConfig)

export default theme