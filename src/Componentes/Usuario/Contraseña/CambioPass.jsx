import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Hide.css'

import Label from "../../ui/label.jsx";
import Input from "../../ui/input.jsx";
import { BiHide, BiShow } from "react-icons/bi";

export default function CambioPass() {
  const [ShowPwd, setShowPwd] = useState(false);
  const [ShowPwds, setShowPwds] = useState(false);
  const [contraseniaNueva, setContraseniaNueva] = useState("");
  const [repetirContraseniaNueva, setRepetirContraseniaNueva] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  const validarContraseniaNueva = (valor) => {
    return valor.length >= 8;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de contraseña nueva
    if (!validarContraseniaNueva(contraseniaNueva)) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    // Validación de coincidencia de contraseñas
    if (contraseniaNueva !== repetirContraseniaNueva) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Si pasa todas las validaciones, enviar la primera solicitud al servidor
    try {
      console.log("Enviando solicitud para cambiar la contraseña con correo:", email);
      const response = await axios.post(
        "https://back-end-siveth-g8vc.vercel.app/api/cambiarContrasenia",
        {
          correo: email,
          contraseniaNueva: contraseniaNueva,
        }
      );

      console.log("Respuesta del servidor para cambiar la contraseña:", response);

      if (response.status === 200) {
        // Si la primera solicitud es exitosa, enviar la segunda solicitud al servidor
        console.log("Enviando solicitud para insertar registro de actualización en el log...");
        const ip = await axios.get("https://api64.ipify.org?format=json");
        console.log("IP del dispositivo:", ip.data.ip);

        const logResponse = await axios.post(
          "https://back-end-siveth-g8vc.vercel.app/api/LogActualiza",
          {
            ip_usuario: ip.data.ip,
            email: email,
            descripcion: `Dato actualizado: contraseña`,
          }
        );

        console.log("Respuesta del servidor para insertar registro en el log:", logResponse);

        if (logResponse.status === 200) {
          alert("Contraseña cambiada exitosamente");
          // Aquí podrías redirigir al usuario a otra página si lo deseas
          navigate("/Login");
        }
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setError(
        "Hubo un error al cambiar la contraseña. Por favor, inténtalo de nuevo."
      );
      console.log("Correo electrónico recibido:", email);
    }
  };

  return (
    <div>
      <section>
        <div
          className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8"
        >
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md .shadow-lg sm:p-8">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight pb-2.5 text-gray-900">
              Cambiar contraseña
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            >
              <div>
                <Label htmlFor="contraseniaNueva">Nueva contraseña</Label>

                <div className="relative">
                  <Input
                    type={ShowPwd ? "text" : "password"}
                    id="contraseniaNueva"
                    value={contraseniaNueva}
                    onChange={(e) => setContraseniaNueva(e.target.value)}
                    placeholder="••••••••"
                    required=""
                  />

                  <div
                    className={`absolute inset-y-0 top-1.5 right-0 pr-3 flex items-center text-sm leading-5 ${
                      ShowPwd ? "" : "hide-password-icon"
                    }`}
                    onClick={() => setShowPwd(!ShowPwd)}
                  >
                    {ShowPwd ? (
                      <BiHide className="text-indigo-600 text-xl" />
                    ) : (
                      <BiShow className="text-indigo-500 text-xl" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="repetirContraseniaNueva">
                  Repetir contraseña
                </Label>
                <div className="relative">
                  <Input
                    type={ShowPwds ? "text" : "password"}
                    id="repetirContraseniaNueva"
                    value={repetirContraseniaNueva}
                    onChange={(e) => setRepetirContraseniaNueva(e.target.value)}
                    placeholder="••••••••"
                    required=""
                  />
                  <div
                    className={`absolute inset-y-0 top-1.5 right-0 pr-3 flex items-center text-sm leading-5 ${
                      ShowPwds ? "" : "hide-password-icon"
                    }`}
                    onClick={() => setShowPwds(!ShowPwds)}
                  >
                    {ShowPwds ? (
                      <BiHide className="text-indigo-600 text-xl" />
                    ) : (
                      <BiShow className="text-indigo-500 text-xl" />
                    )}
                  </div>
                </div>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
