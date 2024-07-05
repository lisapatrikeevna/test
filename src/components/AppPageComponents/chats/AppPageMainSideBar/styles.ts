export const getThemeBackground = (theme: 'light' | 'dark') => {
    if (theme === 'light') {
        return 'linear-gradient( #AE92FF 100%, #917AD8 100%)';
    } else {
        return 'linear-gradient( #6F52C3 100%, #554199 100%)';
    }
};