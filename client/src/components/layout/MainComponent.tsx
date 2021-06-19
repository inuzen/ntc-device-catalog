import React, { useState } from 'react';

// components
import TableContainer from '../table/TableContainer';
import EditDevice from '../deviceView/EditDevice';
import Header from '../header/Header';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Fade from '@material-ui/core/Fade';

// styles
import './mainStyles.scss';

// store
import { useAppSelector } from '../../store/hooks';
import { isEditingAllowed } from '../../store/authSlice';

const MainComponent = () => {
    const [open, setOpen] = useState(false);
    const onButtonClick = () => {
        setOpen(!open);
    };

    const allowEditing = useAppSelector(isEditingAllowed);

    return (
        <div className="main-container">
            <Header />
            <Drawer anchor="left" open={open} className="drawer" onClose={onButtonClick}>
                <EditDevice />
            </Drawer>
            <div className="app-content container-margin">
                <div className="add-btn-wrapper">
                    <Fade in={allowEditing}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={onButtonClick}
                            className="add-device-btn"
                            startIcon={<AddBoxIcon />}
                        >
                            Add device
                        </Button>
                    </Fade>
                </div>
                <TableContainer />
            </div>
        </div>
    );
};

export default MainComponent;
