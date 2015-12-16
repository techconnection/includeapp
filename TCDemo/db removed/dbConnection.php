<?php

function connectDB() {
    try {
        $servername = "localhost";
        $username = "aaronclo_aaroncl";
        $password = "6CpYwvtV7ees";
        $dbname = "aaronclo_tech_connection";
        $dsn = "mysql:host=$servername;dbname=$dbname";

        $options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        ); 

        $conn = new PDO($dsn, $username, $password, $options);
        return $conn;
        }
    catch(PDOException $e)
        {
        
        return false;
        }
}

?>