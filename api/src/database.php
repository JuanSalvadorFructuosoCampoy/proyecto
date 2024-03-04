<?php
/**
 * Clase con la lógica para conectarse a la base de datos. 
 * Incluye métodos para recuperar registros, actualizar y borrarlos de cualquier tabla de la base de datos, además de poder filtrar las consultas.
 */
class Database
{
	private $connection;
	/**
	 * Atributo que indica la cantidad de registros por página a la hora de recuperar datos
	 */
	private $results_page = 50;

	public function __construct(){
		$this->connection = new mysqli('127.0.0.1', 'root', '', 'peluqueria', '3306');

		if($this->connection->connect_errno){
			echo 'Error de conexión a la base de datos';
			exit;
		}
	}

	/**
	 * Método para recuperar datos de una tabla, pudiendo indicar filtros con el parámetro $extra
	 */
	public function getDB($table, $extra = null)
	{
		$query = "SELECT * FROM $table";

		if($extra != null){
			$query .= ' WHERE';

			foreach ($extra as $key => $condition) {
				$query .= ' '.$key.' = "'.$condition.'"';
				if($extra[$key] != end($extra)){
					$query .= " AND ";
				}
			}
		}

		$results = $this->connection->query($query);
		$resultArray = array();

		foreach ($results as $value) {
			$resultArray[] = $value;
		}

		return $resultArray;
	}

	/**
	 * Método para insertar un nuevo registro
	 */
	public function insertDB($table, $data)
	{
		$fields = implode(',', array_keys($data));
		$values = '"';
		$values .= implode('","', array_values($data));
		$values .= '"';

		$query = "INSERT INTO $table (".$fields.') VALUES ('.$values.')';
		$this->connection->query($query);

		return $this->connection->insert_id;
	}

	/**
	 * Método para actualizar un registro de la BD
	 * Hay que indicar el registro mediante un campo que sea clave primaria y que debe llamarse "id"
	 */
	public function updateDB($table, $id, $data)
	{	
		$query = "UPDATE $table SET ";
		foreach ($data as $key => $value) {
			$query .= "$key = '$value'";
			if(sizeof($data) > 1 && $key != array_key_last($data)){
				$query .= " , ";
			}
		}

		$query .= ' WHERE id = '.$id;

		$this->connection->query($query);

		if(!$this->connection->affected_rows){
			return 0;
		}

		return $this->connection->affected_rows;
	}

	/**
	 * Método para eliminar un registro de la BD
	 * Hay que indicar el registro mediante un campo que sea clave primaria y que debe llamarse "id"
	 */
	public function deleteDB($table, $id)
	{
		if($table == "clientes"){
			$query = "DELETE FROM registro_clientes WHERE id_cliente = $id";
			$this->connection->query($query);
		}

		if($table == "ventas"){
			$query = "DELETE FROM productos_ventas WHERE id = $id";
			$this->connection->query($query);
		}
		$query = "DELETE FROM $table WHERE id = $id";
		$this->connection->query($query);

		if(!$this->connection->affected_rows){
			return 0;
		}

		return $this->connection->affected_rows;
	}
	
	public function getRegistro($id_cliente){
		$query = "SELECT * FROM registro_clientes WHERE id_cliente = $id_cliente ORDER BY fecha DESC, id DESC";
		$results = $this->connection->query
		($query);
		$resultArray = array();
		foreach ($results as $value) {
			$resultArray[] = $value;
		}
		return $resultArray;
	}

	public function getNuevaId($table){
		if($table == "productos"){
			$query = "SELECT MAX(id) AS max_id FROM productos";
			$result = $this->connection->query($query);
			$row = $result->fetch_assoc();
			$maxId = $row['max_id'];
			if($maxId == null){
				return "P1";
			}
			$number = intval(substr($maxId, 1)) + 1;
			return "P" . $number;
		}
		elseif($table == "servicios"){
			$query = "SELECT MAX(id) AS max_id FROM servicios";
			$result = $this->connection->query($query);
			$row = $result->fetch_assoc();
			$maxId = $row['max_id'];
			if($maxId == null){
				return "S1";
			}
			$number = intval(substr($maxId, 1)) + 1;
			return "S" . $number;
		}
		else{
			return null;
		}
	}

	public function insertPoS($table, $data)
	{
		$id = $this->getNuevaId($table);
		$data['id'] = $id;

		$fields = implode(',', array_keys($data));
		$values = '"';
		$values .= implode('","', array_values($data));
		$values .= '"';

		$query = "INSERT INTO $table (".$fields.') VALUES ('.$values.')';
		$this->connection->query($query);

		return $this->connection->insert_id;
	}

	public function getCierreCajaDB($fecha){
		$fechaDefinida = $fecha['fecha'];
		$query = "SELECT SUM(total) FROM ventas WHERE fecha LIKE '%$fechaDefinida%' AND tipo = 'tarjeta'";
		$query2 = "SELECT SUM(total) FROM ventas WHERE fecha LIKE '%$fechaDefinida%' AND tipo = 'efectivo'";

		$results = $this->connection->query($query);
		$results2 = $this->connection->query($query2);

		$total = array();
		$total['tarjeta'] = $results->fetch_row()[0];
		$total['efectivo'] = $results2->fetch_row()[0];

		return $total;
	}
}


?>