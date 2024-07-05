import { FC, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Props type definition for SearchField component
interface SearchFieldProps {
  onSearch: (value: string) => void;
}

// Search field component with clear and search buttons
const SearchField: FC<SearchFieldProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  // Handle the search action
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  // Handle clearing the search input
  const handleClear = () => {
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {/* Clear button */}
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
            {/* Search button */}
            <IconButton onClick={handleSearch} size="small">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
          '.MuiInputBase-input': {
              height: '43px',
               // Adjust padding as needed
          },
          '.MuiOutlinedInput-root': {
              height: '43px',
               // Ensure the input content is vertically centered
          }
      }}
    />
  );
};

export default SearchField;
