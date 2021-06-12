import React, { useState } from 'react';
import { IconButton, TextField, Collapse, Button, ClickAwayListener } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
import './authStyles.scss';

const AuthComponent = () => {
    const [locked, setLocked] = useState(true);
    const [showPassField, setShowPassField] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [textError, setTextError] = useState(false);

    // Todo use server side password check
    const onTextChange = (e) => {
        if (textError) setTextError(false);
        setCurrentPass(e.target.value);
    };
    const onLockClick = () => {
        if (locked && !showPassField) {
            setShowPassField(true);
        } else if (locked && showPassField) {
            setShowPassField(false);
        } else {
            setLocked(true);
            setShowPassField(false);
        }
    };
    const checkPass = () => {
        if (currentPass === '123') {
            setLocked(false);
        } else {
            setLocked(true);
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
                    {locked ? <Lock /> : <LockOpen />}
                </IconButton>
                <div>
                    <Collapse in={showPassField && locked}>
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
