import { extendTheme } from "@chakra-ui/react"
import { transparentize, darken, lighten } from "@chakra-ui/theme-tools";

let colors = {
     primary: {
          500: "#d5bb33"
     }
}

colors.primary = {
     50: lighten(colors.primary["500"], 45)(),
     100: lighten(colors.primary["500"], 40)(),
     200: lighten(colors.primary["500"], 30)(),
     300: lighten(colors.primary["500"], 20)(),
     400: lighten(colors.primary["500"], 10)(),
     ...colors.primary,
     600: darken(colors.primary["500"], 10)(),
     700: darken(colors.primary["500"], 20)(),
     800: darken(colors.primary["500"], 30)(),
     900: darken(colors.primary["500"], 40)()
}

const themeConfig = {
     useSystemColorMode: true,
     initialColorMode: "light",
     colors,
     shadows: {
          outline: `0 0 0 3px ${transparentize(colors.primary["500"], 0.5)()}`,
     },
     styles: {
          global: {
               body: {
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
                         color: colorMode === "light" ? "gray.500" : "gray.500"
                    })
               },
          },
          FormLabel: {
               baseStyle: ({ colorMode }) => ({
                    fontWeight: "regular"
               }),
          },
          Button: {
               baseStyle: ({ colorMode }) => ({
                    fontWeight: "regular",
               }),
               variants: {
                    solid: ({ colorMode }) => ({
                         bg: colorMode === "light" ? "primary.500" : "primary.500",
                         _active: {
                              bg: colorMode === "light" ? colors.primary["600"] : colors.primary["600"]
                         },
                         _hover: {
                              bg: colorMode === "light" ? colors.primary["600"] : colors.primary["600"]
                         },
                         color: colorMode === "light" ? "white" : "gray.900"
                    })
               }
          },
          Card: {
               baseStyle: ({ colorMode }) => ({
                    bg: colorMode === "light" ? "white" : "gray.700",
                    p: "8",
                    borderRadius: "lg",
                    shadow: "md",
                    border: "1px",
                    borderColor: colorMode === "light" ? "gray.200" : "gray.600",
               }),
          },
          CardTitle: {
               baseStyle: ({ colorMode }) => ({
               }),
          },
          ListItemContainer: {
               baseStyle: ({ colorMode }) => ({
                    bg: colorMode === "light" ? "gray.50" : "gray.700",
                    p: "4",
                    border: "1px",
                    borderColor: colorMode === "light" ? "gray.200" : "gray.600",
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
          Input: {
               defaultProps: {
                    focusBorderColor: "primary.500"
               }
          },
          NumberInput: {
               defaultProps: {
                    focusBorderColor: "primary.500"
               }
          },
          Select: {
               defaultProps: {
                    focusBorderColor: "primary.500"
               }
          },
          Switch: {
               baseStyle: (props) => ({
                    focusBorderColor: 'primary.500',
                    track: {
                         _checked: {
                              bg: "primary.500"
                         },
                    }
               }),
          },
     }
}

const theme = extendTheme(themeConfig)

export default theme