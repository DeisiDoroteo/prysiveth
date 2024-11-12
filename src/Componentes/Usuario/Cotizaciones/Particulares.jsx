import React, { useState } from "react";
import axios from "axios";

export default function Particulares() {
  const [formData, setFormData] = useState({
    fk_usuario: "alher2803@gmail.com",  
    origen: "CDMX",
    destino: "CDMX",
    calle: "",
    colonia: "",
    codigoPostal: "",
    fecha: "",
    pasajeros: "",
    telefono: ""
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar el error si se corrige el campo
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.calle || formData.calle.length < 4) {
      errors.calle = "La calle es obligatoria y debe tener al menos 4 caracteres";
    }
    if (!formData.colonia || formData.colonia.length < 4) {
      errors.colonia = "La colonia es obligatoria y debe tener al menos 4 caracteres";
    }
    if (!formData.codigoPostal || formData.codigoPostal.length !== 5) {
      errors.codigoPostal = "El código postal es obligatorio y debe tener 5 caracteres";
    }
    if (!formData.telefono || !/^\d{10}$/.test(formData.telefono)) {
      errors.telefono = "El teléfono es obligatorio y debe tener 10 dígitos";
    }
    if (!formData.fecha) {
      errors.fecha = "La fecha es obligatoria";
    }
    if (!formData.pasajeros || parseInt(formData.pasajeros) <= 5) {
      errors.pasajeros = "La cantidad de pasajeros debe ser mayor a 5";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos enviados", formData);
      try {
        const response = await axios.post("https://back-end-siveth-g8vc.vercel.app/api/cotizaV", formData);
        console.log("Respuesta:", response.data);
        setMessage("¡Los datos se enviaron correctamente!");
        // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        setMessage("Hubo un error al enviar los datos. Inténtalo de nuevo más tarde.");
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <form className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8"
    onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl sm:p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Cotización de viajes particulares
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              "Viaja de forma segura y fácil"
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="origen"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Origen
                </label>
                <div className="mt-2">
                  <select
                    value={formData.origen}
                    onChange={handleChange}
                    id="origen"
                    name="origen"
                    autoComplete="origen-name"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                      errors.origen ? 'border-red-500' : ''
                    }`}
                  >
                    <option>CDMX</option>
                    <option>Tampico</option>
                    <option>Monterrey Nuevo León</option>
                    <option>Gaudalajara</option>
                  </select>
                  {errors.origen && (
                    <p className="mt-1 text-xs text-red-500">{errors.origen}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="destino"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Destino
                </label>
                <div className="mt-2">
                  <select
                    value={formData.destino}
                    onChange={handleChange}
                    id="destino"
                    name="destino"
                    autoComplete="destino-name"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
                      errors.destino ? 'border-red-500' : ''
                    }`}
                  >
                    <option>CDMX</option>
                    <option>Tampico</option>
                    <option>Monterrey Nuevo León</option>
                    <option>Gaudalajara</option>
                  </select>
                  {errors.destino && (
                    <p className="mt-1 text-xs text-red-500">{errors.destino}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="calle"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Calle
                </label>
                <div className="mt-2">
                  <input
                    value={formData.calle}
                    onChange={handleChange}
                    type="text"
                    name="calle"
                    id="calle"
                    autoComplete="address-level2"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.calle ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.calle && (
                    <p className="mt-1 text-xs text-red-500">{errors.calle}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="colonia"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colonia
                </label>
                <div className="mt-2">
                  <input
                    value={formData.colonia}
                    onChange={handleChange}
                    type="text"
                    name="colonia"
                    id="colonia"
                    autoComplete="address-level1"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.colonia ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.colonia && (
                    <p className="mt-1 text-xs text-red-500">{errors.colonia}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="codigoPostal"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Código postal
                </label>
                <div className="mt-2">
                  <input
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    type="text"
                    name="codigoPostal"
                    id="codigoPostal"
                    autoComplete="postal-code"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.codigoPostal ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.codigoPostal && (
                    <p className="mt-1 text-xs text-red-500">{errors.codigoPostal}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="pasajeros"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cantidad de pasajeros
                </label>
                <div className="mt-2">
                  <input
                    value={formData.pasajeros}
                    onChange={handleChange}
                    type="number"
                    name="pasajeros"
                    id="pasajeros"
                    autoComplete="pasajeros"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.pasajeros ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.pasajeros && (
                    <p className="mt-1 text-xs text-red-500">{errors.pasajeros}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="fecha"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fecha
                </label>
                <div className="mt-2">
                  <input
                    value={formData.fecha}
                    onChange={handleChange}
                    type="date"
                    name="fecha"
                    id="fecha"
                    autoComplete="fecha"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.fecha ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.fecha && (
                    <p className="mt-1 text-xs text-red-500">{errors.fecha}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Teléfono
                </label>
                <div className="mt-2">
                  <input
                    value={formData.telefono}
                    onChange={handleChange}
                    id="telefono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.telefono ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-xs text-red-500">{errors.telefono}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {message && (
            <div className="mt-4 text-center text-sm text-gray-900">{message}</div>
          )}

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="w-3/12 mt-4 text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-3/12 mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
