import React, { useState } from "react";

export const InputField = ({ name, id, type, placeholder, htmlFor }) => {
    const [field, setField] = useState("");

    const onChangeField = (e) => {
        const field = e.target.value;
        setField(field);
    };

    return (
    <div className="input-field col s12">
        <input
            id={ `${id}` }
            type={ `${type}` }
            placeholder={ `${placeholder}` }
            className="validate"
            value={field}
            onChange={onChangeField}
            style={{ background: 'white', padding: '0.5em' , 'padding-top': '0.7em', border: '1.5px solid black', 'border-radius': '8px'}}
        />
        <label style={{ color: 'black', padding: '0.5em', 'font-weight': 'bold' }} htmlFor={ `${htmlFor}` }>{name}</label>
    </div>
    );
};