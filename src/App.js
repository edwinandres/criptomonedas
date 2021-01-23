import React , { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import imagen from './criptomonedas.png'
import Formulario from './components/Formulario'
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('')
  const [cripto, guardarCripto] = useState('')
  const [cotizacion, guardarCotizacion] = useState({})
  const [cargando, guardarCargando] = useState(false)


  useEffect(() =>{

    if(moneda === '')return;
    
    const cotizarMoneda = async () => {
      const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
      const response = await axios.get(url)

      //mostrar spinner
      guardarCargando(true)

      //esperar 2.5 segundos para cambiar el estado de cargando a false
      setTimeout(() =>{
        
        guardarCotizacion(response.data.DISPLAY[cripto][moneda])
        guardarCargando(false)

      },2500)

      console.log(response.data.DISPLAY[cripto][moneda])
    }
    cotizarMoneda()

  },[moneda,cripto])


  //cambiar el componente a mostrar segun el estado de cargando
  const componente = (cargando)?<Spinner/>:<Cotizacion cotizacion={cotizacion}/>

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt={"criptomonedas"}
        />

      </div>
      <div>
        <Heading>Cotiza tus criptomonedas</Heading>
        <Formulario
          guardarCripto={guardarCripto}
          guardarMoneda={guardarMoneda}
        />
        {componente}

      </div>

    </Contenedor>
  );
}

export default App;
