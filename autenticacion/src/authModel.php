<?php
/**
 * Clase del modelo para la tabla de usuarios
 * Representa un registro de la tabla de usuarios y permite hacer el login, obtener un token de un usuario y actualizar el token de un usuario
 */
class AuthModel
{
	private $connection;
	
	public function __construct()
	{
		$host_name = 'localhost';
		$database = 'peluqueria';
		$user_name = 'root';
		$password = '';
		$this->connection = new mysqli($host_name, $user_name, $password, $database);

		if ($this->connection->connect_errno) {
			echo 'Error de conexión a la base de datos';
			exit;
		}

	// 	$host_name = '';
	// 	$database = '';
	// 	$user_name = '';
	// 	$password = '';
	// 	$this->connection = new mysqli($host_name, $user_name, $password, $database);

	// 	if ($this->connection->connect_errno) {
	// 		echo 'Error de conexión a la base de datos';
	// 		exit;
	//    }
	}

	/**
	 * Método para autentificarse en la API
	 */
	public function login($username, $password)
	{
		$query = "SELECT * FROM empleados WHERE nombre = '$username' AND password = '$password'";//Consulta para obtener el usuario con el nombre de usuario y contraseña

		$results = $this->connection->query($query);//Se ejecuta la consulta

		$resultArray = array();//Array para guardar los resultados

		if($results != false){//Si hay resultados
			foreach ($results as $value) {//Se recorren los resultados
				$resultArray[] = $value;//Se guardan en el array
			}
		}

		return $resultArray;//Se devuelven los resultados
	}

	/**
	 * Método para actualizar el token de un usuario con un determinado id
	 * Se utiliza después de una autentificación correcta
	 */
	public function update($id, $token)
	{
		$query = "UPDATE empleados SET token = '$token' WHERE id = $id";

		$this->connection->query($query);
		
		if(!$this->connection->affected_rows){
			return 0;
		}

		return $this->connection->affected_rows;
	}

	/**
	 * Método para obtener el token de un determinado id
	 */
	public function getById($id)
	{
		$query = "SELECT token FROM empleados WHERE id = $id";

		$results = $this->connection->query($query);

		$resultArray = array();

		if($results != false){
			foreach ($results as $value) {
				$resultArray[] = $value;
			}
		}

		return $resultArray;
	}

	

	public function getIdUser($token)
	{
		$query = "SELECT `id` FROM `empleados` WHERE `token` = '$token'";
		$result = $this->connection->query($query);
		$row = $result->fetch_assoc();
		return (int) $row['id'];
	}
}
