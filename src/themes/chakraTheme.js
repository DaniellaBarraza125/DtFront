import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primary: {
            50: "black",
        },
        secondary: {
            white: "#ffffff",
        },
        azulito: "#1E90B5",
    },
    fonts: {
        body: "Roboto, sans-serif",
        heading: "Montserrat, sans-serif",
    },
    components: {
        CardElement: {
            baseStyle: {
                border: "1px solid",
                borderColor: "gray.300",
                borderRadius: "md",
                padding: "4",
                boxShadow: "sm",
            },
        },
        Toast: {
            variants: {
                customSuccess: {
                    container: {
                        bg: "#FFFFFF",
                        color: "black",
                    },
                },
                customError: {
                    container: {
                        bg: "red.500",
                        color: "white",
                    },
                },
            },
        },
    },
    styles: {
        global: {
            body: {
                color: "black",
            },
            a: {
                color: "black",
            },
        },
    },
});

export default theme;
