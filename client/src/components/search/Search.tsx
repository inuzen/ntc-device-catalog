import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './searchStyles.scss';
import { useFormik } from 'formik';
import { Checkbox, FormControlLabel, FormGroup, InputBase, IconButton, Paper, Divider } from '@material-ui/core';

const Search = () => {
    const formik = useFormik({
        initialValues: {
            searchString: '',
            isNTC: false,
            isST: false,
            includeMods: false,
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        // @ts-ignore
        <Paper component="form" className="search-container" onSubmit={formik.handleSubmit}>
            <div className="search-row">
                <InputBase
                    className="search-input"
                    name="searchString"
                    value={formik.values.searchString}
                    onChange={formik.handleChange}
                    placeholder="Search for device"
                    inputProps={{ 'aria-label': 'search catalog' }}
                />
                <IconButton type="submit" className="search-icon" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>
            <Divider orientation="horizontal" className="search-divider" />
            <div>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isNTC"
                                checked={formik.values.isNTC}
                                onChange={formik.handleChange}
                                color="primary"
                            />
                        }
                        label="НТЦ"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isST"
                                checked={formik.values.isST}
                                onChange={formik.handleChange}
                                color="primary"
                            />
                        }
                        label="СТ"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="includeMods"
                                checked={formik.values.includeMods}
                                onChange={formik.handleChange}
                                color="primary"
                            />
                        }
                        label="Модификации"
                    />
                </FormGroup>
            </div>
        </Paper>
    );
};

export default Search;
