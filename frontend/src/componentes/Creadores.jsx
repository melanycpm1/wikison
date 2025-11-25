import React from 'react';

const Creadores = ({ creadores }) => {
    if (!creadores) return null;

    const c = creadores.creadorPrincipal;

    return (
        <div className="creadores-card">
            <h3>{c.nombre}</h3>
            <img src={c.img} alt={c.nombre} width="150" />
            <p><strong>Nacimiento:</strong> {c.nacimiento}</p>
            <p><strong>Lugar de nacimiento:</strong> {c.lugarNacimiento}</p>

            <h4>Profesión</h4>
            <ul className='list'>{c.profesion.map((p, i) => <li key={i}>{p}</li>)}</ul>

            <h4>Roles en la serie</h4>
            <ul className='list'>{c.rolesEnLaSerie.map((r, i) => <li key={i}>{r}</li>)}</ul>

            <h4>Otras obras</h4>
            <ul className='list'>{c.obrasAdicionales.map((o, i) => <li key={i}>{o}</li>)}</ul>

            <h4>Historia</h4>
            <p>{creadores.historia}</p>

            <h4>Curiosidades</h4>
            <ul className='list'>{creadores.curiosidades.map((cur, i) => <li key={i}>{cur}</li>)}</ul>

            <h4>Premios y reconocimientos</h4>
            <ul className='list'>{creadores.premiosYReconocimientos.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
    );
};

export default Creadores;