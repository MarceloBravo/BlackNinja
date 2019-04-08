<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'Conexion.php';

class UsuariosModel{
    
    static function guardar($datos){
        
        $conect = Conexion::conectar();
        if($conect){
            try{
                $stmt = $conect->prepare("INSERT INTO usuarios (identificador, nombre, foto, nivel1, ptje1, nivel2, ptje2, nivel3, ptje3) VALUES (:identificador, :nombre, :foto, :nivel1, :ptje1, :nivel2, :ptje2, :nivel3, :ptje3)"); 
                $stmt->bindParam(":identificador", $datos['identificador'],PDO::PARAM_INT);
                $stmt->bindParam(":nombre", $datos['nombre'],PDO::PARAM_STR);
                $stmt->bindParam(":foto", $datos['foto'],PDO::PARAM_STR);
                $stmt->bindParam(":nivel1", $datos['nivel1'],PDO::PARAM_STR);
                $stmt->bindParam(":ptje1", $datos['ptje1'],PDO::PARAM_INT);
                $stmt->bindParam(":nivel2", $datos['nivel2'],PDO::PARAM_STR);
                $stmt->bindParam(":ptje2", $datos['ptje2'],PDO::PARAM_INT);
                $stmt->bindParam(":nivel3", $datos['nivel3'],PDO::PARAM_STR);
                $stmt->bindParam(":ptje3", $datos['ptje3'],PDO::PARAM_INT);

                $resp =  ($stmt->execute());  
                //$lastId = $conect->lastInsertId();
                $stmt->closeCursor();
                //if($resp){
                //    UsuariosModel::grabarNivel($datos, $lastId);
                //}
            }catch(Exception $e){
                $resp = false;
            }
        }
        return $resp;
    }
    
    /*
    private static function grabarNivel($datos, $idUsuario){
        $conect = Conexion::conectar();
        try{
            $stmt = $conect->prepare("INSERT INTO niveles (nivel, puntaje, id_usuario, ok) VALUES (:nivel, :puntaje, :id_usuario, :ok)");
            
            $stmt->bindParam(":nivel",$datos['nivel'], PDO::PARAM_INT);
            $stmt->bindParam(":puntaje",$datos['puntaje'], PDO::PARAM_INT);
            $stmt->bindParam(":id_usuario",$idUsuario, PDO::PARAM_INT);
            $stmt->bindParam(":ok",$datos['ok'], PDO::PARAM_BOOL);
            $resp = ($stmt->execute());
            
            $stmt->closeCursor();
            
        }catch(Exception $e){
            $resp = false;
        }
        
        return $resp;
    }
    */
    static function buscarPorRut($id){
        $stmt = Conexion::conectar()->prepare("SELECT * FROM usuarios WHERE identificador = :id");
        $stmt->bindParam("id", $id,PDO::PARAM_INT);
        $stmt->execute();
        $resp = $stmt->fetch();
        $stmt->closeCursor();
        
        return $resp;
    }
    
    
    static function mejoresPuntajes($nivel){
        $ptje = "ptje".$nivel;
        $colNivel = "nivel".$nivel;
        $stmt = Conexion::conectar()->prepare("SELECT nombre, foto, ".$colNivel.", ".$ptje." FROM usuarios WHERE identificador ORDER BY :ptje DESC LIMIT 3");
        //$stmt->bindParam(":nivel",$colNivel, PDO::PARAM_STR);
        $stmt->bindParam(":ptje",$ptje, PDO::PARAM_STR);
        $stmt->execute();
        $resp = $stmt->fetchAll();
        $stmt->closeCursor();
        
        return $resp;
    }
    /*
    private function find($stmt, $datos){
        $stmt->prepare("SELECT * FROM usuarios WHERE identificador = :identificador");
        $stmt->bindParam(":identificador", $datos['identificador'],PDO::PARAM_INT);
        $stmt->execute();
        $resp = $stmt->fetch();
        return $resp;
    }
    */
    
    static function guardarPuntajes($datos, $tabla){
        $stmt = Conexion::conectar()->prepare("UPDATE $tabla SET ".$datos['columna_nivel']." = :completado, ".$datos['columna_puntaje']." = :ptje WHERE id = :id");
        $stmt->bindParam("completado",$datos['completado'], PDO::PARAM_BOOL);
        $stmt->bindParam("ptje",$datos['puntaje'], PDO::PARAM_INT);
        $stmt->bindParam("id",$datos['id'], PDO::PARAM_INT);
        $resp = $stmt->execute(); //Retorna un boolean 
        $stmt->closeCursor();
        return $resp;
    }
    
    
    static function buscarPorId($id, $tabla){
        try{
            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE id = :id");
            $stmt->bindParam("id",$id, PDO::PARAM_INT);
            $stmt->execute();
            $resp = $stmt->fetch();
            $stmt->closeCursor();
        } catch (Exception $e){
            $resp = false;
        }
        return $resp;
        
    }
        
}
