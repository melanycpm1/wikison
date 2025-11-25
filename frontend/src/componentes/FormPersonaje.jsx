import { useState, useEffect } from "react";

function FormPersonaje({ onPersonajeAgregado }) {
    const [nombre, setNombre] = useState("");
    const [rol, setRol] = useState("");
    const [caracteristica, setCaracteristica] = useState("");
    const [img, setImg] = useState("");
    const [frase, setFrase] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validación simple
        if (!nombre || !rol || !caracteristica || !img) {
            setError("Todos los campos obligatorios deben completarse");
            setLoading(false);
            return;
        }

        const nuevoPersonaje = {
            nombre,
            rol,
            caracteristica,
            img,
            frases: frase ? [frase] : []
        };

        try {
            const res = await fetch("http://localhost:3000/api/personajes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoPersonaje)
            });

            const data = await res.json();

            if (res.ok) {
                onPersonajeAgregado(data.data); // informar al padre
                setNombre("");
                setRol("");
                setCaracteristica("");
                setImg("");
                setFrase("");
            } else {
                setError(data.error || "Error al agregar personaje");
            }
        } catch (err) {
            setError("Error al conectar con el servidor");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Característica"
                value={caracteristica}
                onChange={(e) => setCaracteristica(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="URL Imagen"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Frase"
                value={frase}
                onChange={(e) => setFrase(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Agregando..." : "Agregar Personaje"}
            </button>
        </form>
    );
}

export default FormPersonaje;