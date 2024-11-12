import React, { useEffect, useState } from "react";
import Axios from "axios";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const response = await Axios.get(
          "https://back-end-siveth-g8vc.vercel.app/api/getUserByEmail",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsuario(response.data);
        console.log("Datos del usuario:", response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    obtenerUsuario();
  }, []);

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="flex flex-col items-center">
        <div className="bg-white p-5 border-t-4 border-blue-400 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2">
          <div className="text-center mb-5">
            <div className="text-gray-700 font-bold text-lg mb-2">
            Código de Autenticación para Alexa
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h1 className="text-gray-900 font-bold text-4xl leading-8">
                {usuario ? usuario.codigo : "Cargando..."}
              </h1>
              <p className="text-gray-600 mt-2">
                Código de Usuario
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
