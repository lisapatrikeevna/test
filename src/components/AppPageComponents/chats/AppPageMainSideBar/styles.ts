export const getThemeBackground = (theme: 'light' | 'dark') => {
    if (theme === 'light') {
        return 'linear-gradient(to right, #AE92FF, #917AD8)';
    } else {
        return 'linear-gradient(to right, #6F52C3, #554199)';
    }
};