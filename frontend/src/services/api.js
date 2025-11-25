export const fetchData = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/personajes');
        const personajes = await res.json();

        const resLugares = await fetch('http://localhost:3000/api/lugares');
        const lugares = await resLugares.json();

        const resTemporadas = await fetch('http://localhost:3000/api/temporadas');
        const temporadas = await resTemporadas.json();

        const resPelicula = await fetch('http://localhost:3000/api/peliculas');
        const pelicula = await resPelicula.json();

        const resCreadores = await fetch('http://localhost:3000/api/creadores');
        const creadores = await resCreadores.json();

        return { personajes, lugares, temporadas, pelicula, creadores };
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return {};
    }
};