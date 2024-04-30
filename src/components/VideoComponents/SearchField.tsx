import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

interface SearchFieldProps {
    onSearch: (searchQuery: string) => void;
}

function SearchField({ onSearch }: SearchFieldProps) {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchValue);
    };

    return (
        <Grid container spacing={2} alignItems="center" style={{ width: 500 }}>
            <Grid item xs={8}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        style: { color: 'var(--text)' }
                    }}
                    InputLabelProps={{
                        style: { color: 'var(--text)' }
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    style={{ height: '100%', backgroundColor: 'var(--background)' }}
                    variant="contained"
                    onClick={handleSearch}
                    fullWidth
                >
                    Find
                </Button>
            </Grid>
        </Grid>
    );
}

export default SearchField;