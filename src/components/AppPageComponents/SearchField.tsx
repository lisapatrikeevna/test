import { FC, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchFieldProps {
    onSearch: (value: string) => void;
}

const SearchField: FC<SearchFieldProps> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchValue);
        }
    };

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
                        <IconButton onClick={handleClear} size="small">
                            <ClearIcon />
                        </IconButton>
                        <IconButton onClick={handleSearch} size="small">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchField;