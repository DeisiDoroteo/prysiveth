import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const destinosTuristicos = [
    {
        "id": 1,
        "name": "Parque Nacional Yellowstone",
        "description": "Uno de los parques más famosos de Estados Unidos, conocido por sus géiseres, fuentes termales y una variada fauna.",
        "price": 0,
        "duration": "2-5 días",
        "image": "https://www.nationalgeographic.com.es/medio/2019/06/18/yellowstone_aec4695b_1200x675.jpg",
        "location": "Wyoming, Estados Unidos",
        "NumVisitas": 100
    },
    {
        "id": 2,
        "name": "Machu Picchu",
        "description": "Antigua ciudad inca ubicada en los Andes peruanos, conocida por sus bien conservadas ruinas y su espectacular paisaje montañoso.",
        "price": 60,
        "duration": "1-2 días",
        "image": "https://m.eldiario.es/fotos/Machu-Picchu_EDIIMA20180123_0069_19.jpg",
        "location": "Cusco, Perú",
        "NumVisitas": 120
    },
    {
        "id": 3,
        "name": "Gran Barrera de Coral",
        "description": "El arrecife de coral más grande del mundo, ubicado frente a la costa de Queensland, Australia. Perfecto para bucear y hacer snorkel.",
        "price": 100,
        "duration": "3-7 días",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-cJvENAWLdrXxW6Z4vTzKtSfzSgKtKTVNA&usqp=CAU",
        "location": "Queensland, Australia",
        "NumVisitas": 80
    },
    {
        "id": 4,
        "name": "Santorini",
        "description": "Isla griega famosa por sus encantadoras playas, sus pueblos blancos y sus atardeceres románticos.",
        "price": 80,
        "duration": "4-7 días",
        "image": "https://www.visitgreece.gr/wp-content/uploads/2020/01/santorini-1817166_1920.jpg",
        "location": "Islas Cícladas, Grecia",
        "NumVisitas": 90
    },
    {
        "id": 5,
        "name": "Kyoto",
        "description": "Antigua capital de Japón, famosa por sus templos, jardines zen, tradiciones artesanales y su gastronomía.",
        "price": 70,
        "duration": "3-5 días",
        "image": "https://www.jrailpass.com/blog/wp-content/uploads/2021/01/kyoto.jpg",
        "location": "Prefectura de Kioto, Japón",
        "NumVisitas": 110
    }
];

const DestinosTuristicos = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Aventura');
    const navigation = useNavigate();
    const destinosFiltrados = destinosTuristicos.filter(destino => destino.category === categoriaSeleccionada);

    const navigateToDemanda = (servicio) => {
        navigation(`/demandas-servicios/${servicio.name}/${servicio.NumCitas}`);
    };
    
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Destinos Turísticos</h1>
            <div className="row mb-3">
                <label htmlFor="categoria" className="col-sm-2 col-form-label">Selecciona una categoría:</label>
                <div className="col-sm-4">
                    <select id="categoria" className="form-select" onChange={(e) => setCategoriaSeleccionada(e.target.value)} value={categoriaSeleccionada}>
                        <option value="Aventura">Aventura</option>
                        <option value="Playa">Playa</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Ciudad">Ciudad</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {destinosFiltrados.map(destino => (
                    <div className="col-md-4 mb-4" key={destino.id} onClick={() => navigateToDemanda(destino)}>
                        <div className="card">
                            <img src={destino.image} className="card-img-top" alt={destino.name} />
                            <div className="card-body">
                                <h5 className="card-title">{destino.name}</h5>
                                <p className="card-text">{destino.description}</p>
                                <p className="card-text">Precio: ${destino.price}</p>
                                <p className="card-text">Duración: {destino.duration}</p>
                                <p className="card-text">Ubicación: {destino.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DestinosTuristicos;
