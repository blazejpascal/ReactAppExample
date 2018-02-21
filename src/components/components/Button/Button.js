import React from 'react';
import './Button.css';
import PropTypes from 'prop-types'

const Button = (props) => {
    const {
        onClick,
        children,
        className,
    } = props

    return(
        <button
        onClick={onClick}
        className={className}
        type="button"
        >
            {children}
        </button>
    )
}
Button.defaultProps = {
    className: '',
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default Button