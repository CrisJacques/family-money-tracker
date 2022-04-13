import React, { useState } from "react";

export const InputField = ({ fieldName, htmlFor }) => {
    return (
    <div className="input-field col s12">
        <label style={{ color: 'black', 'font-weight': 'bold', 'padding-top': '1.3em' }} htmlFor={ `${htmlFor}` }>{fieldName}</label>
        <input
            className="form-control"
            style={{ background: 'white', padding: '0.5em' , 'padding-top': '0.7em', border: '1.5px solid black', 'border-radius': '8px'}}
        />
    </div>
    );
};