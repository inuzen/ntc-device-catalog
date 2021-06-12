import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import './searchStyles.scss';
import Paper from '@material-ui/core/Paper';

const Search = () => {
    return (
        <Paper component="form" className="search-container">
            <InputBase
                className="search-input"
                placeholder="Search for device"
                inputProps={{ 'aria-label': 'search catalog' }}
            />
            <IconButton type="submit" className="search-icon" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Search;
