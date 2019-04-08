/* **************************
 * MÉTODOS DEL OBJETO JUEGO
 ************************* */

var juego = {
    teclado: function () {
        /* **************************
         * EVENTOS DEL TECLADO
         ************************* */
        document.addEventListener("keydown", juego.oprimir);
        document.addEventListener("keyup", juego.soltar);

    },

    oprimir: function (tecla) {
        /* **************************
         * OPRIMIR TECLADO
         ************************* */
        tecla.preventDefault();
        if (tecla.keyCode === 37) { //Flecha izquierda
            datos.izquierda = true
            datos.direccionJugador = "izq";
        }; 
        
        if (tecla.keyCode === 39) { //Flecha derecha
            datos.derecha = true;
            datos.direccionJugador = "der";
        };   
        if (tecla.keyCode === 38) {datos.salto = true};  //Flecha hacia arriba
        
        if (tecla.keyCode === 32) { //Barra espaciadorda
            if(datos.disparoActivado){
                //datos.disparando = true;   
                datos.imgDisparoJugador[datos.imgDisparoJugador.length] = new Image();
                datos.imgDisparoJugador[datos.imgDisparoJugador.length-1].src = "views/img/utileria/balasJugador.png";                             
                datos.disparo_x[datos.disparo_x.length] = datos.jugador_x + datos.jugador_ancho / 2;
                datos.disparo_y[datos.disparo_y.length] = datos.jugador_y + datos.jugador_alto/2;
                datos.disparo_ancho[datos.disparo_ancho.length] = 15;
                datos.disparo_alto[datos.disparo_alto.length] = 15;
                datos.direccionDisparo[datos.direccionDisparo.length] = datos.direccionJugador;
                datos.disparoActivado = false;
            }
        }; 
    },

    soltar: function (tecla) {
        /* **************************
         * SOLTAR TECLADO
         ************************* */
        tecla.preventDefault();
        if (tecla.keyCode === 37) {
            datos.izquierda = false;
            datos.imgJugador.src = "views/img/jugador/stop_left.png";
        }
        ;  //Flecha izquierda
        if (tecla.keyCode === 39) {
            datos.derecha = false;
            datos.imgJugador.src = "views/img/jugador/stop_right.png";
        }
        ;   //Flecha derecha
        if (tecla.keyCode === 38) {
            datos.salto = false;
            datos.imgJugador.src = "views/img/jugador/stop_right.png";
        }
        ; //Flecha hacia arriba
        if (tecla.keyCode === 32) {
            datos.disparo = false;
        }
        ; //Flecha hacia arriba
        if (tecla.keyCode === 32) { //Barra espaciadorda
            datos.disparoActivado = true;
        }; 

    },

    tiempo: function () {
        /* **************************
         * LLAMANDO A CANVAS
         ************************* */
        lienzo.canvas();
        /* **************************
         * MOVIMIENTO TRAMPAS 
         ************************* */
        if (datos.movTrampa <= -50) { datos.cambioMovTrampa = false };
        if (datos.movTrampa >= 100) { datos.cambioMovTrampa = true };
        datos.movTrampa += (datos.cambioMovTrampa) ? -1 : +1;

        /* **************************
         * CICLO SPRITE 
         ************************* */
        //Maneja la velocidad en la que cambia el sprite del personaje
        datos.cicloSprite = datos.cicloSprite >= 500 ? 0 : datos.cicloSprite+20;
        for (var i = 0; i <= datos.cicloSprite; i += 100) {
            datos.sprite = i;
        }

        

        /* **************************
         * REINICIAR PANTALLA
         ************************* */
        if (datos.jugador_y > 500) {
            datos.reiniciar = true
        }
        if (datos.reiniciar) {
            datos.reiniciar = false;
            datos.gravedad = 0;
            datos.jugador_x = 70;
            datos.jugador_y = 200;
            datos.movimiento = 0;
            datos.desplazamientoEscenario = 0;
            datos.movimientoJugador = 0;

            //RESETEANDO LAS PLATAFORMAS

            var xhrPlataforma = new XMLHttpRequest();
            xhrPlataforma.open("GET", "views/js/json/nivel" + datos.nivel + "/plataforma.json", true);
            xhrPlataforma.send();

            xhrPlataforma.onreadystatechange = function () {
                if ((xhrPlataforma.readyState == 4) && (xhrPlataforma.status == 200)) {
                    datos.plataforma = JSON.parse(xhrPlataforma.responseText);
                }
            };
        }




        /* **************************
         * MOVIMIENTO HORIZONTAL JUGADOR
         ************************* */
        if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
            datos.jugador_x += datos.movimientoJugador;
        }

        /* **************************
         * MOVIMIENTO HORIZONTAL PLATAFORMAS
         ************************* */
        for (var i = 0; i < datos.plataforma.length; i++) {
            datos.plataforma[i].x = datos.plataforma[i].x + datos.movimiento;
        }



        /* **************************
         * MOVIMIENTO HORIZONTAL ESCENARIO
         ************************* */
        datos.desplazamientoEscenario += datos.movimiento;

        /* DESPLAZANDO EL ESCENARIO HACIA LA IZQUIERDA */
        if (datos.izquierda || datos.derecha) {
            if (datos.desplazamientoEscenario >= 0) {
                datos.movimiento = 0;   //EL ESCENARIO SE DETIENE
            } else if (datos.desplazamientoEscenario <= 0) {
                if (datos.jugador_x <= 70) {
                    datos.movimiento = datos.velocidad; //EL ESCENARIO SE DESPLAZA HACIA LA IZQUIERDA                    
                } else {
                    datos.movimiento = 0;   //EL ESCENARIO SE DETIENE
                    datos.movimientoJugador = -datos.velocidadJugador;  //EL JUGADOR COMIENZA A DESPLAZARSE HACIA LA IZQUIERDA
                }
            }

            if (datos.gravedad == 0) {    //Gravedad es 0 cuando el personaje está tocando el suelo
                datos.imgJugador.src = "views/img/jugador/run_left.png";
            }
            if (datos.salto && datos.gravedad == 0) {
                datos.imgJugador.src = "views/img/jugador/jump_left.png";
            }
        }

        if (!datos.derecha && !datos.izquierda) {
            datos.movimiento = 0;
        }

        /* DESPLAZANDO EL ESCENARIO HACIA LA DERECHA */
        if (datos.derecha) {
            if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
                datos.movimiento = 0;   //EL ESCENARIO SE DETIENE
                datos.movimientoJugador = datos.velocidadJugador;   //EL JUGADOR COMIENZA A DESPLAZARSE HACIA LA DERECHA
            } else {
                datos.movimiento = -datos.velocidad;    //EL ESCENARIO SE DESPLAZA HACIA LA DRECHA

            }

            if (datos.gravedad == 0) {    //Gravedad es 0 cuando el personaje está tocando el suelo
                datos.imgJugador.src = "views/img/jugador/run_right.png";
            }
            if (datos.salto && datos.gravedad == 0) {
                datos.imgJugador.src = "views/img/jugador/jump_right.png";
            }
        }


        /* **************************
         * DETENIENDO HORIZONTALMENTE EL MOVIMIENTO DEL ESCENARIO Y DEL JUGADOR
         ************************* */
        if (!datos.derecha && !datos.izquierda) { //LA TECLA DERECHA Y LA TECLA IZQUIERDA NO ESTÁN SIENDO PRESIONADAS
            datos.movimiento = 0;   //EL ESCENARIO SE DETIENE
            datos.movimientoJugador = 0;   //EL JUGADOR SE DETIENE
        }

        /* **************************
         * FUERZA DE GRAVEDAD
         ************************* */
        datos.jugador_y += datos.gravedad;

        if (datos.gravedad < datos.limiteGravedad) {
            datos.gravedad += datos.pesoPersonaje;
        }

        /* **************************
         * COLISIONES 
         ************************* */
        for (var i = 0; i < datos.plataforma.length; i++) {
            reaccionandoAColisiones(colisiones(i), i);
            //SALTO
            if (datos.salto && datos.gravedad === 0 && datos.jugador_y + datos.jugador_alto == datos.plataforma[i].y) {    //La variable salto nos indica que el jugador está presionando la tecla flecha hacia arriba y la variable gravedad == 0 nos indica que el personaje está tocando la superficie de alguna plataforma
                datos.gravedad = datos.alturaSalto;
            }
        }
        

        //DETECTANDO COLISIONES (SE DEBE EVALUAR SI EL PERSONAJE NO COLICIONA)
        function colisiones(i) {
            //No colisión vertical de arriba hacia abajo
            if ((datos.jugador_y + datos.jugador_alto) < datos.plataforma[i].y) {
                return false
            }    //No Colisiona 

            //No colisión verticar de abajo hacia arriba
            if (datos.jugador_y > (datos.plataforma[i].y + datos.plataforma[i].alto)) {
                return false
            }  //No Colisiona 

            //No colisión horizontal de izquierda a derecha
            if ((datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x) {
                return false
            }   //No Colisiona 

            //No colisión horizontal de derecha a izquierda
            if (datos.jugador_x > (datos.plataforma[i].x + datos.plataforma[i].ancho)) {
                return false
            } //No Colisiona 

            return true;  //Colisiona  
        }

        //REACCIONANDO A LAS COLICIONES
        function reaccionandoAColisiones(colision, i) {
            //COLICIONES VERTICALES
            //Colisión de arriba hacia abajo
            if (colision && (datos.jugador_y + datos.jugador_alto) < (datos.plataforma[i].y + datos.gravedad)) {
                datos.gravedad = 0;
                datos.jugador_y = datos.plataforma[i].y - datos.jugador_alto;
            }

            //Colisión de abajo hacia arriba
            if (colision && datos.jugador_y - datos.gravedad > (datos.plataforma[i].y + datos.plataforma[i].alto)) {
                datos.gravedad = 1;     //Genera el efecto rebote con la plataforma con la que colisionamos arriba con lo cual el personaje caerá rapidamente 
                datos.jugador_y = datos.plataforma[i].y + datos.plataforma[i].alto; //Posiciona al jugador debajo de la plataforma con la cual hemos chocado
            }

            //COLISIONES HORIZONTALES
            movimiento = (datos.desplazamientoEscenario <= datos.limiteEscenario) ? datos.movimientoJugador : -datos.movimiento;
            //Colisión de izquierda a derecha   (Recordemos que aquí el jugador no se mueve, sino que se está moviendo el escenario por ello ya no se utiliza la variable gravedad, sino que se utiliza la variable movimiento)
            if (colision && (datos.jugador_x + datos.jugador_ancho) < (datos.plataforma[i].x + movimiento)) {
                if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
                    datos.movimientoJugador = 0;
                } else {
                    datos.movimiento = 0;   //El escenario ya no se moverá                
                }
                datos.jugador_x = datos.plataforma[i].x - datos.jugador_ancho;  //Posiciona al personaje detras de la plataforma
            }

            //Colisión de derecha a izquierda
            if (colision && datos.jugador_x + -movimiento > (datos.plataforma[i].x + datos.plataforma[i].ancho)) {
                if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
                    datos.movimientoJugador = 0;
                } else {
                    datos.movimiento = 0;   //El escenario ya no se moverá                
                }
                datos.jugador_x = datos.plataforma[i].x + datos.plataforma[i].ancho;  //Posiciona al personaje detras de la plataforma
            }
        }
        /* **************************
         * COLISIONES CON TRAMPAS
         ************************* */
        for (var i = 0; i < datos.posicionTrampas.length; i++) {
            if (colisionesTrampas(i)) {
                datos.imgTrampas[i].src = "views/img/utileria/colisionesTrampas.png";
                datos.imgJugador.src = "views/img/jugador/colision_trampa.png";
            } else {
                datos.imgTrampas[i].src = "views/img/utileria/trampas.png";
            }
        }

        function colisionesTrampas(i) {
            //No colisión vertical de arriba hacia abajo
            if ((datos.jugador_y + datos.jugador_alto) < datos.posicionTrampas[i].y) {
                return false
            }    //No Colisiona 

            //No colisión verticar de abajo hacia arriba
            if (datos.jugador_y > (datos.posicionTrampas[i].y + datos.posicionTrampas[i].alto)) {
                return false
            }  //No Colisiona 

            //No colisión horizontal de izquierda a derecha
            if ((datos.jugador_x + datos.jugador_ancho) < (datos.posicionTrampas[i].x + datos.desplazamientoEscenario + datos.movTrampa)) {
                return false
            }   //No Colisiona 

            //No colisión horizontal de derecha a izquierda
            if (datos.jugador_x > (datos.posicionTrampas[i].x + datos.posicionTrampas[i].ancho + datos.desplazamientoEscenario + datos.movTrampa)) {
                return false
            } //No Colisiona 

            return true; //Colisión con trampa
        }

        /* **************************
         * COLISIONES CON ENEMIGOS
         ************************* */
        for (var i = 0; i < datos.posicionEnemigos.length; i++) {
            reaccionandoAColisionesConEnemigos(colisionesEnemigos(i), i);
        }

        function colisionesEnemigos(i) {
            //No colisión vertical de arriba hacia abajo
            if ((datos.jugador_y + datos.jugador_alto) < datos.posicionEnemigos[i].y) {
                return false
            }    //No Colisiona 

            //No colisión verticar de abajo hacia arriba
            if (datos.jugador_y > (datos.posicionEnemigos[i].y + datos.posicionEnemigos[i].alto)) {
                return false
            }  //No Colisiona 

            //No colisión horizontal de izquierda a derecha
            if ((datos.jugador_x + datos.jugador_ancho) < (datos.posicionEnemigos[i].x + datos.desplazamientoEscenario)) {
                return false
            }   //No Colisiona 

            //No colisión horizontal de derecha a izquierda
            if (datos.jugador_x > (datos.posicionEnemigos[i].x + datos.posicionEnemigos[i].ancho + datos.desplazamientoEscenario)) {
                return false
            } //No Colisiona 

            return true; //Colisión con enemigo
        }

        //REACCIONANDO A LAS COLICIONES
        function reaccionandoAColisionesConEnemigos(colision, i) {
            //COLICIONES VERTICALES
            //Colisión de arriba hacia abajo
            if (colision && (datos.jugador_y + datos.jugador_alto) < (datos.posicionEnemigos[i].y + datos.gravedad)) {
                datos.gravedad = 0;
                datos.jugador_y = datos.posicionEnemigos[i].y - datos.jugador_alto;
            }

            //Colisión de abajo hacia arriba
            if (colision && datos.jugador_y - datos.gravedad > (datos.posicionEnemigos[i].y + datos.posicionEnemigos[i].alto)) {
                datos.gravedad = 1;     //Genera el efecto rebote con la posicionEnemigos con la que colisionamos arriba con lo cual el personaje caerá rapidamente 
                datos.jugador_y = datos.posicionEnemigos[i].y + datos.posicionEnemigos[i].alto; //Posiciona al jugador debajo de la posicionEnemigos con la cual hemos chocado
            }

            //COLISIONES HORIZONTALES
            movimiento = (datos.desplazamientoEscenario <= datos.limiteEscenario) ? datos.movimientoJugador : -datos.movimiento;
            //Colisión de izquierda a derecha   (Recordemos que aquí el jugador no se mueve, sino que se está moviendo el escenario por ello ya no se utiliza la variable gravedad, sino que se utiliza la variable movimiento)
            if (colision && (datos.jugador_x + datos.jugador_ancho) < (datos.posicionEnemigos[i].x + movimiento + datos.desplazamientoEscenario)) {
                if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
                    datos.movimientoJugador = 0;
                } else {
                    datos.movimiento = 0;   //El escenario ya no se moverá                
                }
                datos.jugador_x = (datos.posicionEnemigos[i].x - datos.jugador_ancho) + datos.desplazamientoEscenario;  //Posiciona al personaje detras de la posicionEnemigos
            }

            //Colisión de derecha a izquierda
            if (colision && datos.jugador_x + -movimiento > (datos.posicionEnemigos[i].x + datos.posicionEnemigos[i].ancho + datos.desplazamientoEscenario)) {
                if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
                    datos.movimientoJugador = 0;
                } else {
                    datos.movimiento = 0;   //El escenario ya no se moverá                
                }
                datos.jugador_x = (datos.posicionEnemigos[i].x + datos.posicionEnemigos[i].ancho) + datos.desplazamientoEscenario;  //Posiciona al personaje detras de la posicionEnemigos
            }

            if (datos.salto && datos.gravedad === 0 && datos.jugador_y + datos.jugador_alto == datos.posicionEnemigos[i].y) {    //La variable salto nos indica que el jugador está presionando la tecla flecha hacia arriba y la variable gravedad == 0 nos indica que el personaje está tocando la superficie de alguna plataforma
                datos.gravedad = datos.alturaSalto;
            }
        }

        /* **************************
         * COLISIONES CON MONEDAS
         ************************* */
        for (var i = 0; i < datos.posicionMonedas.length; i++) {
            if (colisionMonedas(i)) {
                datos.imgMonedas[i].src = "views/img/utileria/colisionesMonedas.png";
                datos.posicionMonedas[i].y--;    //La explosión de la moneda sube

                var moneda = i;

                setTimeout(function () {   //Desaparece la moneda
                    datos.posicionMonedas[moneda].x = -500;
                    datos.posicionMonedas[moneda].y = -500;
                }, 500);
            }
        }

        //DETECTANDO SI EL PERSONAJE COLISIONA CON ALGUNA MONEDA
        function colisionMonedas(i) {
            //No colisión vertical de arriba hacia abajo
            if ((datos.jugador_y + datos.jugador_alto) < datos.posicionMonedas[i].y) {
                return false
            }    //No Colisiona 

            //No colisión verticar de abajo hacia arriba
            if (datos.jugador_y > (datos.posicionMonedas[i].y + datos.posicionMonedas[i].alto)) {
                return false
            }  //No Colisiona 

            //No colisión horizontal de izquierda a derecha
            if ((datos.jugador_x + datos.jugador_ancho) < (datos.posicionMonedas[i].x + datos.desplazamientoEscenario)) {
                return false
            }   //No Colisiona 

            //No colisión horizontal de derecha a izquierda
            if (datos.jugador_x > (datos.posicionMonedas[i].x + datos.posicionMonedas[i].ancho + datos.desplazamientoEscenario)) {
                return false
            } //No Colisiona 

            return true; //Colisión con monedas
        }


        /* **************************
         * DISPARO DE BALAS ENEMIGAS
         ************************* */
        datos.posicionBalasEnemigos.forEach(function (elem, index) {
            if (
                (
                    datos.posicionEnemigos[index].x > datos.jugador_x - datos.desplazamientoEscenario &&
                    datos.posicionEnemigos[index].x < -datos.desplazamientoEscenario + 1000
                ) || (elem.x < datos.posicionEnemigos[index].x)
            ) {
                elem.x -= datos.velocidadBalasEnemigos;                
            }
            if (elem.x <= -datos.desplazamientoEscenario) {
                elem.x = datos.posicionEnemigos[index].x;
            }
        })

        /* **************************
         * COLISION BALAS ENEMIGOS
         ************************* */
        datos.posicionBalasEnemigos.forEach(function(elem, index){
            if(colisionesBalas(index)){
                datos.imgBalasEnemigos[index].src = "views/img/utileria/colisionesBalasEnemigos.png";
                datos.imgJugador.src = "views/img/jugador/colision_trampa.png";
                setTimeout(function(){
                    datos.imgBalasEnemigos[index].src = "views/img/utileria/balasEnemigos.png";
                    datos.imgJugador.src = "views/img/jugador/stop_right.png";
                }, 100)
                
            }
        })

        function colisionesBalas(i) {
            //No colisión vertical de arriba hacia abajo
            if ((datos.jugador_y + datos.jugador_alto) < datos.posicionBalasEnemigos[i].y) {
                return false
            }    //No Colisiona 

            //No colisión verticar de abajo hacia arriba
            if (datos.jugador_y > (datos.posicionBalasEnemigos[i].y + datos.posicionBalasEnemigos[i].alto)) {
                return false
            }  //No Colisiona 

            //No colisión horizontal de derecha a izquierda
            if (datos.jugador_x > (datos.posicionBalasEnemigos[i].x + datos.posicionBalasEnemigos[i].ancho + datos.desplazamientoEscenario)) {
                return false
            } //No Colisiona
            
            //No colisión horizontal de izquierda a derecha
            if ((datos.jugador_x + datos.jugador_ancho) < (datos.posicionBalasEnemigos[i].x + datos.desplazamientoEscenario)) {
                return false
            }   //No Colisiona 

            return true; //Colisión con bala
        }

        /* **************************
         * DISPAROS DEL JUGADOR
         ************************* */
            datos.disparo_x.forEach(function(elem, i){
                datos.disparo_x[i] += (datos.direccionDisparo[i] == "der" ? datos.velocidadDisparoJugador : -datos.velocidadDisparoJugador);
            
                if(datos.disparo_x[i] <= datos.desplazamientoEscenario || datos.disparo_x[i] > 1000 ){
                    datos.disparo_x.splice(i,1);
                    datos.disparo_y.splice(i,1);
                    datos.direccionDisparo.splice(i,1);
                    //datos.disparando = false;              
                }
            })                        
         
        /* **************************
         * COLISION BALA JUGADOR CON BALA ENEMIGO
         ************************* */    
        datos.disparo_x.forEach(function(elem1, i){
            datos.posicionBalasEnemigos.forEach(function(elem2,x){
                if(colisionBalas(i, x)){
                    datos.imgDisparoJugador[i].src = "views/img/utileria/colisionesBalas.png";
                    datos.posicionBalasEnemigos[x].x = datos.posicionEnemigos[x].x;
                    datos.disparo_alto[i] = 50;
                    datos.disparo_ancho[i] = 50;
                    datos.disparo_y[i] -= 25;
                    
                    setTimeout(function(i){
                        datos.disparo_x.splice(i, 1);
                        datos.disparo_y.splice(i, 1);
                        datos.direccionDisparo.splice(i, 1);
                        datos.imgDisparoJugador.splice(i, 1); 
                        datos.disparo_alto.splice(i, 1);
                        datos.disparo_ancho.splice(i, 1);
                    },200)
                    
                }
            });
        });
        
        function colisionBalas(idBalaJugador, idBalaEnemigo){
            //No colisiona de arriba hacia abajo
            if((datos.disparo_y[idBalaJugador] + datos.disparo_alto[idBalaJugador]) < datos.posicionBalasEnemigos[idBalaEnemigo].y){return false;};

            //No colisiona de abajo hacia arriba
            if(datos.disparo_y[idBalaJugador] > (datos.posicionBalasEnemigos[idBalaEnemigo].y +datos.posicionBalasEnemigos[idBalaEnemigo].alto)){return false;};

            //No colisiona de izquierda a derecha
            if((datos.disparo_x[idBalaJugador] + datos.disparo_ancho[idBalaJugador] ) < (datos.posicionBalasEnemigos[idBalaEnemigo].x + datos.desplazamientoEscenario)){return false;};

            //No colisiona de derecha a izquierda
            if(datos.disparo_x[idBalaJugador]  > (datos.posicionBalasEnemigos[idBalaEnemigo].x + datos.posicionBalasEnemigos[idBalaEnemigo].ancho + datos.desplazamientoEscenario)){return false;};

            return true; //Colision entre balas
        }
        /* **************************
         * EJECUTANDO LÍNEA DE TIEMPO
         ************************* */
        animacion = frame(juego.tiempo);


        /* **************************
         * FINAL NIVEL
         ************************* */
        if (datos.jugador_x >= (1000 - datos.jugador_ancho)) {
            cancelAnimationFrame(animacion);

            var xhr = new XMLHttpRequest();
            var completado = "true";
            var puntaje = "200";
            var nivel = datos.nivel;
            var idUsuario = datos.id;
            var url = "views/ajax/usuarios.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("completado=" + completado + "&puntaje=" + puntaje + "&nivel=" + nivel + "&id=" + idUsuario);

            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    window.location = "inicio";
                }
            };


        }
    }
};