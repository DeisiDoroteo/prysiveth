import { useState } from "react";
import axios from "axios";

export default function Mudanzas() {
  const [formData, setFormData] = useState({
    fk_usuario: "alher2803@gmail.com",
    origen: "CDMX",
    destino: "",
    calle: "",
    colonia: "",
    codigoPostal: "",
    fecha: "",
    telefono: "",
    alcaldia: "",
    numero:""
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.calle || formData.calle.length < 4) {
      errors.calle =
        "La calle es obligatoria y debe tener al menos 4 caracteres";
    }
    if (!formData.colonia || formData.colonia.length < 4) {
      errors.colonia =
        "La colonia es obligatoria y debe tener al menos 4 caracteres";
    }
    if (!formData.alcaldia || formData.alcaldia.length < 4) {
      errors.alcaldia =
        "La alcaldia es obligatoria y debe tener al menos 4 caracteres";
    }
    if (!formData.destino || formData.destino.length < 4) {
      errors.destino =
        "El destino es obligatoria y debe tener al menos 4 caracteres";
    }
    if (!formData.codigoPostal || formData.codigoPostal.length !== 5) {
      errors.codigoPostal =
        "El código postal es obligatorio y debe tener 5 caracteres";
    }
    if (!formData.fecha) {
      errors.fecha = "La fecha es obligatoria";
    }
    if (!formData.telefono || !/^\d{10}$/.test(formData.telefono)) {
      errors.telefono = "El teléfono es obligatorio y debe tener 10 dígitos";
    }
    if (!formData.numero || !/^\d{1,5}$/.test(formData.numero)) {
      errors.numero = "El número es obligatorio y debe tener máximo 5 dígitos";
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar el error si se corrige el campo
    setErrors({ ...errors, [name]: "" });
  };

 

  const handleCodigoPostalChange = async (e) => {
    const codigoPostal = e.target.value;
    setFormData({ ...formData, codigoPostal });

    try {
        const response = await axios.get(
            `https://api.copomex.com/query/info_cp/${codigoPostal}?token=552b309f-e9d8-464b-a874-46efc49d3165`
        );
        const responseData = response.data;

        // Imprimir los datos en la consola
        console.log("Datos de la API de COPOMEX:", responseData);

        const asentamientos = responseData.map((item) => item.response);

        // Obtener los nombres de colonias y municipios
        const colonias = asentamientos.map((asentamiento) => asentamiento.asentamiento);
        const municipios = asentamientos.map((asentamiento) => asentamiento.municipio);
        const estados = asentamientos.map((asentamiento)=>asentamiento.estado);
        const cp = asentamientos.map((asentamiento)=>asentamiento.cp);

        // Actualizar los datos del formulario con la información de COPOMEX
        setFormData({
            ...formData,
            colonia: colonias.join(", "),
            alcaldia: municipios.join(", "),
            destino: estados.join(", "),
            codigoPostal: cp.join(", ")
        });
    } catch (error) {
        console.error("Error al obtener datos del código postal", error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos enviados", formData);
      try {
        const response = await axios.post(
          "https://back-end-siveth-g8vc.vercel.app/api/cotizaM",
          formData
        );
        console.log("Respuesta:", response.data);
        setMessage("¡Los datos se enviaron correctamente!");
        // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        setMessage(
          "Hubo un error al enviar los datos. Inténtalo de nuevo más tarde."
        );
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    
    // Filtrar los elementos seleccionados y sus cantidades asociadas
    const elementosSeleccionados = Object.keys(formData).filter((key) => {
      // Verificar si el nombre de la clave es un checkbox y está marcado
      if (key.includes('-checkbox') && formData[key]) {
        // Extraer el nombre del elemento y su cantidad asociada
        const nombre = key.replace('-checkbox', '');
        const cantidad = formData[`${nombre}-cantidad`];
        return { nombre, cantidad };
      }
      return null;
    });
  
    // Crear el array de elementos para enviar en la segunda solicitud
    const elementosParaSolicitud2 = elementosSeleccionados.map(({ nombre, cantidad }) => ({
      nombre: `${nombre} (Cantidad: ${cantidad})`,
    }));
  
    // Realizar la solicitud POST con Axios
    try {
      const response = await axios.post('URL_DE_TU_ENDPOINT', elementosParaSolicitud2);
      console.log('Respuesta del servidor:', response.data);
      // Aquí puedes manejar la respuesta del servidor si es necesario
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Aquí puedes manejar el error si ocurre
    }
  };
  

  return (
    <form
      className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8"
      onSubmit={handleSubmit}
    >
      <div className="space-y-12">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl sm:p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Cotización de mudanzas
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              "Mudarse nunca fue tan fácil"
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="Origen"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>CDMX</option>
                    <option>Tampico</option>
                    <option>Monterrey Nuevo León</option>
                    <option>Gaudalajara</option>
                  </select>
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
                  <input
                    value={formData.destino}
                    onChange={handleChange}
                    id="destino"
                    name="destino"
                    type="text"
                    autoComplete="destino-name"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.destino ? "border-red-500" : ""
                    }`}
                  />
                  {errors.destino && (
                    <p className="mt-1 text-xs text-red-500">{errors.destino}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="calle"
                  className="block text-sm font-medium leading-6 text-gray-900 mt-6"
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
                      errors.calle ? "border-red-500" : ""
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
                  className="block text-sm font-medium leading-6 text-gray-900 mt-6"
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
                      errors.colonia ? "border-red-500" : ""
                    }`}
                  />
                  {errors.colonia && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.colonia}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
        <label
          htmlFor="codigoPostal"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Código postal del destino
        </label>
        <label
          htmlFor="codigoPostal"
          className="block text-sm font-small leading-1 text-gray-900 mt-1"
        >
          (Llenar este campo primero)
        </label>
        <div className="mt-2">
          <input
            value={formData.codigoPostal}
            onChange={handleCodigoPostalChange} // Modificado aquí
            type="text"
            name="codigoPostal"
            id="codigoPostal"
            autoComplete="postal-code"
            className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
              errors.codigoPostal ? "border-red-500" : ""
            }`}
          />
          {errors.codigoPostal && (
            <p className="mt-1 text-xs text-red-500">
              {errors.codigoPostal}
            </p>
          )}
        </div>
      </div>

      <div className="sm:col-span-2">
                <label
                  htmlFor="numero"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Número de casa
                </label>
                <div className="mt-2">
                  <input
                    value={formData.numero}
                    onChange={handleChange}
                    type="text"
                    name="numero"
                    id="numero"
                    autoComplete="address-level1"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.numero ? "border-red-500" : ""
                    }`}
                  />
                  {errors.numero && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.numero}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="alcaldia"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Alcaldía/Municipio
                </label>
                <div className="mt-2">
                  <input
                    value={formData.alcaldia}
                    onChange={handleChange}
                    type="text"
                    name="alcaldia"
                    id="alcaldia"
                    autoComplete="postal-code"
                    className={`block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.alcaldia ? "border-red-500" : ""
                    }`}
                  />
                  {errors.alcaldia && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.alcaldia}
                    </p>
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
                      errors.fecha ? "border-red-500" : ""
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
                      errors.telefono ? "border-red-500" : ""
                    }`}
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.telefono}
                    </p>
                  )}
                </div>
              </div>

             

            </div>
          </div>

          <div id="app" className="mt-6 max-w-lg overflow-y-auto max-h-60 rounded-md bg-gray-100 p-4">
  <h2 className="text-lg font-semibold mb-2">Especificaciones de envio</h2>


  <form onSubmit={handleSubmit2}>
  <ul className="space-y-4">
    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Cama matrimonial
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Cama individual
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Litera
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    
    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-2"
          name="person-2"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-2"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Sofá
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />

        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Mesa (platico/madera)
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-3"
          name="person-3"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-3"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Comedor
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Comedor de crital
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Sillas
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-4"
          name="person-4"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-4"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Ropero
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
      
    </li>
    
    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-5"
          name="person-5"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-5"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Tocador
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-6"
          name="person-6"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-6"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Poff
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-7"
          name="person-7"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-7"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Sillón
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-8"
          name="person-8"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-8"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Televisión
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-9"
          name="person-9"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-9"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Espejo
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-10"
          name="person-10"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-10"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Escritorio
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-10"
          name="person-10"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-10"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Buró
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Refrigerador
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Refrigerador de dos puertas
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

    <li className="flex items-center space-x-4">
      <div className="w-1/2 flex items-center">
        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="person-1"
          className="text-sm font-medium text-gray-900 ml-2"
        >
          Trastero
        </label>
      </div>
      <input
        type="number"
        className="border-gray-300 rounded-md h-8 px-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Cantidad"
      />
    </li>

  </ul>
  <button type="submit"  className="w-3/12 mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 ease-in-out"
  >
  Guardar</button>
  </form>
</div>

          {message && (
            <div className="mt-4 text-center text-sm text-gray-900">
              {message}
            </div>
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
              className="w-3/12 mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 ease-in-out"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}



/* <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Imagen de la cantidad de cosas a trasnportar
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Subir imagen</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">/ Arrastra y suelta la imagen</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, JPEG imagen no mayor a los 10MB
                  </p>
                </div>
              </div>
            </div>
          </div> */
