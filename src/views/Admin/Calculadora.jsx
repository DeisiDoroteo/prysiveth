import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const SocialTrafficComponent = () => {
  const [data, setData] = useState([
    { month: 'Enero', demand: 1500 },
    { month: 'Febrero', demand: 1800 },
    { month: 'Marzo', demand: 2000 },
    { month: 'Abril', demand: 2200 },
    { month: 'Mayo', demand: 2500 },
    { month: 'Junio', demand: 2800 },
    { month: 'Julio', demand: 3000 },
    { month: 'Agosto', demand: 3200 },
    { month: 'Septiembre', demand: 3400 },
    { month: 'Octubre', demand: 3600 },
    { month: 'Noviembre', demand: 3800 },
    { month: 'Diciembre', demand: 4000 },
  ]);

  useEffect(() => {
    drawChart(data);
  }, [data]); // Dibuja el gráfico cuando los datos cambian

  const fetchDataFromAPI = () => {
    // Aquí iría tu lógica para obtener los datos de la API
    // Por ahora, usaremos los datos de ejemplo
    // Puedes reemplazar estos datos con la lógica real de tu API
    const exampleData = [
      { month: 'Enero', demand: 2000 },
      { month: 'Febrero', demand: 2200 },
      { month: 'Marzo', demand: 2400 },
      { month: 'Abril', demand: 2600 },
      { month: 'Mayo', demand: 2800 },
      { month: 'Junio', demand: 3000 },
      { month: 'Julio', demand: 3200 },
      { month: 'Agosto', demand: 3400 },
      { month: 'Septiembre', demand: 3600 },
      { month: 'Octubre', demand: 3800 },
      { month: 'Noviembre', demand: 4000 },
      { month: 'Diciembre', demand: 4200 },
    ];
    setData(exampleData);
  };

  const drawChart = (data) => {
    const labels = data.map(item => item.month);
    const demandData = data.map(item => item.demand);
  
    const ctx = document.getElementById('myChart');
  
    // Intenta encontrar el gráfico existente
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      // Si se encuentra un gráfico existente, destrúyelo
      existingChart.destroy();
    }
  
    // Crea un nuevo gráfico
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Demanda Potencial',
          data: demandData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-4/12 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Cálculo de la demanda potencial
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button onClick={fetchDataFromAPI} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  Actualizar Datos
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full border-collapse text-blueGray-700">
              <thead className="thead-light">
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Meses del Año
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Demanda Potencial
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {item.month}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.demand}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Sección del gráfico */}
      <div className="w-full xl:w-4/12 px-4 mx-auto mt-8">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Gráfico de Demanda Potencial</h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialTrafficComponent;
