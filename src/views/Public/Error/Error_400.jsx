// Error400.js
import React from "react";


const solicitud400 = () => {
  return (

<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="text-center">
    <p className="text-base font-semibold text-indigo-600">"Error 400"</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Error en la solicitud</h1>
    <p className="mt-6 text-base leading-7 text-gray-600">"¡Ups! Parece que hacen falta piezas al automovil.</p>
    <div>
    <img className="h-25 w-auto  " src="/src/img/carro400.gif" alt="" />
    
    </div>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a href="/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
       hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
       focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Volvamos al camino</a>
    </div>
  </div>
</main>

  );
};

export default solicitud400;