import React, { useEffect, useState } from "react";
import Axios from "axios";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: "",
    ApellidoP: "",
    ApellidoM: "",
    Usuario: "",
    Telefono: "",
    Correo: "",
    Password: "",
    DescripcionPregunta: "",
    Respuesta: "",
  });
  const [errors, setErrors] = useState({});
  const [preguntas, setPreguntas] = useState([]);

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
        setFormData(response.data);
        console.log("Datos del usuario:", response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    const obtenerPreguntas = async () => {
      try {
        const response = await Axios.get(
          "https://back-end-siveth-g8vc.vercel.app/api/preguntas"
        );
        setPreguntas(response.data);
        console.log("Preguntas:", response.data);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      }
    };

    obtenerUsuario();
    obtenerPreguntas();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (name === "Nombre" || name === "ApellidoP" || name === "ApellidoM") {
      if (/^[a-zA-Z0-9_.+-]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        error =
          "El campo solo puede contener letras, números y los caracteres especiales: _ . + -";
      }
    } else if (name === "Correo") {
      if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        error = "Formato de correo electrónico inválido";
      }
    } else if (name === "Telefono") {
      if (/^\d{8,14}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        error = "Formato de número de teléfono inválido";
      }
    } else if (name === "Password") {
      // Expresión regular para validar contraseña
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
      ) {
        setFormData({ ...formData, [name]: value });
      } else {
        error =
          "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.";
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que todos los campos requeridos estén completos
    const requiredFields = [
      "Nombre",
      "ApellidoP",
      "ApellidoM",
      "Usuario",
      "Telefono",
      "Correo",
      "Password",
      "DescripcionPregunta",
      "Respuesta",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Por favor, completa los campos: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      console.log("Datos a enviar:", formData);
      const response = await Axios.put(
        `https://back-end-siveth-g8vc.vercel.app/api/updateUser/${usuario.Correo}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsuario(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
    }
  };

  return (
    <div>
      <div className="">
        <div className="w-full text-white bg-main-color"></div>

        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-blue-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  Jane Doe
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  Owner at Her Company Inc.
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-9/12 mx-2 md:h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-blue-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Informacion Personal</span>
                </div>
                <div className="text-gray-700">
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 text-sm">
                      {usuario ? (
                        <>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Nombre
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="text"
                                  name="Nombre"
                                  value={formData.Nombre}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.Nombre
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800`}
                                />
                                {errors.Nombre && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.Nombre}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">{usuario.Nombre}</div>
                            )}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Apellido Paterno
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="text"
                                  name="ApellidoP"
                                  value={formData.ApellidoP}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.ApellidoP
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                />
                                {errors.ApellidoP && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.ApellidoP}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">
                                {usuario.ApellidoP}
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Apellido Materno
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="text"
                                  name="ApellidoM"
                                  value={formData.ApellidoM}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.ApellidoM
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                />
                                {errors.ApellidoM && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.ApellidoM}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">
                                {usuario.ApellidoM}
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Nombre de usuario
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="text"
                                  name="Usuario"
                                  value={formData.Usuario}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.Usuario
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                />
                                {errors.Usuario && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.Usuario}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">{usuario.Usuario}</div>
                            )}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Telefono
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="text"
                                  name="Telefono"
                                  value={formData.Telefono}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.Telefono
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                />
                                {errors.Telefono && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.Telefono}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">
                                {usuario.Telefono}
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Email</div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="text"
                                  name="Correo"
                                  value={formData.Correo}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.Correo
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                />
                                {errors.Correo && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.Correo}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">{usuario.Correo}</div>
                            )}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Contraseña
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="password"
                                  name="Password"
                                  value={formData.Password}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.Password
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                />
                                {errors.Password && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.Password}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">********</div>
                            )}
                          </div>

                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Pregunta de seguridad
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <select
                                  name="DescripcionPregunta"
                                  value={formData.DescripcionPregunta}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.DescripcionPregunta
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                >
                                  <option value="">
                                    Selecciona una pregunta
                                  </option>
                                  {preguntas.map((pregunta) => (
                                    <option
                                      key={pregunta.id}
                                      value={pregunta.Descripcion} // Corregido: debería ser pregunta.Descripcion
                                    >
                                      {pregunta.Descripcion} 
                                    </option>
                                  ))}
                                </select>
                                {errors.DescripcionPregunta && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.DescripcionPregunta}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">
                                {usuario.DescripcionPregunta}
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Respuesta
                            </div>
                            {editMode ? (
                              <div className="flex flex-col items-center">
                                <input
                                  type="text"
                                  name="Respuesta"
                                  value={formData.Respuesta}
                                  onChange={handleChange}
                                  className={`w-full rounded border ${
                                    errors.Respuesta
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 max-w-xs`}
                                />
                                {errors.Respuesta && (
                                  <p className="text-red-500 text-xs mt-1 max-w-xs">
                                    {errors.Respuesta}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="px-4 py-2">
                                {usuario.Respuesta}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div>Cargando...</div>
                      )}
                    </div>
                    <div className="mt-4 text-right">
                      {editMode ? (
                        <button
                          type="submit"
                          className="rounded-md bg-green-600 text-white py-2 px-4 hover:bg-green-700 focus:outline-none focus:bg-green-700"
                        >
                          Guardar cambios
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleEditToggle}
                          className="rounded-md bg-gray-600 text-white py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                          Editar
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
