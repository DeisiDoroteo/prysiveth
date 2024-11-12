# Bienvenidos a siveth web App 👋

Sistema Informatico de Viajes Especiales Turisticos de la Huasteca o por sus siglas SIVETH es un
proyecto desarrollado para la empresa Viajes Especiales Ramos con la finalidad de darle solución
a sus principales probelmas, la gestión de su empresa ya que dicha empresa acostumbraba a realizar
dichas operaciones a mano. SIVETH nace de la propuesta de inovación tecnologia de implementar un sistema
el cual brinde la resolución de los problemas dentro de lo más destacado la realización de las cotizaciones
(Mudanza, paqueteria y viajes particulares) y por supuesto su oprecaión principal la venta de boletos turisticos.
Dicho proyecto lleva acabo la implementación de varias herramientas en conjunto el cual ayuda a su funcionamiento


## Herramientas para el control de vesionamiento

El equipo de desarrollo de que esta trabajan con el proyecto de SIVETH trabaja con las herramientas
ya conocidas en el campo laboral y las más usadas, esatamos hablando con la 
integración de **GITHUB** y **GIT** estas dos herramientas son las que ayudan al equipo de desarrollo con el
control de versiones.

El uso de **Git** como sistema de control de versiones distribuido y **GitHub** como
plataforma de desarrollo colaborativo se justifica en la aplicación del desarrollo del proyecto
SIVETH por varios motivos: Git permite un control de versiones distribuido, asegurando que
cada desarrollador tenga acceso completo al historial del proyecto, facilitando así el trabajo
independiente y la colaboración sin necesidad de una conexión constante a un servidor central.
Además, su capacidad para almacenar un historial detallado de los cambios realizados en el
código permite una trazabilidad completa y la reversión fácil a versiones anteriores en caso de
ser necesario.
La funcionalidad de ramificación y fusión de Git facilita el desarrollo paralelo de
características y correcciones de errores, lo que agiliza el proceso de desarrollo y garantiza una
integración fácil del código.
Por otro lado, **GitHub** proporciona un repositorio remoto accesible desde cualquier
lugar, lo que facilita la colaboración entre el equipo de desarrollo. Además, sus herramientas
integradas de gestión de proyectos, como issues y pull requests, permiten una planificación y
seguimiento efectivos del desarrollo. Además, las herramientas de seguridad integradas en
GitHub, como el escaneo de vulnerabilidades, garantizan la protección del proyecto contra
posibles amenazas permitiendo así al equipo trabajar de manera más eficiente, colaborativa y
segura, lo que resulta en un desarrollo de software más ágil, confiable y exitoso. 

## Flujo De Trabajo Del Control De Versiones

El flujo de trabajo del control de versiones para el proyecto de la empresa se basa en un
**modelo de ramificación (branching model)** que permite una gestión eficiente del desarrollo, la
revisión de código y la implementación de cambios. A continuación, se describe el flujo de
trabajo de manera clara y concisa:

**• Ramas Principales:**
Características de un Branching Model

1. Ramas Principales (Master/Main):

- Cada Branching Model suele tener una rama principal que representa la versión estable y desplegable del software.

- Esta rama contiene el código que se considera "listo para producción".

2. Ramas de Funcionalidad (Feature Branches):

- Se crean ramas de funcionalidad para desarrollar nuevas características o mejoras en el software.

- Estas ramas permiten a los desarrolladores trabajar de manera independiente en tareas específicas sin afectar la rama principal.

3. Ramas de Corrección de Errores (Bug Fix Branches):

- Las ramas de corrección de errores se utilizan para abordar y solucionar problemas o defectos en el software.

- Estas ramas permiten la corrección de errores sin interrumpir el desarrollo de nuevas funciones.

4. Ramas de Publicación (Release Branches):

- Las ramas de publicación se crean para preparar y estabilizar versiones específicas del software antes de su lanzamiento.

- Se utilizan para realizar pruebas finales y garantizar que la versión sea apta para la producción.

## Estrategia de despliegue

El equipo de desarrollo de siveth a optado por seguir la estraegia de despliegue **Blue/Green**.

Esta es una estrategia muy común que implica el uso de dos versiones del servicio: la versión nueva (blue) y la versión estable existente (green). Los usuarios continúan utilizando la versión verde mientras se prueba y evalúa la versión azul. Cuando se considera lista, los usuarios cambian a la versión azul. Si se detecta algún problema, es posible regresar a la versión verde.

## Procesos de CI/CD

El uso de **GitLab CI/CD** en el proyecto **SIVETH** es una excelente opción porque integra todo lo que necesitamos en una sola plataforma, facilitando el control del código, las pruebas automáticas y los despliegues continuos. Con GitLab, podemos configurar pipelines que aseguran que cada cambio en el código se prueba y verifica antes de llegar a producción, reduciendo errores y mejorando la calidad del sistema. Además, su soporte para despliegues en varios entornos, junto con estrategias como el **Blue/Green**, nos permite lanzar actualizaciones sin interrumpir el servicio, lo que es esencial para el funcionamiento del sistema. También incorpora herramientas de seguridad que analizan el código en busca de vulnerabilidades, haciendo que el software sea más seguro desde el principio. Todo esto nos ayuda a trabajar de manera más eficiente y colaborativa, garantizando que SIVETH se mantenga estable y en constante mejora.

## Vamos a iniciar 

1. Instalación de dependecnias

   ```cmd
   npm install
   ```

2. Ejecución del proyecto

   ```cmd
    npm run dev
   ```

## Pasos para clonar el repositorio

1. Abre la ruta en donde guardaras el proyecto
2. Ejecuta el siguiente comando **"[git@github.com:AlanHH28/Siveth-Movil-App.git]"**
