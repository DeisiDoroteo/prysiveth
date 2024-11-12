import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EnviaPregunta() {
  
  
  const [email, setEmail] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();  

  const obtenerPregunta = async () => {
    try {
      const response = await axios.post('https://back-end-siveth-g8vc.vercel.app/api/pregunta', { correo: email });
      const { pregunta } = response.data;
      setPregunta(pregunta.descripcion);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener la pregunta:", error);
    }
  };
  
  


  const verificarRespuesta = async () => {
    try {
      const response = await axios.post("https://back-end-siveth-g8vc.vercel.app/api/verificarPregunta", {
        correo: email,
        idPregunta: pregunta.id,
        respuesta: respuesta,
      });
      console.log("Respuesta verificada correctamente:", response.data);
      
      // Verifica si la respuesta es correcta
      if (response.status === 200 && response.data.respuestaCorrecta) {
        // Redirige a la pantalla CambioPass y pasa el email como estado
        navigate('/changePass', { state: { email: email } });
      } else {
        // Si la respuesta no es correcta, muestra un mensaje de error
        alert('La respuesta no es correcta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error("Error al verificar la respuesta:", error);
    }
  };

  const handleEnviarRespuesta = () => {
    verificarRespuesta();
  };

  function navigateToOtp() {
    obtenerPregunta();
  }

  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Ingresa tu correo electronico</p>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                </div>
                <div className="mb-6">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <button
                    type="button"
                    onClick={navigateToOtp}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Obtener pregunta
                  </button>
                </div>
                <div className="text-center lg:text-left">
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Pregunta de Seguridad</h2>
            <p className="text-sm mb-4">{pregunta}</p>
            <input
              type="text"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-4"
              placeholder="Escribe tu respuesta"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleEnviarRespuesta}
              >
                Enviar Respuesta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
