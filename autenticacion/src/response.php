<?php
/**
 * Clase estática que se utiliza para generar la respuesta que se envía al cliente que hace uso de la API REST.
 */
class Response
{
	public static function result($code, $response){

		header('Content-type: application/json');
		http_response_code($code);

		echo json_encode($response);
	}
}

?>