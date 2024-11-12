import React from 'react';
import { Link } from 'react-router-dom';

const Privacidad = () => {
  return (
    <div className="container mx-auto p-4">

      <h1 className="text-3xl font-bold mb-6 border-b-4 border-gray-900 pb-2">AVISO DE PRIVACIDAD</h1>
      <p className="mb-4">
        Daniel Ramos Hernández, mejor conocido como Viajes especiales Ramos, con domicilio en calle Melchor Ocampo,
        colonia Juarez, ciudad Huejutla de Reyes, municipio o delegación Huejutla de Reyes, c.p. 43000, en la entidad de
        Hidalgo, país México, es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo
        siguiente:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">¿Para qué fines utilizaremos sus datos personales?</h2>
      <p className="mb-4">
        De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son
        necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Reservación y gestión de viajes</li>
        <li>Contacto y comunicación</li>
        <li>Recordatorio de viaje</li>
        <li>Mercadotecnia o publicitaria</li>
      </ul>

      <p className="mb-4">
        En caso de que no desee que sus datos personales sean tratados para estos fines secundarios, desde este momento
        usted nos puede comunicar lo anterior a través del siguiente mecanismo:
        mediante casillas de "si" y "no" el cliente puede autorizar la utilización de los datos proporcionados.
        La negativa para el uso de sus datos personales para estas finalidades no podrá ser un motivo para que le neguemos
        los servicios y productos que solicita o contrata con nosotros.
        ¿Qué datos personales utilizaremos para estos fines?
        Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos
        personales:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Nombre</li>
        <li>Teléfono particular</li>
        <li>Teléfono celular</li>
        <li>Correo electrónico</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">¿Con quién compartimos su información personal y para qué fines?</h2>
      <p className="mb-4">
        Le informamos que sus datos personales son compartidos dentro del país con las siguientes personas, empresas,
        organizaciones o autoridades distintas a nosotros, para los siguientes fines:
      </p>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Destinatario de los datos personales</th>
            <th className="px-4 py-2">Finalidad</th>
            <th className="px-4 py-2">Requiere del consentimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Hoteles</td>
            <td className="border px-4 py-2">Para reservas de alojamiento, la agencia de viajes puede compartir los datos personales con los hoteles para garantizar que se asignen las habitaciones y servicios solicitados por el cliente.</td>
            <td className="border px-4 py-2">Sí</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Proveedores de servicios de transporte terrestre</td>
            <td className="border px-4 py-2">Para traslados desde y hacia el punto de reunión u otros servicios de transporte terrestre, la agencia de viajes puede compartir datos personales con los proveedores de estos servicios.</td>
            <td className="border px-4 py-2">Sí</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Compañías de procesamiento de pagos</td>
            <td className="border px-4 py-2">Cuando se efectúa el pago de los servicios de viaje, la agencia puede compartir datos de pago con compañías de procesamiento de pagos para realizar las transacciones.</td>
            <td className="border px-4 py-2">Sí</td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4">
        Con relación a las transferencias que requieren su consentimiento, si usted después de leer este aviso de privacidad
        no manifiesta su negativa para que las mismas se lleven a cabo, entenderemos que nos lo ha otorgado. Ponemos a
        su disposición el siguiente mecanismo para que, en su caso, nos pueda comunicar su negativa para que dichas
        transferencias se realicen:
        mediante casillas de "si" y "no" que se encuentra en el sitio web, el usuario puede rechazar o aceptar el uso de sus
        datos y trasferencias a terceros.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</h2>
      <p className="mb-4">
        Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del
        uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de
        que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases
        de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse
        al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos
        ARCO.
        Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del
        siguiente medio:
        Oficina y número telefónico.
        Para conocer el procedimiento y requisitos para el ejercicio de los derechos ARCO, ponemos a su disposición el
        siguiente medio:
        oficinas ubicadas en calle Melchor Ocampo, colonia Juarez, ciudad Huejutla de Reyes, municipio o delegación
        Huejutla de Reyes, c.p. 43000, en la entidad de Hidalgo, país México o llamando al número 81 1176 5080 del estado
        de Monterrey Nuevo León.
        Los datos de contacto de la persona o departamento de datos personales, que está a cargo de dar trámite a las
        solicitudes de derechos ARCO, son los siguientes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>a) Nombre de la persona o departamento de datos personales: Daniel Ramos Hernández</li>
        <li>b) Domicilio: calle Melchor Ocampo, colonia Juarez, ciudad Huejutla de Reyes, municipio o delegación Huejutla de Reyes, c.p. 43000, en la entidad de Hidalgo, país México</li>
        <li>c) Número telefónico: 8111765080</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Usted puede revocar su consentimiento para el uso de sus datos personales</h2>
      <p className="mb-4">
        Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos
        personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su
        solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir
        tratando sus datos personales. Asimismo, usted deberá considerar que para ciertos fines, la revocación de su
        consentimiento implicará que no le podamos seguir prestando el servicio que nos solicitó, o la conclusión de su
        relación con nosotros.
        Para revocar su consentimiento deberá presentar su solicitud a través del siguiente medio:
        Oficina y número telefónico.
        Para conocer el procedimiento y requisitos para la revocación del consentimiento, ponemos a su disposición el
        siguiente medio:
        visitando las oficinas que se encuentra en calle Melchor Ocampo, colonia Juarez, ciudad Huejutla de Reyes,
        municipio o delegación Huejutla de Reyes, c.p. 43000, en la entidad de Hidalgo, país México o llamando al número
        81 1176 5080 del estado de Monterrey Nuevo León.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">¿Cómo puede limitar el uso o divulgación de su información personal?</h2>
      <p className="mb-4">
        Con objeto de que usted pueda limitar el uso y divulgación de su información personal, le ofrecemos los siguientes
        medios:
        Oficina y número telefónico. Asimismo, usted se podrá inscribir a los siguientes registros, en caso de que no desee obtener publicidad de nuestra
        parte:
        Registro Público para Evitar Publicidad, para mayor información consulte el portal de internet de la PROFECO
        Registro Público de Usuarios, para mayor información consulte el portal de internet de la CONDUSEF
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">El uso de tecnologías de rastreo en nuestro portal de internet</h2>
      <p className="mb-4">
        Le informamos que en nuestra página de internet utilizamos cookies, web beacons u otras tecnologías, a través de
        las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y
        experiencia al navegar en nuestra página. Los datos personales que recabamos a través de estas tecnologías, los
        utilizaremos para los siguientes fines:
        Para brindar una mejor experiencia al usuario, seguimiento de sesiones.
        Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:
        Identificadores, nombre de usuario y contraseñas de una sesión.
        Región en la que se encuentra el usuario.
        Fecha y hora del inicio y final de una sesión de un usuario.
        Asimismo, le informamos que su información personal será compartida con las siguientes personas, empresas,
        organizaciones o autoridades distintas a nosotros, para los siguientes fines:
      </p>
      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Destinatario de los datos personales</th>
            <th className="px-4 py-2">Finalidad</th>
            <th className="px-4 py-2">Requiere del consentimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Hoteles</td>
            <td className="border px-4 py-2">Para reservas de alojamiento, la agencia de viajes puede compartir los datos personales con los hoteles para garantizar que se asignen las habitaciones y servicios solicitados por el cliente.</td>
            <td className="border px-4 py-2">Sí</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Proveedores de servicios de transporte terrestre</td>
            <td className="border px-4 py-2">Para traslados desde y hacia el punto de reunión u otros servicios de transporte terrestre, la agencia de viajes puede compartir datos personales con los proveedores de estos servicios.</td>
            <td className="border px-4 py-2">Sí</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Compañías de procesamiento de pagos</td>
            <td className="border px-4 py-2">Cuando se efectúa el pago de los servicios de viaje, la agencia puede compartir datos de pago con compañías de procesamiento de pagos para realizar las transacciones.</td>
            <td className="border px-4 py-2">Sí</td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4">
        Para conocer la forma en que se pueden deshabilitar estas tecnologías, consulte el siguiente medio:
        oficinas ubicadas en calle Melchor Ocampo, colonia Juarez, ciudad Huejutla de Reyes, municipio o delegación
        Huejutla de Reyes, c.p. 43000, en la entidad de Hidalgo, país México o llamando al número 81 1176 5080 del estado
        de Monterrey Nuevo León.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">¿Cómo puede conocer los cambios en este aviso de privacidad?</h2>
      <p className="mb-4">
        El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos
        requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras
        prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.
        Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a
        través de: mediante un anuncio o notificación dentro del sitio web.
        El procedimiento a través del cual se llevarán a cabo las notificaciones sobre cambios o actualizaciones al presente
        aviso de privacidad es el siguiente:
        mediante un anuncio o notificación dentro del sitio web.
      </p>
      <p className="mb-4">Última actualización: 21/09/2023</p>
    </div>
  );
};

export default Privacidad;
