import { color, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primary: {
            50: "black",
        },
        secondary: { white: "#ffffff" },
        azulito: "#1E90B5",
    },
    fonts: {
        body: "Roboto, sans-serif",
        heading: "Montserrat, sans-serif",
    },
});

export default theme;
