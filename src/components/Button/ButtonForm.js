
import React from 'react'

import './ButtonForm.css'

const ButtonForm = props => {

    return (
        <button 
            className="button" 
            type={props.type || 'button'} 
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default ButtonForm;