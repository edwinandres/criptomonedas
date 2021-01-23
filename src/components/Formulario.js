import React , { useEffect , useState } from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptoMoneda from '../hooks/useCriptoMoneda';
import axios from 'axios';
import Error from './Error'

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


const Formulario = ({ guardarMoneda, guardarCripto }) => {
    //state formulario
    const [listaCripto, guardarListaCripto]=useState([])
    const [error, guardarError] = useState(false)

    //usar useMoneda
    const [moneda,  Seleccionar] = useMoneda('Seleccione su moneda','', Monedas)
    //usar useCriptoMoneda
    const [cripto,  SeleccionarCripto] = useCriptoMoneda('Seleccione Criptomoneda','',listaCripto)
    
    
    useEffect(() => {

        const consultarAPI = async() =>{

            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const lista = await axios.get(url)
            guardarListaCripto(lista.data.Data)
            
        }
        consultarAPI()       
        

    },[])

    const cotizarCriptomoneda = e => {
        e.preventDefault()

        //validar campos vacios
        if(moneda === '' || cripto === ''){
            guardarError(true)
            return;
        }

        //guardar el state
        guardarError(false)
        guardarMoneda(moneda)
        guardarCripto(cripto)
    }
    
    
    return ( 

        <form
            onSubmit={cotizarCriptomoneda}
        >
            {error?<Error mensaje={'Todos los campos son obligatorios'}/>:null}
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