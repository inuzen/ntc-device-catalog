import React, { useState } from 'react';
import { IconButton, TextField, Collapse, Button, ClickAwayListener, CircularProgress } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
import './authStyles.scss';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { enableEditing, disableEditing, isEditingAllowed } from '../../store/layoutSlice';
import { axiosAPI } from '../../api/api';

const AuthComponent = () => {
    // const [locked, setLocked] = useState(true);
    const [showPassField, setShowPassField] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [textError, setTextError] = useState(false);

    const allowEditing = useAppSelector(isEditingAllowed);
    const dispatch = useAppDispatch();

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
        const response = await axiosAPI.post('auth', { password: currentPass });

        if (response.data) {
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

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            checkPass();
        }
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
                                label="Введите пароль"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                value={currentPass}
                                onChange={onTextChange}
                                error={textError}
                                onKeyDown={onKeyDown}
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
