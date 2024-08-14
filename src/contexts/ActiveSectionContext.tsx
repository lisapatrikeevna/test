import React from 'react';

export type ActiveSectionContextType = {
    activeSection: string | null;
    setActiveSection: React.Dispatch<React.SetStateAction<string | null>>;
};
const ActiveSectionContext = React.createContext<ActiveSectionContextType | undefined>(undefined);

export default ActiveSectionContext;