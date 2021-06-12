import React from 'react';
import './styles.scss';
import Search from '../search/Search';
const Header = () => {
    return (
        <div className="container-margin header">
            <Search />
            <div>auth field</div>
        </div>
    );
};

export default Header;
