import { Box } from '@mui/material';
import styles from "./styles"
import NeuSwitch from "../../../../components/neumorphism/switch/NeuSwitch.tsx";

const ThemeSwitch = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => (
    <Box component="label" sx={styles.themeSwitchLabel}>
        <Box sx={styles.themeSwitchBox} component="div">
            <NeuSwitch
                checked={theme === 'light'}
                onChange={toggleTheme}
                name="check"
                color="primary"
                size='large'
                inputProps={{ 'aria-label': 'theme switch' }}
            />
        </Box>
    </Box>
);

export default ThemeSwitch;
