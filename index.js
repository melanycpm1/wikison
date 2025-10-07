
class Personaje {
    constructor(nombre, rol, caracteristica, img, frases = []) {
        this.nombre = nombre;
        this.rol = rol;
        this.caracteristica = caracteristica;
        this.img = img;
        this.frases = frases;
    }
    //setter y getter
    getNombre() {
        return this.nombre;
    }

    getRol() {
        return this.rol;
    }

    getCaracteristica() {
        return this.caracteristica;
    }

    getImg() {
        return this.img;
    }

    getFrases() {
        return this.frases;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setRol(rol) {
        this.rol = rol;
    }

    setCaracteristica(caracteristica) {
        this.caracteristica = caracteristica;
    }

    setImg(img) {
        this.img = img;
    }

    setFrases(frases) {
        this.frases = frases;
    }
    //metodos
    agregarFrase(frase) {
        this.frases.push(frase);
    }

    mostrarInfo() {
        return `
        <div class="cntendor_info-personajes">
            <h3>${this.nombre}</h3>
            <p><strong>Rol:</strong> ${this.rol}</p>
            <p><strong>Característica:</strong> ${this.caracteristica}</p>
            <p><strong>Frases:</strong> ${this.frases.join(", ")}</p>
        </div>
        `;
    }
}
function mostrarCreadores(creadores) {
    const contenedor = document.getElementById('contenedorCreadores');
    contenedor.innerHTML = '';

    const c = creadores.creadorPrincipal;
    const div = document.createElement('div');
    div.innerHTML = `
        <h3>${c.nombre}</h3>
        <img src="${c.img}" alt="${c.nombre}" width="150">
        <p><strong>Nacimiento:</strong> ${c.nacimiento}</p>
        <p><strong>Lugar de nacimiento:</strong> ${c.lugarNacimiento}</p>

        <h4>Profesión</h4>
        <ul class="ul">${c.profesion.map(p => `<li>${p}</li>`).join('')}</ul>

        <h4>Roles en la serie</h4>
        <ul class="ul">${c.rolesEnLaSerie.map(r => `<li>${r}</li>`).join('')}</ul>

        <h4>Otras obras</h4>
        <ul class="ul">${c.obrasAdicionales.map(o => `<li>${o}</li>`).join('')}</ul>

        <h4>Historia</h4>
        <p>${creadores.historia}</p>

        <h4>Curiosidades</h4>
        <ul class="ul">${creadores.curiosidades.map(cur => `<li>${cur}</li>`).join('')}</ul>

        <h4>Premios y reconocimientos</h4>
        <ul class="ul">${creadores.premiosYReconocimientos.map(p => `<li>${p}</li>`).join('')}</ul>
    `;
    contenedor.appendChild(div);
}
function mostrarPelicula(pelicula) {
    const contenedor = document.getElementById('contenedorPelicula');
    contenedor.innerHTML = '';

    const div = document.createElement('div');
    div.innerHTML = `
        <h3>${pelicula.titulo} (${pelicula.añoEstreno})</h3>
        <p><strong>Título original:</strong> ${pelicula.tituloOriginal}</p>
        <p><strong>Duración:</strong> ${pelicula.duracionMinutos} minutos</p>
        <p><strong>Director:</strong> ${pelicula.direccion}</p>
        <p><strong>Guion:</strong> ${pelicula.guion.join(', ')}</p>
        <p><strong>Género:</strong> ${pelicula.genero.join(', ')}</p>
        <p><strong>Productora:</strong> ${pelicula.productora}</p>
        <p><strong>País:</strong> ${pelicula.pais}</p>
        <p><strong>Idioma original:</strong> ${pelicula.idiomaOriginal}</p>
        <p><strong>Clasificación:</strong> ${pelicula.clasificacion}</p>
        <p><strong>Música:</strong> ${pelicula.musica}</p>

        <h4>Fechas de estreno</h4>
        <ul class="ul">
            <li><strong>EE.UU.:</strong> ${pelicula.fechaEstreno.eeuu}</li>
            <li><strong>Latinoamérica:</strong> ${pelicula.fechaEstreno.latinoamerica}</li>
            <li><strong>España:</strong> ${pelicula.fechaEstreno.españa}</li>
        </ul>

        <h4>Sinopsis</h4>
        <p>${pelicula.sinopsis}</p>

        <h4>Personajes principales</h4>
        <ul class="ul">
            ${pelicula.personajesPrincipales.map(p => `<li>${p}</li>`).join('')}
        </ul>
    `;
    contenedor.appendChild(div);
}

function guardarPersonajes(personajes) {
    localStorage.setItem('personajes', JSON.stringify(personajes));
}

function cargarPersonajes() {
    const data = localStorage.getItem('personajes');
    return data ? JSON.parse(data) : [];
}
function mostrarTemporadas(temporadas) {
    const contenedor = document.getElementById('contenedorTemporadas');
    contenedor.innerHTML = '';

    temporadas.forEach(t => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>Temporada ${t.temporada}</h3>
            <p><strong>Episodios:</strong> ${t.episodios}</p>
            <p><strong>Primera emisión:</strong> ${t.primeraEmision}</p>
            <p><strong>Última emisión:</strong> ${t.ultimaEmision}</p>
            <p><strong>Audiencia promedio:</strong> ${t.audienciaPromedio} millones</p>
            <p><strong>Década:</strong> ${t.decada}</p>
            <p>${t.descripcion}</p>
            <em>${t.notas}</em>
        `;
        contenedor.appendChild(div);
    });
}
function renderPersonajes(personajes, contenedor) {
    contenedor.innerHTML = '';
    personajes.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('personaje-card');
        div.innerHTML = `
            <div class="cntdor-img"><img src="${p.img}" alt="${p.nombre}" class"img-personaje"></div>
            ${new Personaje(p.nombre, p.rol, p.caracteristica, p.img, p.frases).mostrarInfo()}
        `;
        contenedor.appendChild(div);
    });
}

function renderLugares(lugares, contenedor) {
    contenedor.innerHTML = '';
    lugares.forEach(l => {
        const div = document.createElement('div');
        div.classList.add('lugar-card');
        div.innerHTML = `
            <img src="${l.img}" alt="${l.nombre}">
            <h3>${l.nombre}</h3>
        `;
        contenedor.appendChild(div);
    });
}

async function main() {
    let data;
    try {
        const url = await fetch('https://api.npoint.io/9526d6d18453d5256fcd')
        data = await url.json();

    } catch (error) {
        console.log(`Error al obtener los datos:${error}`)
    }

    if (data) {
        try {
            //querySelector
            let nav = document.querySelector(".nav");
            //createElement
            let div = document.createElement("div");
            let ul = document.createElement("ul");

            ul.classList.add("flex");
            //appendChild
            nav.appendChild(div);
            div.appendChild(ul);
            

            let arrayKey = Object.keys(data);

            for (let index = 0; index < arrayKey.length + 1; index++) {
                let li = document.createElement("li");
                if (index == arrayKey.length) {
                    li.innerHTML = '<i class="fa-solid fa-heart"></i>'
                } else {
                    let key = arrayKey[index];
                    li.innerHTML = `<a href="#${key}" class="font_nav">${key}</a>`;
                }
                ul.appendChild(li);
            }


            const contenedorPersonajes = document.querySelector('#contenedorPersonajes');
            const contenedorLugares = document.querySelector('#contenedorLugares');

            // Cargar personajes desde API o localStorage
            let personajes = cargarPersonajes();
            if (personajes.length === 0) personajes = data.personajes || [];

            renderPersonajes(personajes, contenedorPersonajes);
            renderLugares(data.lugares || [], contenedorLugares);
            guardarPersonajes(personajes);

            // Formulario para agregar personajes
            const form = document.getElementById('formPersonaje');

            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const nuevo = new Personaje(
                        form.nombre.value,
                        form.rol.value,
                        form.caracteristica.value,
                        form.img.value,
                        form.frase.value ? [form.frase.value] : []
                    );

                    personajes.push(nuevo);
                    guardarPersonajes(personajes);
                    renderPersonajes(personajes, contenedorPersonajes);
                    form.reset();
                });
            }
            mostrarTemporadas(data.temporadas);
            mostrarPelicula(data.pelicula);
            mostrarCreadores(data.creadores);

        } catch (error) {
            console.log(`Error al procesar los datos o el DOM: ${error}`);
        }
    }

}

main();