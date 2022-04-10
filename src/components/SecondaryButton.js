import React, { useState } from "react";
import SecondaryButtonContainer from '../styles/SecondaryButtonContainer';

export const SecondaryButton = ({ name }) => (
    <SecondaryButtonContainer>
        {name}
    </SecondaryButtonContainer>
);