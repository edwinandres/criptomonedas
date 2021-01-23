import React from 'react'
import styled from '@emotion/styled'


const MensajeError = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: #FFF;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
    font-color: white;
`;

const Error = (props) => {

    return (
       <MensajeError>
           {props.mensaje}
       </MensajeError>
    )
}

export default Error
