import React from 'react';
import './App.scss';
import TableContainer from './components/table/TableContainer';
import EditDevice from './components/deviceView/EditDevice';

function App() {
    return (
        <div className="App">
            <TableContainer />
            <EditDevice />
        </div>
    );
}

export default App;
