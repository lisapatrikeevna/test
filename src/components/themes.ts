// themes.ts

export interface Theme {
    body: string;
    inverted_body: string;
    text: string;
    toggleBorder: string;
    background: string;
    toggle: string;
    shadow_outer_light: string;
    shadow_outer_dark: string;
    shadow_inner_light: string;
    shadow_inner_dark: string;
    button_border_radius: string;
    button_border: string;
    marker_border_radius: string;
    toggle_background: string;
    violet: string;
    blue: string;
    orange: string;
  }
  
  export const lightTheme: Theme = {
    body: '#e0e0e0',
    inverted_body: '#222222',
    text: '#222222',
    background: '#e0e0e0',
    toggleBorder: "",
    toggle: "",
    shadow_outer_light: '#ffffff7f',
    shadow_outer_dark: '#00000033',
    shadow_inner_light: '#00000033',
    shadow_inner_dark: '#ffffff7f',
    button_border_radius: "25px",
    button_border: '#F22874',
    marker_border_radius: "10px",
    toggle_background: 'linear-gradient(90deg, var(--blue) 0%, var(--violet) 100%)',
    violet: '#cb27d1',
    blue: '#2f65d7',
    orange: '#ecd358'
  };
  
  export const darkTheme: Theme = {
    body: '#222222',
    inverted_body: '#e0e0e0',
    text: '#e0e0e0',
    background: '#222222',
    toggleBorder: "",
    toggle: "",
    shadow_outer_light: '#ffffff19',
    shadow_outer_dark: '#00000099',
    shadow_inner_light: '#000000b2',
    shadow_inner_dark: '#ffffff0c',
    button_border_radius: "25px",
    button_border: '#cb27d1',
    marker_border_radius: "10px",
    toggle_background: 'linear-gradient(90deg, var(--violet) 0%, var(--blue) 100%)',
    violet: '#cb27d1',
    blue: '#2f65d7',
    orange: '#eca858'
  };
  