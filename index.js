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
            <h3>${this.nombre}</h3>
            <p><strong>Rol:</strong> ${this.rol}</p>
            <p><strong>Característica:</strong> ${this.caracteristica}</p>
            <p><strong>Frases:</strong> ${this.frases.join(", ")}</p>
        `;
    }
}

function guardarPersonajes(personajes) {
    localStorage.setItem('personajes', JSON.stringify(personajes));
}

function cargarPersonajes() {
    const data = localStorage.getItem('personajes');
    return data ? JSON.parse(data) : [];
}

async function main() {
    let data;
    try {
        const url = await fetch('https://api.npoint.io/9526d6d18453d5256fcd')
        data=await url.json();

    } catch (error) {
        console.log(`Error al obtener los datos:${error}`)
    }

    if(data){
        try {
            //querySelector
            let nav= document.querySelector(".nav");
            //createElement
            let div=document.createElement("div");
            let ul=document.createElement("ul");
            //appendChild
            nav.appendChild(div);
            div.appendChild(ul);

            let arrayKey= Object.keys(data);

            for (let index = 0; index < arrayKey.length + 1; index++) {
                let li=document.createElement("li");
                if (index==arrayKey.length) {
                    li.innerHTML='<i class="fa-solid fa-heart"></i>'
                }else{
                    let key=arrayKey[index];
                    li.innerHTML=`<a href="#${key}">${key}</a>`;
                }
                ul.appendChild(li);
            }


        } catch (error) {
            console.log(`Error al procesar los datos o el DOM: ${error}`);
        }
    }

}

main();