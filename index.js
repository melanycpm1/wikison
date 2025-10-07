async function main() {
    let data;
    try {
        const url = await fetch('https://api.npoint.io/9526d6d18453d5256fcd')
        data=await url.json();

    } catch (error) {
        console.log(`Error al obtener los datos:${error}`)
    }

}

main();