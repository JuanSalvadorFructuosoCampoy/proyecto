<?php
/**
 * Clase para trabajar con la autentificación en la API
 * Hace uso de las clases implementadas en la carpeta "jwt" para realizar la autentificación mediante token
 * El token se genera a partir del id del usuario, por lo que cada usuario tendrá siempre un token distinto. Además del id, para generar el token se hace uso de una clave secreta que es un atributo de la clase
 */
require_once 'authModel.php';
require_once dirname(__DIR__) . '/jwt/JWT.php'; 
require_once 'response.php';
use Firebase\JWT\JWT;

class Authentication extends AuthModel
{
	/**
	 * Tabla donde estarán los usuarios
	 */
	private $table = 'empleados';

	/**
	 * Clave secreta para realizar la encriptación y desencriptación del token, se debería cambiar por una clave robusta
	 */
	private $key = 'clave_secreta';

	/**
	 * Método para que un usuario se autentifique con un nombre de usuario y una contraseña
	 */
	public function signIn($user)
	{
		if(!isset($user['usuario']) || !isset($user['password']) || empty($user['usuario']) || empty($user['password'])){
			$response = array(
				'result' => 'error',
				'details' => 'Los campos nombre y contraseña son obligatorios'
			);
			
			Response::result(400, $response);
			exit;
		}

		$result = parent::login($user['usuario'], hash('sha256' , $user['password']));

		if(sizeof($result) == 0){
			$response = array(
				'result' => 'error',
				'details' => 'El usuario y/o la contraseña son incorrectas'
			);

			Response::result(403, $response);
			exit;
		}

		if(isset($result[0]['activo']) && $result[0]['activo'] == 0){
			$response = array(
				'result' => 'error',
				'details' => 'El usuario no está activo. Por favor, contacte con el administrador del sistema para más información'
			);

			Response::result(403, $response);
			exit;
		}

		$dataToken = array(
			'iat' => time(),
			'data' => array(
				'id' => $result[0]['id'],
				'nombre' => $result[0]['nombre']
			)
		);

		$jwt = JWT::encode($dataToken, $this->key);

		parent::update($result[0]['id'], $jwt);

		return $jwt;
	}

	/**
	 * Método para verificar si un token es válido cuando se realiza una petición a la API
	 * El token se manda como header poniendo en name "api-key" y como value el valor del token
	 */
	public function verify()//Método para verificar si el token es válido
    {
        if(!isset($_SERVER['HTTP_API_KEY'])){//Si no se ha mandado el token, entonces manda un mensaje de error diciendo que no tiene autorización para usar la API
    //EL TOKEN DEBE GUARDARSE COMO UNA VARIABLE DE SESIÓN O COMO UNA COOKIE A LA HORA DE IMPLEMENTARLO EN UNA APLICACIÓN REAL.
	//EN POSTMAN, DEBEMOS SELECCIONAR LA OPCIÓN "HEADERS", PONER api-key EN LA PRIMERA COLUMNA Y EL TOKEN EN LA SEGUNDA
            $response = array(
                'result' => 'error',
                'details' => 'Usted no tiene los permisos para esta solicitud'
            );
        
            Response::result(403, $response);
            exit;
        }

        $jwt = $_SERVER['HTTP_API_KEY'];

        try {
            $data = JWT::decode($jwt, $this->key, array('HS256'));

			$user = parent::getById($data->data->id);

			if($user[0]['token'] != $jwt){
				throw new Exception();
			}
			
            return $data;
        } catch (\Throwable $th) {
            
            $response = array(
                'result' => 'error',
                'details' => 'No tiene los permisos para esta solicitud'
            );
        
            Response::result(403, $response);
            exit;
        }
    }
}
