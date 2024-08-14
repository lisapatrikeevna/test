import { Switch } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

interface ToggleColorModeProps {
    toggleColorMode: () => void;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ toggleColorMode }) => {

    return (
        <Box>
            <Switch onChange={toggleColorMode} />
        </Box>
    );
}

export default ToggleColorMode;