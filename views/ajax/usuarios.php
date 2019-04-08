<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../../controller/Ajax.php';
require_once '../../controller/UsuariosController.php';
require_once '../../models/UsuariosModel.php';

# ---------------- GESTIÓN DE USUARIOS ------------------------
if(isset($_POST["identificador"])){
    $a = new Ajax();    
    $a->setIdentificador($_POST["identificador"]); 
    $a->setNombre($_POST["nombre"]);
    $a->setFoto($_POST["foto"]);
    $a->setNivel1(true);
    $a->setPtje1(100);
    $a->setNivel2(false);
    $a->setPtje2(0);
    $a->setNivel3(false);
    $a->setPtje3(0);
    $a->gestorUsuarioAjax();
}

# ---------------- CAMBIO DE NIVEL ------------------------
if(isset($_POST["nivel"])){
    $b = new Ajax();
    $b->setId($_POST['id']);
    $b->setNivel($_POST['nivel']);
    $b->setCompletado($_POST['completado']);
    $b->setPuntaje($_POST['puntaje']);
    $b->gestorCambioNivelAjax();
}