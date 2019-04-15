/* **************************
 * MÉTODOS DEL OBJETO JUEGO
 ************************* */

var juego = {

    volumen: function(event){
        var volumen = eval(event.getAttribute("volumen"));
        var botonesSonido = document.getElementsByClassName("volumen");
        
        for(var i=0; i< sonidos.listaSonidos.length;i++){
            sonidos.listaSonidos[i].volume = volumen;
        }
        document.getElementById("lblVolumen").style.textDecoration = volumen == 0 ? "line-through" : "none";
        botonesSonido[0].style.opacity = volumen < 0.3 ? .5 : 1;
        botonesSonido[1].style.opacity = volumen < 0.6 ? .5 : 1;
        botonesSonido[2].style.opacity = volumen < 1 ? .5 : 1;

    },

    teclado: function () {
        /* **************************
         * EVENTOS DEL TECLADO
         ************************* */
        document.addEventListener("keydown", juego.oprimir);
        document.addEventListener("keyup", juego.soltar);

    },



    /* **************************
    * MANEJADOR DE EVENTOS DE CONTROLES TOUCH
    ************************* */
    controlesTouch:  function(){
        document.getElementById("btnIzquierda").addEventListener("touchstart", function(e){
            e.preventDefault();
            datos.izquierda = true
            datos.direccionJugador = "izq";
        });

        document.getElementById("btnIzquierda").addEventListener("touchend", function(e){
            e.preventDefault();
            datos.izquierda = false;
            datos.imgJugador.src = datos.imgStopLeft.src
        });

        document.getElementById("btnDerecha").addEventListener("touchstart", function(e){
            e.preventDefault();
            datos.derecha = true;
            datos.direccionJugador = "der";
        });

        document.getElementById("btnDerecha").addEventListener("touchend", function(e){
            e.preventDefault();
            datos.derecha = false;
            datos.imgJugador.src = datos.imgStopRight.src;
        });

        document.getElementById("btnSalto").addEventListener("touchstart", function(e){
            e.preventDefault();
            datos.salto = true
            sonidos.sSaltoJugador.play();
        });

        document.getElementById("btnSalto").addEventListener("touchend", function(e){
            e.preventDefault();
            datos.salto = false;            
        });

        document.getElementById("btnDisparo").addEventListener("touchstart", function(e){
            e.preventDefault();
            datos.imgDisparoJugador[datos.imgDisparoJugador.length] = new Image();
            datos.imgDisparoJugador[datos.imgDisparoJugador.length-1].src = datos.imgBalasJugador.src;                             
            datos.disparo_x[datos.disparo_x.length] = datos.jugador_x + datos.jugador_ancho / 2;
            datos.disparo_y[datos.disparo_y.length] = datos.jugador_y + datos.jugador_alto/2;
            datos.disparo_ancho[datos.disparo_ancho.length] = 15;
            datos.disparo_alto[datos.disparo_alto.length] = 15;
            datos.direccionDisparo[datos.direccionDisparo.length] = datos.direccionJugador;
            datos.disparoActivado = false;
            sonidos.sDisparoJugador.play();
        });

        document.getElementById("btnDisparo").addEventListener("touchend", function(e){
            e.preventDefault();            
            datos.disparoActivado = true;

        });

    },

    oprimir: function (tecla) {
        /* **************************
         * OPRIMIR TECLADO
         ************************* */
        tecla.preventDefault();
        if (tecla.keyCode === 37 && !datos.gameOver) { //Flecha izquierda
            datos.izquierda = true
            datos.direccionJugador = "izq";
        }; 
        
        if (tecla.keyCode === 39 && !datos.gameOver) { //Flecha derecha
            datos.derecha = true;
            datos.direccionJugador = "der";
        };   
        if (tecla.keyCode === 38 && !datos.gameOver) {
            datos.salto = true
            sonidos.sSaltoJugador.play();                                                
        };  //Flecha hacia arriba
        
        if (tecla.keyCode === 32 && !datos.gameOver) { //Barra espaciadorda
            if(datos.disparoActivado){
                //datos.disparando = true;   
                datos.imgDisparoJugador[datos.imgDisparoJugador.length] = new Image();
                datos.imgDisparoJugador[datos.imgDisparoJugador.length-1].src = datos.imgBalasJugador.src;                             
                datos.disparo_x[datos.disparo_x.length] = datos.jugador_x + datos.jugador_ancho / 2;
                datos.disparo_y[datos.disparo_y.length] = datos.jugador_y + datos.jugador_alto/2;
                datos.disparo_ancho[datos.disparo_ancho.length] = 15;
                datos.disparo_alto[datos.disparo_alto.length] = 15;
                datos.direccionDisparo[datos.direccionDisparo.length] = datos.direccionJugador;
                datos.disparoActivado = false;
                sonidos.sDisparoJugador.play();
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
            datos.imgJugador.src = datos.imgStopLeft.src;
        }
        ;  //Flecha izquierda
        if (tecla.keyCode === 39) {
            datos.derecha = false;
            datos.imgJugador.src = datos.imgStopRight.src;
        }
        ;   //Flecha derecha
        if (tecla.keyCode === 38) {
            datos.salto = false;
            datos.imgJugador.src = datos.imgStopRight.src;
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
        


        if(datos.nivel == "1" || datos.nivel == 1){
            sonidos.sBackground01.play();
            sonidos.sBackground01.loop = true;
        }
        if(datos.nivel == "2" || datos.nivel == 2){
            sonidos.sBackground02.play();
            sonidos.sBackground02.loop = true;
        }
        if(datos.nivel == "3" || datos.nivel == 3){
            sonidos.sBackground03.play();
            sonidos.sBackground03.loop = true;
        }
        
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

        
        juego.reiniciarPantalla();

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
                datos.imgJugador.src = datos.imgRunLefth.src;
            }
            if (datos.salto && datos.gravedad == 0) {
                datos.imgJugador.src = datos.imgJumpLeft.src;
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
                datos.imgJugador.src = datos.imgRunRight.src;
            }
            if (datos.salto && datos.gravedad == 0) {
                datos.imgJugador.src = datos.imgJumpRight.src;
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
                sonidos.sColisionTrampasEnemigos.play();
                sonidos.sEnergia.play();
                datos.imgTrampas[i].src = datos.imgColisionesTrampas.src;
                datos.imgJugador.src = datos.imgColisionTrampa.src;
                datos.energia -= datos.energiaTrampa;
                datos.penalizacionEnergia += datos.energiaTrampa;
            } else {
                datos.imgTrampas[i].src = datos.img_trampas.src;
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
                sonidos.sMonedas.play();
                datos.imgMonedas[i].src = datos.imgColisionesMonedas.src;
                datos.posicionMonedas[i].y--;    //La explosión de la moneda sube
                
                if(!datos.monedasColisionadas.includes(i)){
                    datos.contadorMonedas+=10;
                    datos.contadorMonedasNivel+=10;
                    document.getElementById("contadorMonedas").innerHTML = datos.contadorMonedas;
                    datos.monedasColisionadas[datos.monedasColisionadas.length] = i;
                }
                

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
                sonidos.sColisionBalasEnemigo.play();
                sonidos.sEnergia.play();
                datos.imgBalasEnemigos[index].src = datos.imgColisionesBalasEnemigos.src;
                datos.imgJugador.src = datos.imgColisionTrampa.src;
                datos.energia -= datos.energiaBalas;   
                datos.penalizacionEnergia += datos.energiaBalas;         
                setTimeout(function(){
                    datos.imgBalasEnemigos[index].src = datos.imgDisparoEnemigos.src;
                    datos.imgJugador.src = datos.imgStopRight.src;
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
                    sonidos.sColisionBalasEnemigo.play();
                    datos.imgDisparoJugador[i].src = datos.imgColisionesBalas.src;
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
         * ACTUALIZANDO LA BARRA DE ENERGÍA
         ************************* */
        if(datos.energia < 0){datos.energia = 0;};
        document.getElementById("barraEnergia").value = datos.energia;
        document.getElementById("porcentajeEnergia").innerHTML = Math.round(datos.energia) + "%";

        /* **************************
         * ACTUALIZANDO VIDAS
         ************************* */
        if(datos.energia <=0){
            datos.reiniciar = true;
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

            document.getElementById("final").style.display = "block";
            sonidos.sGanar.play();
            if(datos.nivel == 1 || datos.nivel == "1"){sonidos.sBackground01.pause();};
            if(datos.nivel == 2 || datos.nivel == "2"){sonidos.sBackground02.pause();};
            if(datos.nivel == 3 || datos.nivel == "3"){sonidos.sBackground03.pause();};

            datos.incrementoPuntaje = datos.puntajeTotal
            datos.puntajeNivel = Math.round(datos.contadorMonedasNivel - datos.penalizacionEnergia - datos.penalizacionVidas);
            //datos.puntajeTotal += datos.puntajeNivel;

            document.getElementById("spnMonedasRecogidas").innerHTML = datos.contadorMonedasNivel;
            document.getElementById("energiaFinal").value = datos.energia;
            document.getElementById("spnTotalEnergia").innerHTML = Math.round(datos.energia) + " %";
            document.getElementById("puntosEnergia").innerHTML = "-" + Math.round(datos.penalizacionEnergia) + " pts";
            
            if(datos.vida < 3){
                document.getElementById("imgVidaFinal3").src = datos.imgVidaMenos.src;
            }   
            if(datos.vida < 2){
                document.getElementById("imgVidaFinal2").src = datos.imgVidaMenos.src;
            }

            document.getElementById("spnPtsVida").innerHTML = "-" + datos.penalizacionVidas + " pts";
            
            
            var intervalo = setInterval(function(){
                if(datos.incrementoPuntaje >= (datos.puntajeTotal + datos.puntajeNivel) ){
                    datos.puntajeTotal += datos.incrementoPuntaje;
                    document.getElementById("puntajeNivel").innerHTML = "Pts: " + datos.puntajeNivel + " - Total: " + datos.puntajeTotal + " pts.";
                    sonidos.sPuntos.play();
                    sonidos.sMonedero.pause();
                    clearInterval(intervalo);
                    sonidos.sResumenPuntaje.play();

                    setTimeout(function(){
                        juego.finalizaNivel();    
                    },5000)
                    

                }else{
                    datos.incrementoPuntaje++;
                    sonidos.sMonedero.play();
                    document.getElementById("puntajeNivel").innerHTML = "Pts: " + datos.puntajeNivel + " - Total: " + datos.incrementoPuntaje + " pts";
                }
            },16)

        }
        
    },

    salir: function(){
        window.location.reload();
    },

    finalizaNivel: function(){
        var xhr = new XMLHttpRequest();
        var completado = "true";
        var puntaje = datos.puntajeTotal;
        var nivel = datos.puntajeNivel;
        var idUsuario = datos.id;
        var url = "views/ajax/usuarios.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("completado=" + completado + "&puntaje=" + puntaje + "&nivel=" + nivel + "&id=" + idUsuario);

        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {  
                setTimeout(function(){
                    juego.resetearDatos();                  
                    juego.detenerMusicaDeFondo();
                    

                    if(datos.nivel < 3){
                        inicio.siguienteNivel();
                    }else{
                        window.location = "inicio";
                    }
                }, 5000)
                
            }
        };
    },

       
    
    reiniciarPantalla: async function(){
        try{

            /* **************************
            * REINICIAR PANTALLA
            ************************* */
            if (datos.jugador_y > 500) {
                datos.reiniciar = true
            }
            if (datos.reiniciar) {
                //document.getElementById("vida"+datos.vida).style.display = "none";
                document.getElementById("imgVida"+datos.vida).src = datos.imgVidaMenos.src;
                if(datos.vida == 1 ){
                    //JUEGO TERMINADO NO QUEDAN VIDAS
                    juegoTerminado();

                }else{ 
                    //cancelAnimationFrame(animacion);
                    //await juego.resetearPlataformas();                    
                    datos.energia = 100;
                    sonidos.sPerderVida.play();
                    juego.resetearDatos();
                    document.getElementById("contadorMonedas").innerHTML = datos.contadorMonedas;
                    datos.vida--;        
                    datos.penalizacionVidas += 10;
                    datos.reiniciar = false;
                }
            }

        }catch(e){
            alert(e);
        }

        /* **************************
         * GAME OVER
         ************************* */
        function juegoTerminado(){
            cancelAnimationFrame(animacion);
            document.getElementById("gameOver").style.display = "block";
            datos.gameOver = true;
            sonidos.sPerder.play();
            juego.detenerMusicaDeFondo();
                 
            sonidos.sColisionBalasEnemigo.pause();
            sonidos.sColisionTrampasEnemigos.pause();
            
            silenciarMusica();

            setTimeout(function(){
                window.location.reload();
            },10000)
        }


        function silenciarMusica(){
            for(var i=0; i < sonidos.length; i++){
                if(sonidos[i] != sonidos.listaSonidos){
                    sonidos[i].muted();
                }
            }
            
                
            
        }
    },

    /*
    resetearPlataformas: function(){
        const promise = new Promise(function(resolve, reject){

            try{

                //RESETEANDO LAS PLATAFORMAS

                var xhrPlataforma = new XMLHttpRequest();
                xhrPlataforma.open("GET", "views/js/json/nivel" + datos.nivel + "/plataforma.json", true);
                xhrPlataforma.send();

                xhrPlataforma.onreadystatechange = function () {
                    if ((xhrPlataforma.readyState == 4) && (xhrPlataforma.status == 200)) {
                        datos.plataforma = JSON.parse(xhrPlataforma.responseText);
                        resolve(datos.plataforma);
                    }
                };

                
            }catch(e){
                reject(e);
            }
            return promise;
        });
    },
    */

    resetearDatos: function(){
        datos.gravedad = 0;
        datos.jugador_x = 70;
        datos.jugador_y = 200;
        datos.movimiento = 0;
        datos.desplazamientoEscenario = 0;
        datos.movimientoJugador = 0;
        datos.penalizacionEnergia = 0;  
        datos.plataforma = JSON.parse(JSON.stringify(datos.plataformaOrigen));        
    },


    detenerMusicaDeFondo: function(){
        if(datos.nivel == "1" || datos.nivel == 1){sonidos.sBackground01.pause();}
        if(datos.nivel == "2" || datos.nivel == 2){sonidos.sBackground02.pause();}
        if(datos.nivel == "3" || datos.nivel == 3){sonidos.sBackground03.pause();}
        sonidos.sResumenPuntaje.pause();                
    }
    

};