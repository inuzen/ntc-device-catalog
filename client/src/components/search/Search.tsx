import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './searchStyles.scss';
import { useFormik } from 'formik';
import { Checkbox, FormControlLabel, FormGroup, InputBase, IconButton, Paper, Divider } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
// store
import { useAppDispatch } from '../../store/hooks';
import { searchDevices, clearSearchResults } from '../../store/deviceSlice';
const Search = () => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            searchString: '',
            isNTC: false,
            isST: false,
            includeMods: false,
        },
        onSubmit: (values) => {
            if (formik.dirty) {
                dispatch(searchDevices(values));
            }
        },
    });

    const onClearSearch = () => {
        formik.resetForm();
        dispatch(clearSearchResults());
    };

    return (
        // @ts-ignore
        <Paper component="form" className="search-container" onSubmit={formik.handleSubmit}>
            <div className="search-row">
                <InputBase
                    className="search-input"
                    name="searchString"
                    value={formik.values.searchString}
                    onChange={formik.handleChange}
                    placeholder="Поиск устройтсв"
                    inputProps={{ 'aria-label': 'search catalog' }}
                />
                <div className="control-row">
                    <IconButton
                        type="button"
                        className="clear-icon"
                        aria-label="clear-search"
                        onClick={onClearSearch}
                        size="small"
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                    <IconButton type="submit" className="search-icon" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
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
