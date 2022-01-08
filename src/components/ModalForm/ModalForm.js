
import React, { useState } from 'react'

import Card from '../Card/Card'
import ButtonForm from '../Button/ButtonForm'
import './ModalForm.css'

const ModalForm = props => {

    return (
        <div>
            <div className="backdrop" onClick={props.onClose} />
            <Card className="modal tam-middle" >
                <header className="header">
                    <h2>{props.title}</h2>
                </header>
                <div className="content">
                    <p>{props.children}</p>
                </div>
            </Card>
        </div >
    )
}

export default ModalForm;