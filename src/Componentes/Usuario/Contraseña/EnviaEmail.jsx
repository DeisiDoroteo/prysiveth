import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EnviaEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function navigateToOtp() {
    if (email) {
      axios.post('https://back-end-siveth-g8vc.vercel.app/api/asignar', {
          correo: email,
        })
        .then((response) => {
          if (response.data.status === 'success') {
            axios.post('https://back-end-siveth-g8vc.vercel.app/api/sendemail', {
                recipient_email: email,
                OTP: response.data.code,
              })
              .then(() => {
                alert("Correo enviado exitosamente.");
                navigate("/code", { state: { email: email } });
              })
              .catch((error) => {
                if (error.response) {
                  console.error("Server responded with an error:", error.response.data);
                  alert("Hubo un error en el servidor al enviar el correo de recuperación.");
                } else if (error.request) {
                  console.error("No response received from server:", error.request);
                  alert("No se recibió respuesta del servidor al enviar el correo de recuperación.");
                } else {
                  console.error("Error setting up request:", error.message);
                  alert("Hubo un error al enviar el correo de recuperación.");
                }
              });
          } else {
            alert("Hubo un error al asignar el código aleatorio.");
          }
        })
        .catch((error) => {
          console.error("Error assigning random code:", error);
          alert("Hubo un error al asignar el código aleatorio.");
        });
    } else {
      alert("Por favor, ingresa tu correo electrónico");
    }
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
                    Enviar código
                  </button>
                </div>
                <div className="text-center lg:text-left">
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
