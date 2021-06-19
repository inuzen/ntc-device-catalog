import React, { useState } from 'react';
import { IconButton, TextField, Collapse, Button, ClickAwayListener } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
import './authStyles.scss';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { enableEditing, disableEditing, isEditingAllowed } from '../../store/authSlice';

const AuthComponent = () => {
    // const [locked, setLocked] = useState(true);
    const [showPassField, setShowPassField] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [textError, setTextError] = useState(false);

    const allowEditing = useAppSelector(isEditingAllowed);
    const dispatch = useAppDispatch();

    // Todo use server side password check
    const onTextChange = (e) => {
        if (textError) setTextError(false);
        setCurrentPass(e.target.value);
    };
    const onLockClick = () => {
        if (!allowEditing && !showPassField) {
            setShowPassField(true);
        } else if (!allowEditing && showPassField) {
            setShowPassField(false);
        } else {
            dispatch(disableEditing());
            setShowPassField(false);
            setCurrentPass('');
        }
    };
    const checkPass = async () => {
        const response = await fetch('https://swapi.dev/api/planets/4/');
        const res: any = await response.json();

        if (res.name.toLowerCase() === 'hoth') {
            dispatch(enableEditing());
        } else {
            dispatch(disableEditing());
            setTextError(true);
        }
    };
    const handleClickAway = () => {
        setShowPassField(false);
        setCurrentPass('');
    };
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="auth-container">
                <IconButton color="primary" aria-label="allow editing" onClick={onLockClick}>
                    {!allowEditing ? <Lock /> : <LockOpen />}
                </IconButton>
                <div>
                    <Collapse in={showPassField && !allowEditing}>
                        <div>
                            <TextField
                                label="Enter Password"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                value={currentPass}
                                onChange={onTextChange}
                                error={textError}
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            color="primary"
                                            size="small"
                                            disableElevation
                                            onClick={checkPass}
                                            disabled={!currentPass || textError}
                                        >
                                            Unlock
                                        </Button>
                                    ),
                                }}
                            />
                        </div>
                    </Collapse>
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default AuthComponent;
