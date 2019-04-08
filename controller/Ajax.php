<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Ajax{
    
   private $id; //ID USUARIO
   private $identificador; 
   # ------------------ GESTOSR USUARIOS ------------------
   private $nombre;
   private $foto;
   private $nivel1;
   private $ptje1;
   private $nivel2;
   private $ptje2;
   private $nivel3;
   private $ptje3;
   # ------------------ GESTOSR PUNTAJES ------------------
   private $nivel;
   private $completado;
   private $puntaje;
   
   
   
   function getId() {
       return $this->id;
   }
   
   
   function setId($id) {
       $this->id = $id;
   }
   
   function getIdentificador() {
       return $this->identificador;
   }

   function setIdentificador($identificador) {
       $this->identificador = $identificador;
   }

      
   # ------------------- GETERS Y SETERS DE GESTIÓN USUARIOS  ----------------------

   function getNombre() {
       return $this->nombre;
   }

   function getFoto() {
       return $this->foto;
   }

   function setNombre($nombre) {
       $this->nombre = $nombre;
   }

   function setFoto($foto) {
       $this->foto = $foto;
   }

   function getNivel1() {
       return $this->nivel1;
   }

   function getPtje1() {
       return $this->ptje1;
   }

   function getNivel2() {
       return $this->nivel2;
   }

   function getPtje2() {
       return $this->ptje2;
   }

   function getNivel3() {
       return $this->nivel3;
   }

   function getPtje3() {
       return $this->ptje3;
   }

   function setNivel1($nivel1) {
       $this->nivel1 = $nivel1;
   }

   function setPtje1($ptje1) {
       $this->ptje1 = $ptje1;
   }

   function setNivel2($nivel2) {
       $this->nivel2 = $nivel2;
   }

   function setPtje2($ptje2) {
       $this->ptje2 = $ptje2;
   }

   function setNivel3($nivel3) {
       $this->nivel3 = $nivel3;
   }

   function setPtje3($ptje3) {
       $this->ptje3 = $ptje3;
   }
   
   # ------------------- GETERS Y SETERS DE GESTIÓN CAMBIO NIVEL  ----------------------
   
   function getNivel() {
       return $this->nivel;
   }

   function getCompletado() {
       return $this->completado;
   }

   function getPuntaje() {
       return $this->puntaje;
   }

   function setNivel($nivel) {
       $this->nivel = $nivel;
   }

   function setCompletado($completado) {
       $this->completado = $completado;
   }

   function setPuntaje($puntaje) {
       $this->puntaje = $puntaje;
   }

      
   
   
   
   # ------------------------------ GESTIÓN DE USUARIOS ----------------------}
   public function gestorUsuarioAjax(){
        $datos = array("identificador" => $this->identificador,
                      "nombre" => $this->nombre, 
                       "foto" => $this->foto,
                       "nivel1" => $this->nivel1,
                       "ptje1" => $this->ptje1,
                       "nivel2" => $this->nivel2,
                       "ptje2" => $this->ptje2,
                       "nivel3" => $this->nivel3,
                       "ptje3" => $this->ptje3);
       
       $resp = UsuariosController::guardarUsuarios($datos); //Llamada a un método estático
       
        echo $resp ? "ok" : "error";
   }
   
   
   # ------------------------------ GESTIÓN CAMBIO DE NIVEL ----------------------}
   public function gestorCambioNivelAjax(){
       $datos = array(
            "nivel"=>$this->nivel,
            "puntaje"=>$this->puntaje,
            "completado"=>$this->completado,
            "id"=>$this->id
           );
       
       $resp = UsuariosController::guardarPuntajes($datos);
       
       echo $resp ? "ok" : "error";
   }
}

