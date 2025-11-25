import React from 'react';

const Pelicula = ({ pelicula }) => {
    if (!pelicula) return null;

    return (
        <div className="pelicula-card">
            <h3>{pelicula.titulo} ({pelicula.añoEstreno})</h3>
            <p><strong>Título original:</strong> {pelicula.tituloOriginal}</p>
            <p><strong>Duración:</strong> {pelicula.duracionMinutos} minutos</p>
            <p><strong>Director:</strong> {pelicula.direccion}</p>
            <p><strong>Guion:</strong> {pelicula.guion.join(', ')}</p>
            <p><strong>Género:</strong> {pelicula.genero.join(', ')}</p>
            <p><strong>Productora:</strong> {pelicula.productora}</p>
            <p><strong>País:</strong> {pelicula.pais}</p>
            <p><strong>Idioma original:</strong> {pelicula.idiomaOriginal}</p>
            <p><strong>Clasificación:</strong> {pelicula.clasificacion}</p>
            <p><strong>Música:</strong> {pelicula.musica}</p>

            <h4>Fechas de estreno</h4>
            <ul className="ul">
                <li><strong>EE.UU.:</strong> {pelicula.fechaEstreno.eeuu}</li>
                <li><strong>Latinoamérica:</strong> {pelicula.fechaEstreno.latinoamerica}</li>
                <li><strong>España:</strong> {pelicula.fechaEstreno.españa}</li>
            </ul>

            <h4>Sinopsis</h4>
            <p>{pelicula.sinopsis}</p>

            <h4>Personajes principales</h4>
            <ul className="ul">
                {pelicula.personajesPrincipales.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
        </div>
    );
};

export default Pelicula;