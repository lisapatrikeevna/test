import './App.css'
import {ThemeProvider} from "@mui/material/styles";
import Pricing from './components/Pricing';
import * as React from "react";
import {darkTheme, lightTheme} from "./theme.tsx";
import ToggleColorMode from "./components/ToggleColorMode.tsx";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

  return (
    <>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={mode == "dark" ? darkTheme : lightTheme}>
                <h1>Dark Mode</h1>
<ToggleColorMode toggleColorMode={colorMode.toggleColorMode}/>
                <Pricing/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    </>
  )
}

export default App
