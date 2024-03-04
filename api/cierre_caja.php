<?php
/**
 *	Script que se usa en los endpoints para trabajar con registros de la tabla ventas
 *	La clase "ventas.class.php" es la clase del modelo, que representa a un jugador de la tabla
*/

require 'src/classes/cierre_caja.class.php';//Se incluye el archivo de la clase del modelo
require '../autenticacion/src/auth.class.php';//Se incluye el archivo de la clase de autentificación

$auth = new Authentication(); // Se crea un objeto de la clase Authentication
$auth->verify();// Se verifica si el usuario está autenticado

$venta = new User();// Se crea un objeto de la clase User

/**
 * Se mira el tipo de petición que ha llegado a la API y dependiendo de ello se realiza una u otra accción
 */
switch ($_SERVER['REQUEST_METHOD']) {
	/**
	 * Si se ha recibido un GET se llama al método get() del modelo y se le pasan los parámetros recibidos por GET en la petición
	 */
	case 'GET':
		$params = $_GET;

		$ventas = $venta->get($params);// Se llama al método get() del modelo y se le pasan los parámetros recibidos por GET en la petición
		
		$response = array(
			'result' => 'ok',
			'ventas' => $ventas, 
		);

		Response::result(200, $response);

		break;
		

	default:
		$response = array(
			'result' => 'error'
		);

		Response::result(404, $response);

		break;
}
?>