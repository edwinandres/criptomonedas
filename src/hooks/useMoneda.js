import React , { useState, Fragment }from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`


const useMoneda = (label, stateInicial, listado) => {

    const [moneda, guardarMoneda] = useState(stateInicial)
    

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e=>guardarMoneda(e.target.value)}
                value={moneda}
            >
                
                <option value="">- Seleccione -</option>
                {listado.map((moneda)=>(                    
                    <option key={moneda.codigo} value={moneda.codigo}>{moneda.nombre}</option>
                ))}
            </Select>

        </Fragment>

    )

    return [moneda, guardarMoneda, Seleccionar];
}
 
export default useMoneda;