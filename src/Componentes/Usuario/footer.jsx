import React from 'react';
import Label from '../ui/label.jsx'
import A from '../ui/etiqueta.jsx'
import {FaClipboardList,FaCookieBite,FaFacebook,FaWhatsapp} from "react-icons/fa";
import { IoDocumentLockOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-blue-700">
  <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-8 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
            <div className="text-teal-600 mt-4">
              <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-lg inline-flex items-center border border-gray-300">
                <svg
                  className="fill-current w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
              </button>
            </div>
          </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
      {/* gap-8 */}
        <div>
          <p className="font-medium text-white">Redes sociales</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-center"  >
            <FaFacebook className="mr-4 font-medium text-white"/>
                <A href="#" >Viajes Ramos</A>
            </li>

            <li className="flex items-center"  >
            <FaWhatsapp className=" mr-4 font-medium text-white"/>
                <A href="#" >7712153230</A>
            </li>

            <li className="flex items-center"  >
            <AiOutlineMail className="mr-4 font-medium text-white"/>
                <A href="#" >ViajesR@gmail.com</A>
            </li>
           
          </ul>
        </div>

        <div>
          
          <Label className="font-medium text-white">Compania</Label>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
            <A href="#" >Acerca De</A>
            </li>

            <li>
            <A href="#" >Equipo</A>
            </li>

            <li>
            <A href="#" >Equipo</A>
            </li>
          </ul>
        </div>

        <div>
          {/* <p className="font-medium text-gray-50">Helpful Links</p> */}
          <Label className="font-medium text-white">Ayuda</Label>
        

          <ul className="mt-6 space-y-4 text-sm">
            <li>
            <A href="#" >Contacto</A>
            </li>

            <li>
            <A href="#" >Ayuda</A>
            </li>

            <li>
            <Link className="mr-4 font-medium text-white" to="/ayuda" >Chat en vivo</Link>
            </li>
          </ul>
        </div>

        <div>
          {/* <p className="font-medium text-gray-50">Legal</p> */}
          <Label className="font-medium text-white">Legal</Label>

          <ul  className="mt-6 space-y-4 text-sm">
            
            
            <li className="flex items-center"  >
            <FaCookieBite className="mr-4 font-medium text-white" /> 
            <A className="mr-4 font-medium text-white" href="#" >Politicas de Cookies</A>
            </li>


            <li className="flex items-center"  >
            <IoDocumentLockOutline className="mr-4 font-medium text-white" />
            <Link className="mr-4 font-medium text-white" to="/Privacidad" >Politicas de Privacidad</Link>
            
            </li>
            

            <li className="flex items-center">
            
            <FaClipboardList className="mr-4 font-medium text-white" /> 
            <Link className="mr-4 text-white"  to="/Terminos" >Terminos y condiciones</Link>
            
            </li>

            <li className="flex items-center">
            
            <FaClipboardList className="mr-4 font-medium text-white" /> 
            <Link className="mr-4 text-white"  to="/Alexa" >Integrar con Alexa</Link>
            
            </li>


          </ul>
        </div>
      </div>
    </div>

   
  </div>
</footer>
  );
};

export default Footer;
