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


            //obtencion de keys
            let arrayKey= Object.keys(data);


            arrayKey.forEach(key => {
                let li=document.createElement("li");
                li.innerHTML=`<a href="#${key}">${key}</a>`;
                ul.appendChild(li);
            });


        } catch (error) {
            console.log(`Error al procesar los datos o el DOM: ${error}`);
        }
    }

}

main();