import { Switch } from '@mui/material';
import * as React from 'react';

interface ToggleColorModeProps {
    toggleColorMode: () => void;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ toggleColorMode }) => {

    return (
        <div>
            <Switch onChange={toggleColorMode} />
        </div>
    );
}

export default ToggleColorMode;