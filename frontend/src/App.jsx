import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';
import PersonajeCard from './componentes/PersonajeCard';
import LugarCard from './componentes/LugarCard';
import TemporadaCard from './componentes/TemporadaCard';
import Pelicula from './componentes/Pelicula';
import Creadores from './componentes/Creadores';
import "./styles/style.css";

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [pelicula, setPelicula] = useState(null);
  const [creadores, setCreadores] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      const data = await fetchData();
      setPersonajes(data.personajes || []);
      setLugares(data.lugares || []);
      setTemporadas(data.temporadas || []);
      setPelicula(data.pelicula || null);
      setCreadores(data.creadores || null);
    }
    cargarDatos();
  }, []);

  return (
    <div className="App">
      <h1 className="text-center">Personajes</h1>
      <div id="contenedorPersonajes">
        {personajes.map(p => <PersonajeCard key={p.nombre} personaje={p} />)}
      </div>

      <h1 className="text-center">Lugares</h1>
      <div id="contenedorLugares">
        {lugares.map(l => <LugarCard key={l.nombre} lugar={l} />)}
      </div>

      <h1 className="text-center">Temporadas</h1>
      <div id="contenedorTemporadas">
        {temporadas.map(t => <TemporadaCard key={t.temporada} temporada={t} />)}
      </div>

      <h1 className="text-center">Película</h1>
      <div id="contenedorPelicula">
        <Pelicula pelicula={pelicula} />
      </div>

      <h1 className="text-center">Creadores</h1>
      <div id="contenedorCreadores">
        <Creadores creadores={creadores} />
      </div>
    </div>
  );
}

export default App;