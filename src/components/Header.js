import React from "react";
import styled from 'styled-components';

export const Header = () => (
    <header>
        <ImageHeaderContainer>
            <img className="responsive-img" src={require('../images/pexels-karolina-grabowska-4968396.jpg')} alt="Foto de família contando dinheiro"/>
        </ImageHeaderContainer>
    </header>
    
);

const ImageHeaderContainer = styled.figure`
    height: 250px;
    overflow: hidden;
`
