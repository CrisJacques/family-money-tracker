import React from "react";

export const InputField = ({ fieldId, name, type, placeholder, onChange }) => {
    return (
    <div className="input-field col s12">
        <input
            placeholder={ `${placeholder}` }
            id={ `${fieldId}` }
            type={ `${type}` }
            className="validate"
            onChange={ `${onChange}` }
            style={{ background: 'white', padding: '0.5em' , 'padding-top': '0.7em', border: '1.5px solid black', 'border-radius': '8px'}}
        />
        <label style={{ color: 'black', 'font-weight': 'bold', 'padding-top': '1.3em' }} htmlFor={ `${fieldId}` }>{name}</label>
    </div>
    );
};