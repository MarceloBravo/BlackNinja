<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Conexion{
    
    static public function conectar(){ 
        try{
            $link = new PDO("mysql:host=127.0.0.1;dbname=blackninja","root","mabc");
        }catch(Exception $e){
            $link = false;
        }
        return $link;
    }
    
}

