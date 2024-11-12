import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from 'react';
import { EmailProvider } from './Estado/usecontext.jsx';
import Header from "./Componentes/Usuario/header.jsx";
import Footer from "./Componentes/Usuario/footer.jsx";
import Home from "./Componentes/Usuario/home.jsx";
import Login from "./views/Public/Login.jsx";
import Registro from "./views/Public/Registro.jsx";
import NotFound from "./views/Public/Error/Error_404.jsx";
import Sidebar from "./Componentes/Admin/Dashboard.jsx";
import Code from "./views/Public/Boletos.jsx";
import EmpleadoBoletos from "./views/Public/Boletos.jsx";
import Error400 from "./views/Public/Error/Error_400.jsx";
import Error500 from "./views/Public/Error/Error_500.jsx";
import Reportes from './views/Admin/Reportes.jsx';
import Ayuda from "./views/Public/Ayuda.jsx";
import EnviaEmail from "./Componentes/Usuario/Contraseña/EnviaEmail.jsx";
import CodePass from "./Componentes/Usuario/Contraseña/CodePass.jsx";
import CambioPass from "./Componentes/Usuario/Contraseña/CambioPass.jsx";
import HeaderUsReg from "./assets/componentes/HeaderUsReg";
import EnviaPregunta from "./Componentes/Usuario/Contraseña/EnviaPregunta.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Mudanzas from "./Componentes/Usuario/Cotizaciones/Mudanzas";
import Paqueteria from "./Componentes/Usuario/Cotizaciones/Paqueteria";
import Particulares from "./Componentes/Usuario/Cotizaciones/Particulares";
import Perfil from "./Componentes/ui/Perfil.jsx";
import Boletos from "./views/Private/Boletos.jsx";
import Calculadora from "./views/Admin/Calculadora.jsx";
import Mudanda from "./views/Public/Cotizaciones/CotizaM.jsx";
import PaqueteriaP from "./views/Public/Cotizaciones/CotizaP.jsx";
import ViajesV from "./views/Public/Cotizaciones/CotizaV.jsx";
import Mudanza from "./views/Admin/CotizaM.jsx";
import CotizaP from "./views/Admin/CotizaP.jsx";
import CotizaV from "./views/Admin/CotizaV.jsx";
import Service from "./views/Public/Service.jsx";
import DemandaEstetica from "./views/Public/DemandaServicios.jsx";
import Privacidad from "./views/Public/AvisoPrivacidad.jsx";
import Terminos from "./views/Public/Terminos.jsx";
import RecordsAdmin from './views/Admin/RecordsAdmin.jsx'; 
import SliderAdmin from './views/Admin/SliderAdmin.jsx'; 
import MudanzaModule from "./Componentes/ui/InfMudanza.jsx";
import PaqueteriaModule from "./Componentes/ui/InfPaqueteria.jsx";
import ViajesParticulares from "./Componentes/ui/InfViajesP.jsx";
import DestinosAdmin from "./views/Private/DestinosAdmin.jsx";
import CodigoA from "./Componentes/ui/CodigoA.jsx";
import Alexa from "./views/Public/AlexaIntegrate.jsx";
import AutobusEmpleado from "./views/Private/BoletosEmpleado.jsx";
import 'tailwindcss/tailwind.css';

// Función para pedir permiso de notificaciones
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Permiso de notificaciones concedido.');
  } else {
    console.log('Permiso de notificaciones denegado.');
  }
}


function App() {
  // Recuperar el correo electrónico del localStorage
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const PublicRoutes = () => (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Calculadora" element={<Calculadora />} />
        <Route path="/Boletos" element={<Code />} />
        <Route path="/BoletosBus" element={<Boletos />} />
        <Route path="/PerfilU" element={<Perfil />} /> 
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/SendEmail" element={<EnviaEmail />} />
        <Route path="/SendEmailPregunta" element={<EnviaPregunta />} />
        <Route path="/code" element={<CodePass />} />
        <Route path="/changePass" element={<CambioPass />} />
        <Route path="/LoginReg" element={<HeaderUsReg />} />
        <Route path="/Error400" element={<Error400 />} />
        <Route path="/Error500" element={<Error500 />} />
        <Route path="/Mudanzas" element={<Mudanzas />} />
        <Route path="/ViajesParticulares" element={<Particulares />} />
        <Route path="/Paqueteria" element={<Paqueteria />} />
        <Route path="/MudanzaM" element={<Mudanda />} />
        <Route path="/PaqueteriaP" element={<PaqueteriaP />} />
        <Route path="/ViajesV" element={<ViajesV />} />
        <Route path="/Servicio" element={<Service />} />
        <Route path="/Demanda" element={<DemandaEstetica />} />
        <Route path="/Privacidad" element={<Privacidad />} />
        <Route path="/Terminos" element={<Terminos />} />
        <Route path="/InformacionM" element={<MudanzaModule />} />
        <Route path="/InformacionP" element={<PaqueteriaModule />} />
        <Route path="/InformacionVP" element={<ViajesParticulares />} />
        <Route path="/SixDigitCode" element={<CodigoA />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );

  const AdminRoutes = () => (
    <>
      <Sidebar />
      <Routes>
        <Route path="/CotizaM" element={<Mudanza />} />
        <Route path="/CotizaP" element={<CotizaP />} />
        <Route path="/CotizaV" element={<CotizaV />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/records" element={<RecordsAdmin />} />
        <Route path="/Slider" element={<SliderAdmin />} /> {/* Nueva ruta */}
        <Route path="/Destinos" element={<DestinosAdmin />} />
      </Routes>
    </>
  );

  const EmpleadoRoutes = () => (
    <>
      <Sidebar />
      <Routes>
        <Route path="/CotizaM" element={<Mudanza />} />
        <Route path="/CotizaP" element={<CotizaP />} />
        <Route path="/CotizaV" element={<CotizaV />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/compraBoletos" element={<AutobusEmpleado />} />
        <Route path="/Boletos" element={<EmpleadoBoletos />} />
      </Routes>
    </>
  );

  return (
    <EmailProvider userEmail={userEmail}>
      <Router>
        <Routes>
          <Route
            path="/admin/*"
            element={<ProtectedRoute element={<AdminRoutes />} roles={[1]} />}
          />
          <Route
            path="/empleado/*"
            element={<ProtectedRoute element={<EmpleadoRoutes />} roles={[2]} />}
          />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </Router>
    </EmailProvider>
  );
}

export default App;
