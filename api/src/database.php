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

	public function __construct()
	{
		// $host_name = '';
		// $database = '';
		// $user_name = 
		// $password = ;
		// $this->connection = new mysqli($host_name, $user_name, $password, $database);

		// if ($this->connection->connect_errno) {
		// 	echo 'Error de conexión a la base de datos';
		// 	exit;
		// }
		$host_name = 'localhost';
		$database = 'peluqueria';
		$user_name = 'root';
		$password = '';
		$this->connection = new mysqli($host_name, $user_name, $password, $database);

		if ($this->connection->connect_errno) {
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

		if ($extra != null) {
			$query .= ' WHERE';

			foreach ($extra as $key => $condition) {
				$query .= ' ' . $key . ' = "' . $condition . '"';
				if ($extra[$key] != end($extra)) {
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

		$query = "INSERT INTO $table (" . $fields . ') VALUES (' . $values . ')';
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
			if (sizeof($data) > 1 && $key != array_key_last($data)) {
				$query .= " , ";
			}
		}

		$query .= ' WHERE id = ' . $id;

		$this->connection->query($query);

		if (!$this->connection->affected_rows) {
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
		if ($table == "clientes") {
			$query = "DELETE FROM registro_clientes WHERE id_cliente = $id";
			$this->connection->query($query);
		}

		if ($table == "ventas") {
			$query = "DELETE FROM productos_ventas WHERE id = $id";
			$this->connection->query($query);
		}
		$query = "DELETE FROM $table WHERE id = $id";
		$this->connection->query($query);

		if (!$this->connection->affected_rows) {
			return 0;
		}

		return $this->connection->affected_rows;
	}

	/**
	 * Método para recuperar los datos del registro de clientes, ordenados por fecha e ID.
	 */
	public function getRegistro($id_cliente)
	{
		$query = "SELECT * FROM registro_clientes WHERE id_cliente = $id_cliente ORDER BY fecha DESC, id DESC";
		$results = $this->connection->query($query);
		$resultArray = array();
		foreach ($results as $value) {
			$resultArray[] = $value;
		}
		return $resultArray;
	}

	/**
	 * Método para obtener una nueva ID de productos o servicios
	 */
	public function getNuevaId($table)
	{
		if ($table == "productos") {
			$query = "SELECT MAX(id) AS max_id FROM productos";
			$result = $this->connection->query($query);
			$row = $result->fetch_assoc();
			$maxId = $row['max_id'];
			if ($maxId == null) {
				return "P0001";
			}
			$number = intval(substr($maxId, 1)) + 1;
			//str_pad para que el número tenga 4 dígitos
			$number = str_pad($number, 4, '0', STR_PAD_LEFT);
			return "P" . $number;
		} elseif ($table == "servicios") {
			$query = "SELECT MAX(id) AS max_id FROM servicios";
			$result = $this->connection->query($query);
			$row = $result->fetch_assoc();
			$maxId = $row['max_id'];
			if ($maxId == null) {
				return "S0001";
			}
			$number = intval(substr($maxId, 1)) + 1;
			//str_pad para que el número tenga 4 dígitos
			$number = str_pad($number, 4, '0', STR_PAD_LEFT);
			return "S" . $number;
		} else {
			return null;
		}
	}

	/**
	 * Método para insertar una nueva ID de productos o servicios, si es un producto, se inserta
	 * en la tabla productos, si es un servicio, se inserta en la tabla servicios
	 */
	public function insertPoS($table, $data)
	{
		$id = $this->getNuevaId($table);
		$data['id'] = $id;

		$fields = implode(',', array_keys($data));
		$values = '"';
		$values .= implode('","', array_values($data));
		$values .= '"';

		$query = "INSERT INTO $table (" . $fields . ') VALUES (' . $values . ')';
		$this->connection->query($query);

		return $this->connection->insert_id;
	}

	/**
	 * Método para recuperar los datos de la caja, si no se pasa fecha, se muestran todos los datos, si se pasa fecha, se muestran los datos de esa fecha
	 */
	public function getCierreCajaDB($fecha)
	{
		if (empty($fecha)) {
		//COALESCE para que si no hay ventas de un tipo, se muestre 0, en vez de NULL
		$query = "SELECT 
		DATE(fecha) as fecha,
		SUM(CASE WHEN tipo = 'tarjeta' THEN total ELSE 0 END) as tarjeta,
		SUM(CASE WHEN tipo = 'efectivo' THEN total ELSE 0 END) as efectivo,
		SUM(total) as total
	FROM ventas
	GROUP BY DATE(fecha)";
		} else {
			$fechaDefinida = $fecha['fecha'];

			$query = "SELECT DATE(fecha) as fecha, 
            SUM(CASE WHEN tipo = 'tarjeta' THEN total ELSE 0 END) as tarjeta, 
            SUM(CASE WHEN tipo = 'efectivo' THEN total ELSE 0 END) as efectivo, 
            SUM(total) as total 
        FROM ventas 
        WHERE DATE(fecha) = '$fechaDefinida' 
        GROUP BY DATE(fecha)";
		}

		$results = $this->connection->query($query);

		$resultArray = array();
		foreach ($results as $value) {
			$resultArray[] = $value;
		}
		return $resultArray;
	}

	/**
	 * Método para recuperar los datos de la agenda, si no se pasa fecha, se muestran todos los datos, si se pasa fecha, se muestran los datos de esa fecha
	 */
	public function getCitaDB($extra = null)
	{
		$query = "SELECT * FROM agenda";

		if ($extra != null) {
			$query .= ' WHERE';

			foreach ($extra as $key => $condition) {
				$query .= ' ' . $key . ' = ' . $condition . '';
				if ($extra[$key] != end($extra)) {
					$query .= " AND ";
				}
			}
		}
		$query .= " ORDER BY fecha, hora ASC";

		$results = $this->connection->query($query);
		$resultArray = array();

		foreach ($results as $value) {
			$resultArray[] = $value;
		}

		return $resultArray;
	}
}
