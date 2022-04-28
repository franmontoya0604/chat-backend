/*
///node es javascript ejecutado en un entorno de ejecucion como la terminal o unservidor web asi siendo la aplicacion del lado del servidor y no del cliente.
///para desplegarlo hay que manejarlo en el cpanel en un host normal y si usamo una cli se hace solo.
///pm2 se usa para monitoriar el servidor en produccion
///cuando usamos n servidor y lo deplegamos  se tiene que compilar?.


//Métodos, cabeceras y estados de peticiones http
/metodos es el verbo que se le dice que hacer al servidor get,post,put,patch(actualizar parte de la informacion),delete,options(para averiguar cual verbo se puede ejecutar)
/cabeceras nos envia informacion contextual, en la request de put,patch,post podemos tener cabeceras de autenticacion,cokkies,cache,cors,etc.
*siempre hayq ue tener cors para permittir acceder a la info fuera de nuestro servidor
*las cokies podemos compartir info entre peticiones.
*accept es para indicar el contenido que acepta
*authentication para asegurarte de que se puede pedir datos al servidor por ejemplo con jwt.
*cache con cache-control o expire se puede guardar en un cache info para no hacer tantas peticiones.
/los estados son numeros que indican como fue la pticion
*200 y 201 es que salio bien
*los que empiezan en 3 es que se redireciono a otro lado.
*los que empienzan en 4 es que hubo un error 400 es que hubo un error en lo enviado, 401 un error de autorizacion, 404 no se encontro la peticion.
*y 500 error en el servidor


//Cuerpo y query de la petición
*el body es la informacion que añadimos o pedimos al servidor.
*para decir como viene la info usamos la cabecera content-type y ahi ponemos el tipo de datos qu eesperamos o enviamos en el body y content-lenght para decirle el largo.
*en la response nos puede venir datos, archivos,etc. en la request el metodo y el url cuando hacemos post. el reques se usa para manejar el body que viene del post,put,etc.

/query es informacion extra o orden en el queremos que nos venga la info por ejeplo un identificador de usuario.
*para crear el query al final de la url ponemos un ? y ponemos el nombre y el valor que pude ser un id o videor  o etc. y si queremos agregar mas de uno lo separamos con &.


//Crear un servidor HTTP desde NodeJS
*ver en servers.js 

//¿Cómo pueden venir las peticiones?
*usamor el route que ya viene por defecto en app de expres . ose los metodos son los verbos http.

//Recibir información desde el cliente: Body y Query
*usamos nodemon para actualizar el servidor automaticamente en el modo dev.
*para parsear el body yaviene por defecto en app de express tambien.
*para accder al query usamos req.query.


//Información contextual: Leer las cabeceras
*las cabeceras las recibimos en el req desde el navegador. y tambien las podemos mandar desde el servidor a donde se haga la peticion.


//Tipos de respuesta: Vacía, plana, con datos y estructurada
*se puede responder de todo en el res.send


//Respuestas coherentes
*vamos a crear la carpeta network en donde vamos a tner  como un a capa intelligente , dentro creamos response.js que se va aencarga de hacer las respeustas a las peticiones genericas(como succes o error) en el server de forma que usando este modulo sea mas facil ya que lo vamos ausar varias veces..


//Errores: Cómo presentarlos e implicaciones en la seguridad
*no devolver info delicacda al cliente.


//Conceptualmente: Rutas, controladores y bases de datos
*dentro de nuestro servidor server.js se necarga de recibir las peticiones y si son correctas o cancelarlas tambien se encarga de configurar cabeceras,base de datos,etc.
*server.js envia la peticion a routes.js que se encarga de gestionar las rutas ver para donde va la in fo y llamar al componente correcto. luego en el componente por ejemplo message va a tener dentro a network.js que se encarga de gestionar las rutas y tener los endpoints este es llamado por el routes.js.
*el componente message va atener tambien un controller.js que va tener toda la logica. si el message tiene una fecha le añadimos aca si necesita ejecutar otra cosa lo hacemos aca osea hacemos aca la logica de negocio.tambien se hace las validaciones.
*el network.js pasa la info al controller y lo guarda en una base de datos que va a estar en store.js dentro del componente y se va a encargar de toda la gestion con la base de datos.
/tambien vamos a tener un archivo llamado response.js que se va a encargar de dar las respuesta . cuando un llamado sea correcto los network se lo pasan a este archivo. y response se lo pasa al cliente.
////esta arquitectura sirve para crear una aplicacion web del lado del servidor , para hacer un api es mas facil.



//Rutas y capa de red: Responsabilidades y límites(network.js de cada componente)
*vamos a crear el componente message y dentro el network.js ver ahi.
*creamos en la carpeta network routes.js que es donde se van a derivar las llamadas a las rutas


//Controladores: Definiendo la lógica de negocio
*dentro de mensaje creamos controller.js que se encarga de la logica osea ver que se hace con la info que se trae al servidor y la que se da.


//Almacenando la información en una base de datos
*ahora vamos a realizar un mock para simular la base de datos y lagestion solamente
*esto lo vamos a requerir en el controlador que va aejecutar las funciones para añadir


//Tipos de Bases de Datos: Relacionales y No Relacionales
*Bases de Datos Relacionales: no es una base de datos muy flexible, pero tiene a favor su gran soporte y el enorme desarrollo en herramientas para su uso. Si necesitamos cambiar un valor de un campo debemos hacerlo con todos los campos de nuestra BD, en cambio con NoSQL o No Relacional no es así.
*Bases de Datos No Relacionales: son de bases de datos sin una tabla fija como las que sí se encuentran en las bases de datos relacionales, lo que permite una alta escalabilidad en ellas. Además, es abierta y por lo tanto flexible a diferentes tipos de datos y no necesita tantos recursos para ejecutarse; de hecho, el hardware necesario no cuesta mucho.



///Crear y Configurar tu Base de Datos con MongoDB
*Usa MongoDB Atlas en lugar de mLab
*Durante el curso usamos mLab para crear nuestra base de datos con MongoDB. Pero el servicio ya no está disponible, así que te recomendamos seguir esta clase para configurar tu base de datos con MongoDB Atlas:
*Nuestro código no cambiará mucho. De hecho, puede que no cambie nada. Solo debes recordar que los nombres de tus bases de datos y clusters deben ser los mismos en el servicio de Atlas y en tu código


//MongoDB: Almacenar y leer datos
*vamos a utilizar  mongoose que permite generar esquemas para saber que datos almacenamos. y se encarga de que en caso de que los datos no validen no los guarda.
*creamos model.js en message
*aca vamos a crear el esquema y el modelo que tienen que cumplir los datos para guardarse dentro de la base de datos.
*ahora vamos a cambiar store de message para hacer la conexion a la bd.
///tengo que usar dotenv para leer las variables de entorno que puse en mi archivo .env asi ahi creo las variables para codificar las crendeciales de la bases de datos,cors,token,etc.
*creamos la cuenta en atlasmongodb, poenemos en create new elegimos el cloud provider que nos provee alamacenamiento en la nube, y elegimos la opcion free.
*creamos el cluster que son las base datos.y ahi la opcion de conectarse a la base de datos alamacenada en la nube del proveedor que eligamos.
*primero hay que crear un usuario al que le damos permis de adminitrar algunas bases o todas. y tambien ingresar un ip para saber de donde se le permite administrar las bases son medidas de segurida. este es el primer paso del connect.
*en el segundo paso del connect tenemos queelegir el metodo de conexion a la bd, ahora vamos a legir la opcion de driver que es para que nos de la url de conexion.
*despues de hacer los 3 pasos del connect vamos a obtener la uri que es con lo que se permite hacer la coneccion desde nuestra api.
*esta uri en el backend usando variables de entorno para proteger los datos tenemos que ponerle la contraseña del usuario que usamos para hacer la conexion y el nombre de la base de datos.
*Los datos en MongoDB se almacen en clúster. Un clúster es una agrupación de ordenadores, a menudo llamados en este contexto nodos. Los datos de cada colección se reparten entre los nodos, logrando así el soporte de cantidas masivas de datos.
*esta es nuestra uri mongodb+srv://fran0604:<password>@cluster0.qycj7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*en store.js hisimos la lectura y envio de datos a la db y luego en las otras capaz como el controler la manejamos y en prework la enviamos a quien haga la peticion.
*hay que probar si funciona el post .el get funciona. hise la prueba con postman y funciona.


//MongoDB: Actualizar datos
*creamos en network el patch
*para hecer el patch tenemos que ncontrar el menssagee y usandolo como un objeto actualizamos la propiedad que queramos asi cambiamos parcialmente el objeto json con el id que sacamos del url.
*siempre los pasos son en store hacemos las acciones con la bd en controller las validaciones y devolvemos una promesa para que el network trabaje y haga la gestion de las peticiones para que cuando hagamos un llamado get recibamos los datos.


//MongoDB: Consultar datos
*para consultar datos se pueden usar los parametro query por ejemplo si queremos obtener de la bd solo los mensajes de fran.
*los paramatros del queri los especificas en la peticion fetch creo y ahi le pasamos para saber de quien queremos los mensajes.y en el backend hacemos el filtado.


//MongoDB: Eliminar Datos
*creamos el delete en network
* y atraves del parametro como en patch con el id borramos el mensaje correcto. tambien ha yque validar que el mensaje a a borrar exista.


//Gestionar conexiones a la base de datos desde la API
*para hacerlo mas aescalable vamos a mudar la conexion a la bd del store aun archivo db.js en la raizdonde va ser una funcion que le pasamos el url de la base de datos para conectarse y en ves de que cada ves que haya una peticion se conecte vamos a  hacer una conexio continua mientras el server este funcionando. en store solo van a quedar las consultas al a db. de cada componente.
*tambien para mayor seguridad vamos a usar variables de entorno creando el archivo .env doen van a estar el nombre y su valor y luego para armar la uri de la conexion a la bd en el componente que sea correcto vamos a crear config.js donde armamos la uri con el usuario contraseña y db name como variable de entorno y la exportamos para usarla en el server.
*donde vamos a crear la uri uniendo los datos de las variables de entorno y se la pasamos al afuncion que esta en db que hace la conexxion.



//Escalando la arquitectura: Múltiples entidades
*vamos a crear un componente nuevo llamado user va atener los mismo archivos que message.
*creamos los archivos y los adaptamos auser. y agreahamos en routes el nuevo componente.



//Relacionando nuestras entidades
*En esta clase vamos a relacionar la entidad de usuarios con la entidad de mensajes y a su vez crearemos una entidad chat que relacionará estas dos entidades.
*usamos el populate para hacer las relacion a traves de un objectid que lo marcamos en el model podemos obtener la info de otro elemento de otra coleccion si.
///asi en una consulta traemos una peticion con la colleccion message y en user traemos la info de cada usuario que esta en la coleccion users gracias a la relacion de el objectid. y el populate que se encarga de esto.
*el ref en model se encarga de especificar en que collecion buscar el objectid igual para traer su info.
*ahora vamos a crear el componente o entidad  chat primero solo relacionando con la tabla user y luego traeremos todo los messages de cada user.
*en la entidad chat use todo async await. sin new promise.probar que paso.
*para hacer get de todo un array de objetos en el  model asignar a una propiedad un array con objetos dentro.y despues usar el m odel.find para traer todos de la db. la url si querems hacer un filtro por id para traer solo el que coiicnida con ese id tenemos que usar un parametro luego del / que va a ser el id. y esto se lo pasa en el fetch al hacer el get ah cierto url hay que ponerle el id que querems traer.
*ahay que hacer dos app. get uno para traer todos los chat y otro para traer un cierto chat a tra ves de su id. y con el puplate en este caso al campo users lo vamos a popular con la tabla user para traer su info gracias al object id.
*en la colleccion chat de la db si tiene todos lo id en un solo array si llamamos al id de uno de ellos se llaman ambos. al estar en un array de objetos. esto es por que nosostro a tra ves de esto podemos filtrar los messages de unchat a traves de los user que participan.


//Cómo recibir ficheros desde NodeJS
*ahora  vamos a hacer que cuando hagamos un get a message tambien podamos en ves de traer todos los message filtrar por chat, entonces traemos todos los messages de un chat.y tambien tenemos la opcion de filtrar por usuario.
*para eso le pusimos al model de chat un array de objetos para poder poner en cada chat los que participan con su id de user para traer esos message.por lo menos esta es la idea pero en el curso lo dejan como que se sigue filtrando por la coleccion user. osea el componente chat esta al pedo.
*vamos a agregar chat en el model y vamos a gestionar como recibirlo en cada capa de message.
*creo que lo que estaria bueno es usar para filtrar el numero del id de los chat y a los mensajes que esten en ese chat traerlos y traer los usuario que participan en ese chat. ahora la funcion solamente es ponerle en el numero de chat a los mensajes el numero de user y filtrarlos por eso en el query poner el numero de chat y que traiga los numero de chat iguales a eso unicamente. como que pertenezen a ese chat.
/subir imagenes o subir archivos.
*para enviar un file en el postman usamos el form-data cambiando text por file en el campo del archivo y ahi lo seleccionamos. y en los otros campo ponemos las otraspropiedades.
*vamos a usar un modulo llamado multer que nos ayuda a recibir los file en network de message vamos a usarlo para entender que hacer cuando viene y donde enviarlo cuando recibe la peticion post.


//Guardar el fichero en el servidor
*ahora en ves de guardarlo en una carpeta fuera lo vamos a guardar en la carpeta files dentro de public y le vamos a psar la info del file al controlador para poder hacer uso de el. y lo vamos a guardar en la db. y si hacemos una peticion get nos trae su url para poder usarla para descargar o para verlo en la base de datos.


//WebSockets: Qué son, por qué son interesantes y cómo usarlos
*cuando queremos conexiones en tiempo real por ej para averiguar si hay nuevos mensajes creamos un endpoint que escuacha y devuelve cuando hay mensajes nuevos , esto con protocolo http lo podemos ejcutar cada segundo pero es desperdiciar recursos aca entran los web sockect.
*quizas ahora en protocolo http ya hay solucion a esto de conexion en tiempo real. por ejemplo la conexion en tiempo real con db.
*websocket es un protocolo de comunicacion en tiempo real que crea un tunel entre un cliente y un servidor y que soporta multiples clientes conectados al mismo tunel.y podemos no guardar los mensajes solo se envian sin almacenar en db. y tenemos la conexion abierta entre servidor y cliente.
/podemos crear el servidor websocket con socket.io para laconexion en tiempo real y node para el servidor
*en una carpeta aparte vamos a hacer la conexion de socket y en server js vamos a usar la funcion que traemos de ahi para hacer funcionar el servidor socket. y entonces podemos emitir el message de forma masiva y entiempo real sin almacenar.
//tengo que buscar si es recomendable usar socket. alfinal el proyecto con el font end tiene qu tener la pagina principal donde salgan los usuarios y que cuando toques un usuario a traves del id del usuario buscar en los chat donde esta (ya que en chats en la db estan almacenados los chat y dentro de cada chat estan los id de los usuario que lo forman) y luegotocando en un chat gracias al id del chat en si y no del usuario lo pasamos como query en la pagina de messages para filtrar por chat los messages(osea que en messages en la db la propiedad chat tiene que se el object id del chat de la collection chat).
/osea cada ves que vayamos entrnado a las paginas en el front end tenenmos que ponerlo de param oquery a la id que obtuvimos con el fetc.



//Tips para escalar nuestro proyecto
*nos dice que usemos el config.js y las variables de entorno. para todos las partes de url o routes que son candidatas a cambiar. y ademas de las credenciales o uri de db las indicamos en .env para codificarlas y para desencriptar en nuestro archi de mas alto nivel importamos el dotenv.para ocultarlas con dotenv.
*ya terminamos 


/////con node se puede crear una aplicacion del lado dle servidor completamente creando un servidor para la pagina con susu rutas  y donde se va aconectar a la base de datos todo en el mismo proyecto.  cuando creamos del lado del cliente react router dom se encarga de que cuando entremos a una ruta devuelva la pagina que tiene que devolver. y para el backend hay que crear otro proyecto que va a ser la api y se va a aconectar la aplicacion.
/////si queremos hacer una aplicacion del lado del servidor es mejor usar next.js creo que usa node.
*/