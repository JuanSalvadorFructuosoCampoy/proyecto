<?php
/**
 *	Script que se usa en los endpoints para trabajar con registros de la tabla PLAYER
 *	La clase "player.class.php" es la clase del modelo, que representa a un jugador de la tabla
*/
require_once 'classes/response.php';
require_once 'src/classes/empleados.class.php';
require_once 'autenticacion/src/classes/auth.class.php';

$auth = new Authentication(); // Se crea un objeto de la clase Authentication
$auth->verify();// Se verifica si el usuario está autenticado

$player = new User();// Se crea un objeto de la clase User

/**
 * Se mira el tipo de petición que ha llegado a la API y dependiendo de ello se realiza una u otra accción
 */
switch ($_SERVER['REQUEST_METHOD']) {
	/**
	 * Si se ha recibido un GET se llama al método get() del modelo y se le pasan los parámetros recibidos por GET en la petición
	 */
	case 'GET':
		$params = $_GET;

		$empleados = $player->get($params);// Se llama al método get() del modelo y se le pasan los parámetros recibidos por GET en la petición
		//$consultas = $user->verUsos($id);// Se llama al método verUsos() del modelo para ver los usos de la API
		$response = array(
			'result' => 'ok',
			'empleados' => $empleados, 
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


		$insert_id = $empleado->insert($params);

		$response = array(
			'result' => 'ok',
			'insert_id' => $insert_id
		);

		Response::result(201, $response);
		break;

	/**
	 * Cuando es PUT, comprobamos si la petición lleva el id del jugador que hay que actualizar. En caso afirmativo se usa el método update() del modelo.
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

		$player->update($_GET['id'], $params);

		$response = array(
			'result' => 'ok'
		);

		Response::result(200, $response);	
		break;

		case 'PATCH':
			//Llama al método patch del modelo
			$params = json_decode(file_get_contents('php://input'), true);//Se recogen los parámetros que se han enviado en la petición PATCH
	
	
			$player->patch($_GET['id'], $params);//Se llama al método patch() del modelo, pasándole como parámetros el id del jugador y el array $params
	
			$response = 'ok';
	
			Response::result(200, $response);
			break;

	/**
	 * Cuando se solicita un DELETE se comprueba que se envíe un id de jugador. En caso afirmativo se utiliza el método delete() del modelo.
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

		$player->delete($_GET['id']);

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