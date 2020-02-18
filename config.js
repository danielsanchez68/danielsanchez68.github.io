// -----------------------------------------------------
const VERSION = 'v0.0.0.0.1';
const TIEMPO_EXPIRACION = 20000;

//const URL_BASE_DE_DATOS = 'mongodb://localhost:27017/passport'; //BASE LOCAL
const URL_BASE_DE_DATOS = 'mongodb+srv://vbt2020:ventas2020bus@venta-bus-mi9di.mongodb.net/vbtbase?retryWrites=true&w=majority'; //BASE NUBE
//heroku logs -t --app ventas-bus-turistico

// -----------------------------------------------------

module.exports = {
	VERSION,
	TIEMPO_EXPIRACION,
	URL_BASE_DE_DATOS
}
