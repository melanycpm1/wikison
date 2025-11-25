import React from 'react';

const TemporadaCard = ({ temporada }) => {
    return (
        <div className="temporada-card">
            <h3>Temporada {temporada.temporada}</h3>
            <p><strong>Episodios:</strong> {temporada.episodios}</p>
            <p><strong>Primera emisión:</strong> {temporada.primeraEmision}</p>
            <p><strong>Última emisión:</strong> {temporada.ultimaEmision}</p>
            <p><strong>Audiencia promedio:</strong> {temporada.audienciaPromedio} millones</p>
            <p><strong>Década:</strong> {temporada.decada}</p>
            <p>{temporada.descripcion}</p>
            <em>{temporada.notas}</em>
        </div>
    );
};

export default TemporadaCard;