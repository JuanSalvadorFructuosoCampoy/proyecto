<?php
/**
 * Clase que hace de endpoint para la autentificación
 * Se debe mandar por POST un json con el usuario y la contraseña
 */
require_once 'src/auth.class.php';
require_once 'src/response.php';

$auth = new Authentication();

switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
		// Recogemos los datos del usuario, que vienen en formato JSON, y los decodificamos en un array asociativo para poder trabajar con ellos
		$user = json_decode(file_get_contents('php://input'), true);

		$token = $auth->signIn($user);

		$response = array(
			'result' => 'ok',
			'token' => $token,
		);
		Response::result(201, $response);

		break;
}