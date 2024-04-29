<?php
/**
 * Clase para el modelo que representa a la tabla "productos_ventas".
 */

require_once 'src/database.php';

class User extends Database
{
	/**
	 * Atributo que indica la tabla asociada a la clase del modelo
	 */
	private $table = 'productos_ventas';

	/**
	 * Array con los campos de la tabla que se pueden usar como filtro para recuperar registros
	 */
	private $allowedConditions_get = array(
		'id',
		'nombre',
		'id_item',
		'id_cliente',
		'cantidad',
		'precio'
	);

	/**
	 * Array con los campos de la tabla que se pueden proporcionar para insertar registros
	 */
	private $allowedConditions_insert = array(
		'id',
		'nombre',
		'id_item',
		'id_cliente',
		'cantidad',
		'precio'
	);

	/**
	 * Método para validar los datos que se mandan para insertar un registro, comprobar campos obligatorios, valores válidos, etc.
	 */
	private function validate($data){
		
		if(!isset($data['id_item']) || empty($data['id_item'])){
			$response = array(
				'result' => 'error',
				'details' => 'El campo id_item es obligatorio'
			);

			Response::result(400, $response);
			exit;
		}
		
		return true;
	}

	/**
	 * Método para recuperar registros, pudiendo indicar algunos filtros 
	 */
	public function get($params){
		foreach ($params as $key => $param) {
			if(!in_array($key, $this->allowedConditions_get)){
				unset($params[$key]);
				$response = array(
					'result' => 'error',
					'details' => 'Error en la solicitud'
				);
	
				Response::result(400, $response);
				exit;
			}
		}

		$registros = parent::getDB($this->table, $params);

		return $registros;
	}

	/**
	 * Método para guardar un registro en la base de datos, recibe como parámetro el JSON con los datos a insertar
	 */
	public function insert($params)
	{
		foreach ($params as $key => $param) {
			if(!in_array($key, $this->allowedConditions_insert)){
				unset($params[$key]);
				$response = array(
					'result' => 'error',
					'details' => 'Error en la solicitud'
				);
	
				Response::result(400, $response);
				exit;
			}
		}
			return parent::insertDB($this->table, $params);
	}

	/**
	 * Método para actualizar un registro en la base de datos, se indica el id del registro que se quiere actualizar
	 */
	public function update($id, $params)
	{
		foreach ($params as $key => $parm) {
			if(!in_array($key, $this->allowedConditions_insert)){
				unset($params[$key]);
				$response = array(
					'result' => 'error',
					'details' => 'Error en la solicitud'
				);
	
				Response::result(400, $response);
				exit;
			}
		}

		if($this->validate($params)){
			$affected_rows = parent::updateDB($this->table, $id, $params);

			if($affected_rows==0){
				$response = array(
					'result' => 'error',
					'details' => 'No hubo cambios'
				);

				Response::result(200, $response);
				exit;
			}
		}
	}

	public function patch($id, $params)
	{
		$affected_rows = parent::updateDB($this->table, $id, $params);//Llama al método updateDB de la clase Database, que actualiza un registro en la base de datos

		if ($affected_rows == 0) {//Si no se ha actualizado ningún registro, devuelve un error
			$response = array(
				'result' => 'error',
				'details' => 'No hubo cambios'
			);

			Response::result(200, $response);//Genera una respuesta con el código de error 200 y el array $response
			exit;

	}
}

	/**
	 * Método para borrar un registro de la base de datos, se indica el id del registro que queremos eliminar
	 */
	public function delete($id)
	{
		$affected_rows = parent::deleteDB($this->table, $id);

		if($affected_rows==0){
			$response = array(
				'result' => 'error',
				'details' => 'No hubo cambios'
			);

			Response::result(200, $response);
			exit;
		}
	}

}

?>