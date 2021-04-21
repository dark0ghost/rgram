import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
    const logged_out_nav = (
        <ul>
            <li><a href="/login">login</a></li>
            <li><a href="/signup">signup</a></li>
        </ul>
    );

    const logged_in_nav = (
        <ul>
            <li onClick={props.handle_logout}>logout</li>
        </ul>
    );
    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
};