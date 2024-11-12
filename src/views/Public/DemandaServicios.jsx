import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DemandaEstetica = () => {
  const { numCitas, serviceName } = useParams();
  const [valorInicial, setValorInicial] = useState("");
  const [tiempoInicial, setTiempoInicial] = useState("");
  const [valorK, setValorK] = useState("");
  const [tiempoK, setTiempoK] = useState("");
  const [tiempoDeseado, setTiempoDeseado] = useState("");
  const [kCalculado, setKCalculado] = useState("");
  const [resultado, setResultado] = useState("");
  const [destinoSeleccionado, setDestinoSeleccionado] = useState("");
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const fechas = [
    { year: 2023, label: "2023" },
    { year: 2024, label: "2024" },
    { year: 2025, label: "2025" },
    { year: 2026, label: "2026" },
    { year: 2027, label: "2027" },
    { year: 2028, label: "2028" },
    { year: 2029, label: "2029" },
    { year: 2030, label: "2030" },
  ];

  const fechasInicial = [
    { year: 2023, label: "2023", demanda: 700 }, 
    { year: 2024, label: "2024", demanda: 800 },
    { year: 2025, label: "2025", demanda: 1500 },
    { year: 2026, label: "2026", demanda: 2700 },
    { year: 2027, label: "2027", demanda: 3880 },
    { year: 2028, label: "2028", demanda: 4900 },
    { year: 2029, label: "2029", demanda: 5500 },
    { year: 2030, label: "2030", demanda: 6550 },
  ];

  useEffect(() => {
    const demandaInicial = obtenerDemandaInicial(tiempoInicial);
    setValorInicial(demandaInicial.toString());
  }, [tiempoInicial]);

  useEffect(() => {
    const demandaInicial = obtenerDemandaK(tiempoK);
    setValorK(demandaInicial.toString());
  }, [tiempoK]);

  const obtenerDemandaInicial = (year) => {
    const fecha = fechasInicial.find((f) => f.year === parseInt(year));
    return fecha ? fecha.demanda : 600;
  };

  const obtenerDemandaK = (year) => {
    const fecha = fechasInicial.find((f) => f.year === parseInt(year));
    return fecha ? fecha.demanda : 600;
  };

  const handleChangeFecha = (e) => {
    const selectedYear = e.target.value;
    setTiempoInicial(selectedYear);
    const demandaInicial = obtenerDemandaInicial(selectedYear);
    setValorInicial(demandaInicial.toString());
  };

  const handleChangeFecha2 = (e) => {
    const selectedYear = e.target.value;
    setTiempoK(selectedYear);
    const demandaK = obtenerDemandaK(selectedYear);
    setValorK(demandaK.toString());
  };

  const calcularK = () => {
    const demandaInicialNum = parseFloat(obtenerDemandaInicial(tiempoInicial));
    const demandaDeseadaNum = parseFloat(valorK);
    const kCalculado = Math.log(demandaDeseadaNum / demandaInicialNum);
    setKCalculado(kCalculado.toFixed(4));
  };

  const calcularDemanda = () => {
    const valorInicialNum = parseFloat(valorInicial);
    const tiempoDeseadoNum = parseFloat(tiempoDeseado);
    const k = parseFloat(kCalculado);

    const demandaCalculada =
      valorInicialNum * Math.exp(k * (tiempoDeseadoNum - 2023));
    setResultado(demandaCalculada.toFixed(1));
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const demandaData = [];
      for (let i = 2023; i <= tiempoDeseadoNum; i++) {
        demandaData.push({
          x: i,
          y: valorInicialNum * Math.exp(k * (i - 2023)),
        });
      }
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: "años",
          datasets: [
            {
              label: "Demandas",
              data: demandaData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Tiempo (años)",
              },
              beginAtZero: true,
            },
            y: {
              title: {
                display: true,
                text: "Demanda",
              },
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Demanda de Boletos Vendidos</h1>
      {/* <h2 className="text-xl font-semibold mb-2">Cálculo de demanda de Boletos</h2> */}

      {/* Selector de destinos */}
      <div className="mb-4">
        {/* <label htmlFor="destino" className="block text-lg font-semibold mb-2">Selecciona un destino:</label> */}
        <select
          className=" cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          value={destinoSeleccionado}
          onChange={(e) => setDestinoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un destino</option>
          <option value="Monterrey">Monterrey</option>
          <option value="Guadalajara">Guadalajara</option>
          <option value="Ciudad de Mexico">Ciudad de Mexico</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        {destinoSeleccionado && (
          <div className="mt-2">
            <p className="text-lg">
              Destino seleccionado: {destinoSeleccionado}
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-100 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label
            htmlFor="categoria"
            className="block text-lg font-semibold mb-2"
          >
            Servicio {serviceName}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Boletos vendidos anteriormente:
            </label>
            <input
              type="text"
              className="form-input rounded-md"
              value={valorInicial}
              readOnly
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Año de referencia:</label>
            <select
              className="absolute cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              id="headlessui-listbox-button-:rt:"
              aria-haspopup="listbox"
              aria-expanded="false"
              data-headlessui-state=""
              value={tiempoInicial}
              onChange={handleChangeFecha}
            >
              {fechasInicial.map((fecha, index) => (
                <option key={index} value={fecha.year}>
                  {fecha.label}
                </option>
              ))}
            </select>

          </div>

          {/* Otros campos y selectores */}

          <div>
            <label className="block text-lg font-semibold mb-2">Demanda:</label>
            <input
              type="number"
              className="form-input rounded-md"
              value={valorK}
              onChange={handleChangeFecha2}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Año (k):</label>
            <select
              className="absolute  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              id="headlessui-listbox-button-:rt:"
              aria-haspopup="listbox"
              aria-expanded="false"
              data-headlessui-state=""
              value={tiempoK}
              onChange={handleChangeFecha2}
            >
              {fechas.map((fecha, index) => (
                <option key={index} value={fecha.year}>
                  {fecha.label}
                </option>
              ))}
            </select>
            
          </div>
        </div>
      </div>

      {/* Tiempo estimado y botón de calcular */}
      <div className="bg-blue-100 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Demanda estimada:
            </label>
            <input
              type="number"
              className="form-input rounded-md"
              value={resultado}
              readOnly
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Año a calcular:
            </label>
            <select
              className="form-select absolute  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              value={tiempoDeseado}
              onChange={(e) => setTiempoDeseado(e.target.value)}
            >
              {fechas.map((fecha, index) => (
                <option key={index} value={fecha.year}>
                  {fecha.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón de calcular */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              calcularK();
              calcularDemanda();
            }}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Calcular Demanda
          </button>
        </div>

        {resultado && (
          <div className="mt-6">
            <p className="text-lg font-semibold">
              Resultado: {resultado} Venta estimados para ese año
            </p>
            <div>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemandaEstetica;
