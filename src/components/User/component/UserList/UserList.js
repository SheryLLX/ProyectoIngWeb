
import React, { useState, useEffect } from 'react'

export default ({ users }) => {

    const renderedUser = Object.values(users).map((user) => {
        return (
            <tr key={user._id}>
                <th></th>
                <td>{user.name}</td>
                <td>Null</td>
                <td>Null</td>
                <td>Null</td>
                <td>Null</td>
                <td scope="col"> <button className="btn btn-primary">Editar</button> </td>
                <td scope="col"> <button className="btn btn-danger">Eliminar</button> </td>
            </tr>
        )
    })

    return (
        <div className="container" style={{ marginTop: 40 }}>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Cedula</th>
                            <th scope="col">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedUser}
                    </tbody>
                </table>
            </div>
        </div>
    )
}