import React from 'react';
import {Link} from 'react-router-dom';

import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <h3 className="header__title">
                <Link to='/'>
                    Game of Thrones DB
                </Link>
            </h3>
            <ul className="header__links">
                <li>
                    <Link to='/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to='/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to='/books/'>Books</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;