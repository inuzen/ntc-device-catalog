import React from 'react';
import './styles.scss';
import Search from '../search/Search';
import AuthComponent from '../auth/AuthComponent';
const Header = () => {
    return (
        <div className="container-margin header">
            <Search />
            <AuthComponent />
        </div>
    );
};

export default Header;
