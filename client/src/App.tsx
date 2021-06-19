import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import MainComponent from './components/layout/MainComponent';

import { store } from './store/store';

function App() {
    return (
        <Provider store={store}>
            <MainComponent />
        </Provider>
    );
}

export default App;
