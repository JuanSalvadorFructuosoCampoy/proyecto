<?php
/**
 *	Script que se usa en los endpoints para trabajar con registros de la tabla ventas
 *	La clase "ventas.class.php" es la clase del modelo, que representa a las ventas registradas
*/

require 'src/classes/ventas.class.php';//Se incluye el archivo de la clase del modelo
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
		
	/**
	 * Si se recibe un POST, se comprueba si se han recibido parámetros y en caso afirmativo se usa el método insert() del modelo
	 */
	case 'POST':
		$params = json_decode(file_get_contents('php://input'), true);

		if(!isset($params)){
			$response = array(
				'result' => 'error',
				'details' => 'Error en la solicitud'
			);

			Response::result(400, $response);
			exit;
		}


		$insert_id = $venta->insert($params);

		$response = array(
			'result' => 'ok',
			'insert_id' => $insert_id
		);

		Response::result(201, $response);
		break;

	/**
	 * Cuando es PUT, comprobamos si la petición lleva el id de registro que hay que actualizar. En caso afirmativo se usa el método update() del modelo.
	 */
	case 'PUT':
		$params = json_decode(file_get_contents('php://input'), true);

		if(!isset($params) || !isset($_GET['id']) || empty($_GET['id'])){
			$response = array(
				'result' => 'error',
				'details' => 'Error en la solicitud'
			);

			Response::result(400, $response);
			exit;
		}

		$venta->update($_GET['id'], $params);

		$response = array(
			'result' => 'ok'
		);

		Response::result(200, $response);	
		break;

		/**
		 * Si se recibe un PATCH se llama al método patch del modelo, tras comprobar que se han recibido los parámetros necesarios
		 */
		case 'PATCH':
			//Llama al método patch del modelo
			$params = json_decode(file_get_contents('php://input'), true);//Se recogen los parámetros que se han enviado en la petición PATCH
	
	
			$venta->patch($_GET['id'], $params);//Se llama al método patch() del modelo, pasándole como parámetros el id del jugador y el array $params
	
			$response = 'ok';
	
			Response::result(200, $response);
			break;

	/**
	 * Cuando se solicita un DELETE se comprueba que se envíe un id de registro. En caso afirmativo se utiliza el método delete() del modelo.
	 */
	case 'DELETE':
		if(!isset($_GET['id']) || empty($_GET['id'])){
			$response = array(
				'result' => 'error',
				'details' => 'Error en la solicitud'
			);

			Response::result(400, $response);
			exit;
		}

		$venta->delete($_GET['id']);

		$response = array(
			'result' => 'ok'
		);

		Response::result(200, $response);
		break;

	/**
	 * Para cualquier otro tipo de petición se devuelve un mensaje de error 404.
	 */
	default:
		$response = array(
			'result' => 'error'
		);

		Response::result(404, $response);

		break;
}
?>