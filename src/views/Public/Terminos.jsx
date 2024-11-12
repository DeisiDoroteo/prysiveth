import { Link } from 'react-router-dom';

const Terminos = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div id="terminosYCondiciones" className="text-gray-800">
        <h1 className="text-3xl font-bold mb-6 border-b-4 border-gray-900 pb-2">Términos y Condiciones</h1>

        <div className="section-title text-xl mb-4">¡Bienvenido a Viajes especiales Ramos!</div>
        <p className="mb-4">Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Viajes especiales Ramos, ubicado en 
          <Link className="text-blue-500 underline" to="https://siveth-app.vercel.app/" target="_blank" rel="noopener noreferrer"> https://siveth-app.vercel.app/</Link>. La empresa se encuentra ubicada en Melchor Ocampo, colonia Juarez, ciudad Huejutla de Reyes, municipio o delegación Huejutla de Reyes, c.p. 43000, en la entidad de Hidalgo, país México. Puedes ponerte en contacto vía correo electrónico o teléfono.</p>

        <div className="section-title text-xl mb-4">Descripción del servicio</div>
        <p className="mb-4">Viajes especiales Ramos es un sitio web que ofrece múltiples servicios del cual destaca el servicio de viajes turísticos mediante la venta de boletos en línea. Además de este servicio, se ofrecen los servicios de viajes particulares, envío de paquetería y mudanza, así como también se ofrecen cotizaciones en línea de manera gratuita.</p>
        <p className="mb-6">Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando SIVETH si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>

        <div className="section-title text-xl mb-4">Información sobre asignación de riesgos, responsabilidad y descargos de Responsabilidad</div>
        <ul className="mb-6">
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Venta de Boletos Turísticos:</h2>
            <p className="mb-2">Al adquirir boletos turísticos a través de nuestra plataforma, el usuario acepta que cualquier cambio en itinerarios, cancelaciones o incidencias relacionadas con los servicios de transporte están sujetos a las políticas de las compañías de viajes y transporte asociadas. Nuestra empresa actúa como intermediaria y no asume responsabilidad directa por alteraciones en los servicios proporcionados por terceros.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Servicios Adicionales:</h2>
            <p className="mb-2">Para servicios adicionales como paquetería, viajes particulares, mudanzas y cotizaciones de servicios, la empresa no se hace responsable de pérdidas, daños o retrasos en la entrega que sean atribuibles a factores externos, incluyendo, pero no limitándose a condiciones climáticas, restricciones gubernamentales, o cualquier otra circunstancia imprevista.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Responsabilidad del Usuario:</h2>
            <p className="mb-2">El usuario es responsable de proporcionar información precisa y completa al utilizar nuestros servicios. Cualquier información incorrecta o incompleta que resulte en pérdidas, daños o inconvenientes no será responsabilidad de nuestra empresa.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Interrupciones del Servicio:</h2>
            <p className="mb-2">La empresa no será responsable por interrupciones del servicio causadas por eventos fuera de su control, como fallas en la red, cortes de electricidad, desastres naturales, actos de terrorismo u otros eventos imprevisibles. La empresa hará esfuerzos razonables para restaurar los servicios afectados en el menor tiempo posible.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Limitación de Responsabilidad Financiera:</h2>
            <p className="mb-2">La responsabilidad financiera total de la empresa, ya sea en virtud de un contrato, agravio, garantía u otra teoría legal, estará limitada al monto total pagado por el usuario por los servicios durante el periodo de un año anterior al evento que dio lugar a la responsabilidad.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Aceptación de Términos:</h2>
            <p className="mb-2">Al utilizar nuestros servicios, el usuario acepta plenamente los términos y condiciones establecidos en esta sección. Es responsabilidad del usuario revisar periódicamente estos términos, ya que podrían actualizarse sin previo aviso.</p>
          </li>
        </ul>

        <div className="section-title text-xl mb-4">Información sobre la garantía</div>
       
        <ul className="mb-6">
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Condiciones para el Desistimiento:</h2>
            <p className="mb-2">El derecho de desistimiento se aplica a productos o servicios que no han sido utilizados o alterados de ninguna manera. Viajes especiales Ramos se reserva el derecho de inspeccionar los productos devueltos antes de procesar el reembolso.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Gastos de Devolución:</h2>
            <p className="mb-2">Los gastos de envío asociados con la devolución de productos serán responsabilidad del usuario, a menos que la devolución sea el resultado de un error por parte de Viajes especiales Ramos.</p>
          </li>
        </ul>

        <div className="section-title text-xl mb-4">Condiciones de Uso o Compra</div>
        <ul>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Requisitos de Edad:</h2>
            <p className="mb-2">El uso de nuestros productos o servicios está sujeto a requisitos de edad específicos. Al acceder o utilizar nuestros productos o servicios, el usuario confirma que cumple con los requisitos de edad establecidos. En caso contrario, se requiere el consentimiento de un padre, tutor legal u otra autoridad competente.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Registro de Cuenta:</h2>
            <p className="mb-2">Para acceder a ciertas funciones o servicios, puede ser necesario registrar una cuenta. El usuario se compromete a proporcionar información precisa y completa durante el proceso de registro. El usuario es responsable de mantener la confidencialidad de la información de la cuenta y notificar a la empresa de inmediato sobre cualquier uso no autorizado.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Modificaciones en las Condiciones:</h2>
            <p className="mb-2">La empresa se reserva el derecho de modificar, actualizar o cambiar las condiciones de uso o compra en cualquier momento. Los usuarios serán notificados de tales cambios, y el uso continuado de nuestros productos o servicios después de dichas modificaciones constituirá la aceptación de las nuevas condiciones.</p>
          </li>
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Aceptación de Condiciones:</h2>
            <p className="mb-2">El acceso y uso continuado de nuestros productos o servicios implica la aceptación de todas las condiciones de uso o compra establecidas en esta sección.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Terminos;
