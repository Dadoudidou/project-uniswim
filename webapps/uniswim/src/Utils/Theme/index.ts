import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    props: {
        MuiTextField: {
            variant: "outlined"
        }
    }
});

export const getDefaultTheme = () => theme;