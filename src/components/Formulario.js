import React , { useEffect , useState } from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptoMoneda from '../hooks/useCriptoMoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`
const Monedas=[
    {codigo:'MXN', nombre:'Peso Mexicano'},
    {codigo:'USD', nombre:'Dolar EstadoUnidense'},
    {codigo:'GBP', nombre:'Libra Esterlina'},
    {codigo:'COP', nombre:'Peso Colombiano'}

]

//listaCripto=[lista]


const Formulario = () => {
    //state formulario
    const[listaCripto, guardarListaCripto]=useState([])
    //usar useMoneda
    const [moneda, guardarMoneda, Seleccionar] = useMoneda('Seleccione su moneda','', Monedas)
    //usar useCriptoMoneda
    const [cripto, guardarCripto, SeleccionarCripto] = useCriptoMoneda('Seleccione Criptomoneda','',listaCripto)
    

    useEffect(() => {

        const consultarAPI = async() =>{

            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const lista = await axios.get(url)
            guardarListaCripto(lista.data.Data)
            
        }
        consultarAPI()       
        

    },[])
    
    
    return ( 

        <form>
            <Seleccionar />
            <SeleccionarCripto/>
            <Boton
                type="submit"
                value="Cotizar"
            />
        </form>
     );
}
 
export default Formulario;