import React, { useState } from 'react';
import './App.scss';
import TableContainer from './components/table/TableContainer';
import EditDevice from './components/deviceView/EditDevice';
import Header from './components/header/Header';
import Drawer from '@material-ui/core/Drawer';

function App() {
    const [open, setOpen] = useState(false);
    const onButtonClick = () => {
        setOpen(!open);
    };
    return (
        <div className="App">
            <Header />
            <Drawer anchor="left" open={open} className="drawer" onClose={onButtonClick}>
                <EditDevice />
            </Drawer>
            <div className="app-content container-margin">
                <button className="add-device-btn" onClick={onButtonClick}>
                    Add device
                </button>
                <TableContainer />
            </div>
        </div>
    );
}

export default App;
