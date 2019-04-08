<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class UsuariosController{
    
    #GUARDAR USUARIOS
    static public function guardarUsuarios($datos){
        $datosController = array("identificador"=>$datos["identificador"],
                                "nombre"=>$datos["nombre"],
                                "foto"=>$datos["foto"],
                                "nivel"=>TRUE,
                                "ptje1"=>100,
                                "nive2"=>false,
                                "ptje2"=>0,
                                "nive3"=>false,
                                "ptje3"=>0);
        
        $resp = UsuariosModel::buscarPorRut($datos["identificador"]);
        if(!$resp){ //Crea un nuevo usuario en caso de que éste no exista
            UsuariosModel::guardar($datosController);
            $resp = UsuariosModel::buscarPorRut($datos["identificador"]);
        }
        
        session_start();
        
        $_SESSION['validar'] = ($resp != false);
        if($resp){
            
            $_SESSION['usuario']['id'] = $resp['id'];
            $_SESSION['usuario']['identificador'] = $resp['identificador'];
            $_SESSION['usuario']['nombre'] = $resp['nombre'];
            $_SESSION['usuario']['foto'] = $resp['foto'];
            $_SESSION['usuario']['nivel1'] = $resp['nivel1'] == "1";
            $_SESSION['usuario']['ptje1'] = $resp['ptje1'];
            $_SESSION['usuario']['nivel2'] = $resp['nivel2'] == "1";
            $_SESSION['usuario']['ptje2'] = $resp['ptje2'];
            $_SESSION['usuario']['nivel3'] = $resp['nivel3'] == "1";
            $_SESSION['usuario']['ptje3'] = $resp['ptje3'];
            
        }
        
        return ($resp != false);
    }
    
    static function mejoresPuntajes($nivel){
        $res = UsuariosModel::mejoresPuntajes($nivel);
        
        foreach($res as $row=>$item){
            echo "<li>
                    <img src='".$item['foto']."'/>
                    <h3>".$item['nombre']."</h3>
                    <h2>".$item['ptje'.$nivel]."</h2>
                  </li>";
        }
        
    }
    
    
    # -------------- GUARDAR PUNTAJES --------------
    public static function guardarPuntajes($datos){
        
        $numeroNivel = ($datos['nivel']==3 ? 3 : $datos['nivel']+1);
        
        $datosPtje = array(
            "columna_nivel"=>"nivel".$numeroNivel,
            "columna_puntaje"=>"ptje".$datos['nivel'],
            "completado"=>($datos['completado']=="true"),
            "puntaje"=>$datos['puntaje'],
            "id"=>$datos['id']
        );
        
        $resp = UsuariosModel::guardarPuntajes($datosPtje, "usuarios");

        $result = UsuariosModel::buscarPorId($datos['id'], "usuarios");
        UsuariosController::actualizaDatosSession($result);
        
        
        return $result !== false;
    }
    
    
    static function actualizaDatosSession($datos){
        if($datos){     
            if(session_status() == PHP_SESSION_NONE)
            {
                session_start();
            }
            $_SESSION['usuario']['identificador'] = $datos['identificador'];
            $_SESSION['usuario']['nombre'] = $datos['nombre'];
            $_SESSION['usuario']['foto'] = $datos['foto'];
            $_SESSION['usuario']['nivel1'] = $datos['nivel1'] == "1";
            $_SESSION['usuario']['ptje1'] = $datos['ptje1'];
            $_SESSION['usuario']['nivel2'] = $datos['nivel2'] == "1";
            $_SESSION['usuario']['ptje2'] = $datos['ptje2'];
            $_SESSION['usuario']['nivel3'] = $datos['nivel3'] == "1";
            $_SESSION['usuario']['ptje3'] = $datos|['ptje3'];
        }
    }
    
    
}

