/* ***************************************
 * OBJETOS
 ************************************** */
var inicio = {
    loginForm: function(){
        var identificador = document.getElementById("email").value;
        var nombre = document.getElementById("nombre").value;
        var foto = "views/img/intro/anonymous.png";

        if(identificador != "" && nombre != "" ){
            inicio.login(identificador, nombre, foto);
        }
        
    },

    ocultarMsgTouch: function(){
        var obj = document.getElementById("loginTouch");
        obj.parentNode.removeChild(obj);
    },

    iniciar: function(){
        
        var identificador = "mabc@live.cl";
        var nombre = "Marcelo Bravo";
        var foto = "views/img/intro/pedro.png";
        inicio.login(identificador, nombre, foto);
        
    },

    login: function(identificador, nombre, foto){
        //utilizando ajax nativo de javascript
        var xhr = new XMLHttpRequest();
        var url = "views/ajax/usuarios.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("identificador=" + identificador + "&nombre=" + nombre + "&foto=" + foto);

        xhr.onreadystatechange = function () {
            if ((xhr.readyState == 4) && (xhr.status == 200)) {
                if (xhr.responseText == "ok") {
                    window.location = "inicio";
                }else{
                    alert(xhr.responseText);
                }
            }
        }
    },


    /* **********************
     * INICIAR CON FACEBOOK
     ********************* */
    iniciarFacebook: function () {        

        FB.login( function(response){validarUsuario();}, {scope: 'public_profile, email'} );


        function validarUsuario(){
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        };


        function statusChangeCallback(response){
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                testAPI();
            } else {
                // The person is not logged into your app or we are unable to tell.
                document.getElementById('ingresoFacebook').innerHTML = '<div style="color: white; text-align:center"> ¡Vuelve a intentarlo!</div>';
            }
        }


        function testAPI(){
            FB.api('/me?fields=id, name, first_name, last_name, email, picture', function(response) {
                var xhr = new XMLHttpRequest();        
                var identificador = response.email;
                var nombre = response.name;
                var foto = "http://graph.facebook.com/"+response.id+"/picture?type=large";
                var url = "views/ajax/usuarios.php";
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("identificador=" + identificador + "&nombre=" + nombre + "&foto=" + foto);

                xhr.onreadystatechange = function () {
                    if ((xhr.readyState == 4) && (xhr.status == 200)) {
                        //console.log(xhr.responseText);
                        if (xhr.responseText == "ok") {
                            window.location = "inicio";
                        }else{
                            alert(xhr.responseText);
                        }
                    }
                }
              });
        }
    },

    /* **********************
     * CERRAR SESSION CON FACEBOOK (Habilitar el botón de cesrrar sesion en incio.php)
     ********************* */
    cesrrarSesionFacebook: function(){
        FB.getLoginStatus(function(response){
            if(response.status === "connected"){
                FB.logout(function(response){
                    setTimeout(function(){
                        window.location = "salir";
                    }, 500);
                    
                });
            }else{

            }
        });
    },

    /* **********************
     * COMPARTIR EN FACEBOOK 
     ********************* */
    compartirFacebook: function(e){
        var jugador = e.getAttribute('nombreJugador');
        FB.ui({
            method: 'share',
            display: 'popup',
            quote: '¡'+jugador+' ha ganado '+datos.sResumenPuntaje+' pts en el nivel '+datos.nivel+' en el juego Black Nija.',
            link: 'http://mabc.byethost9.com/blackninja'
          }, function(response){});
    },

    /* **********************
     * ELEGIR NIVEL
     ********************* */
    elegirNivel: function (e) {
        datos.nivel = e.getAttribute("nivel");
        datos.id = e.getAttribute("id");
        
        
        inicio.inicioDeNiveles(datos.nivel);
    },

    /* *********************************
     * INICIO DE NIVELES
     ********************************* */
    
    
    inicioDeNiveles: function (nivel) {        
        document.getElementById("inicio").parentNode.removeChild(document.getElementById("inicio"));
        datos.nivel = nivel; 
        
        if(window.matchMedia("(max-width: 1024px)").matches){
            screen.fullScreen();
        }
        
        inicio.preparaNiveles();
    },

    siguienteNivel: function(){
        datos.nivel++;     
                
        if(window.matchMedia("(max-width: 1024px)").matches){
            screen.fullScreen();
        }

        inicio.preparaNiveles();
    },

    preparaNiveles: function(){
        /* *********************************
        * PRECARGA DE IMÁGENES
        ********************************* */
       datos.imgColisionTrampa =  new Image();
       datos.imgJumpLeft =  new Image();
       datos.imgJumpRight = new Image();
       datos.imgRunLefth = new Image();
       datos.imgRunRight = new Image();
       datos.imgStopLeft = new Image();
       datos.imgStopRight = new Image();
       datos.imgColisionesBalas = new Image();
       datos.imgColisionesBalasEnemigos = new Image();
       datos.imgColisionesMonedas = new Image();
       datos.imgColisionesTrampas = new Image();
       datos.img_monedas = new Image();
       datos.img_trampas = new Image();
       datos.imgBalasJugador = new Image();
       datos.imgDisparoEnemigos = new Image();
       datos.imgVidaMenos = new Image();

       datos.imgColisionTrampa.src = "views/img/jugador/colision_trampa.png";
       datos.imgJumpLeft.src = "views/img/jugador/jump_left.png";
       datos.imgJumpRight.src = "views/img/jugador/jump_right.png";
       datos.imgRunLefth.src = "views/img/jugador/run_left.png";
       datos.imgRunRight.src = "views/img/jugador/run_right.png";
       datos.imgStopLeft.src = "views/img/jugador/stop_left.png";
       datos.imgStopRight.src = "views/img/jugador/stop_right.png";
       datos.imgColisionesBalas.src = "views/img/utileria/colisionesBalas.png";
       datos.imgColisionesBalasEnemigos.src = "views/img/utileria/colisionesBalasEnemigos.png";
       datos.imgColisionesMonedas.src = "views/img/utileria/colisionesMonedas.png";
       datos.imgColisionesTrampas.src = "views/img/utileria/colisionesTrampas.png";
       datos.img_monedas.src = "views/img/utileria/monedas.png";
       datos.img_trampas.src = "views/img/utileria/trampas.png";
       datos.imgBalasJugador.src = "views/img/utileria/balasJugador.png";
       datos.imgDisparoEnemigos.src = "views/img/utileria/balasEnemigos.png";
       datos.imgVidaMenos.src = "views/img/jugador/vida_menos.png";

       /* **********************
        * PRECARGA DE SONIDOS
        ********************* */
       sonidos.sBackground01 = document.getElementById("sBackground01");
       sonidos.sBackground02 = document.getElementById("sBackground02");
       sonidos.sBackground03 = document.getElementById("sBackground03");
       sonidos.sColisionBalasEnemigo = document.getElementById("sColisionBalasEnemigo");
       sonidos.sColisionTrampasEnemigos = document.getElementById("sColisionTrampasEnemigos");
       sonidos.sDisparoEnemigo = document.getElementById("sDisparoEnemigo");
       sonidos.sDisparoJugador = document.getElementById("sDisparoJugador");
       sonidos.sEnergia = document.getElementById("sEnergia");
       sonidos.sGanar = document.getElementById("sGanar");
       sonidos.sMonedas = document.getElementById("sMonedas");
       sonidos.sMonedero = document.getElementById("sMonedero");
       sonidos.sPerder = document.getElementById("sPerder");
       sonidos.sPerderVida = document.getElementById("sPerderVida");
       sonidos.sPuntos = document.getElementById("sPuntos");
       sonidos.sSaltoJugador = document.getElementById("sSaltoJugador");
       sonidos.sResumenPuntaje = document.getElementById("sResumenPuntaje");

       sonidos.listaSonidos = document.getElementsByClassName("sonidos");

       for(var i=sonidos.listaSonidos.length-1; i>=0 ; i--){
           
           sonidos.listaSonidos[i].play();
           sonidos.listaSonidos[i].pause();
           sonidos.listaSonidos[i].muted = false;

           
       }


        canvas = document.getElementById("lienzo");
        ctx = canvas.getContext("2d");

        document.getElementById("carga").style.display = "block";
        /* *********************************
         * PLANO 3
         ********************************* */
        datos.plano3 = new Image();
        datos.plano3.src = "views/img/nivel" + datos.nivel + "/plano3.png";
        /*
         * plano3.onload fue definido en ésta sección con el fín de maquetar el escenario, pero una vés 
         * dibujado el escenario, el código del plano se comenta y es trasladado al archivo lienzo.js
         * sin la declaración de function()
         * 
        datos.plano3.onload = function () {
            //ctx.drawImage(imagen, x , y, ancho, alto)
            ctx.drawImage(datos.plano3, 0 ,0, datos.plano3.naturalWidth, datos.plano3.naturalHeight);
            ctx.drawImage(datos.plano3, 1000 ,0, datos.plano3.naturalWidth, datos.plano3.naturalHeight);
            ctx.drawImage(datos.plano3, 2000 ,0, datos.plano3.naturalWidth, datos.plano3.naturalHeight);
        };
        */
        /* *********************************
         * PLANO 2
         ********************************* */
        datos.plano2 = new Image();
        datos.plano2.src = "views/img/nivel" + datos.nivel + "/plano2.png";
        /*
         * plano2.onload fue definido en ésta sección con el fín de maquetar el escenario, pero una vés 
         * dibujado el escenario, el código del plano se comenta y es trasladado al archivo lienzo.js
         * sin la declaración de function()
         * 
        datos.plano2.onload = function () {
            ctx.drawImage(datos.plano2, 0 ,0, datos.plano2.naturalWidth, datos.plano2.naturalHeight);
            ctx.drawImage(datos.plano2, 1000 ,0, datos.plano2.naturalWidth, datos.plano2.naturalHeight);
            ctx.drawImage(datos.plano2, 2000 ,0, datos.plano2.naturalWidth, datos.plano2.naturalHeight);
        };
        */
        /* *********************************
         * PLANO 1
         ********************************* */
        datos.plano1 = new Image();
        datos.plano1.src = "views/img/nivel" + datos.nivel + "/plano1.png";
        /*
         * plano1.onload fue definido en ésta sección con el fín de maquetar el escenario, pero una vés 
         * dibujado el escenario, el código del plano se comenta y es trasladado al archivo lienzo.js
         * sin la declaración de function()
         *
        datos.plano1.onload = function () {
            ctx.drawImage(datos.plano1, 0 ,0, datos.plano1.naturalWidth, datos.plano1.naturalHeight);
            ctx.drawImage(datos.plano1, 1000 ,0, datos.plano1.naturalWidth, datos.plano1.naturalHeight);
            ctx.drawImage(datos.plano1, 2000 ,0, datos.plano1.naturalWidth, datos.plano1.naturalHeight);
        };
        */
        


        /* *********************************
         * BLOQUES
         ********************************* */
        datos.texturaPlataforma = new Image();
        datos.texturaPlataforma.src = "views/img/nivel" + datos.nivel + "/texturaPlataforma.jpg";
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "views/js/json/nivel"+datos.nivel+"/bloques.json", true);
        xhr.send();
        datos.bloques = [];
        
        xhr.onreadystatechange = function(){
           if((xhr.readyState == 4) && (xhr.status == 200)){
               datos.bloques = JSON.parse(xhr.responseText);
           }
        };
        
        
        /* *********************************
         * PLANO 0
         ********************************* */
        datos.plano0 = new Image();
        datos.plano0.src = "views/img/nivel" + datos.nivel + "/plano0.png";
        /*
         * plano0.onload fue definido en ésta sección con el fín de maquetar el escenario, pero una vés 
         * dibujado el escenario, el código del plano se comenta y es trasladado al archivo lienzo.js
         * sin la declaración de function()
         *
        datos.plano0.onload = function () {
            ctx.drawImage(datos.plano0, 0 ,0, datos.plano0.naturalWidth, datos.plano0.naturalHeight);
            ctx.drawImage(datos.plano0, 1000 ,0, datos.plano0.naturalWidth, datos.plano0.naturalHeight);
            ctx.drawImage(datos.plano0, 2000 ,0, datos.plano0.naturalWidth, datos.plano0.naturalHeight);
        };        
        */

        /*
         * datos.texturaPlataforma.onload fue definida en ésta sección con el fín de maquetar el escenario, pero una vés 
         * dibujado el escenario, el código de los bloques se comenta y es trasladado al archivo lienzo.js
         * sin la declaración de function()
         *
        datos.texturaPlataforma.onload = function(){
            for(var i=0; i<datos.bloques.length; i++){
                ctx.drawImage(
                        datos.texturaPlataforma, 
                        datos.bloques[i].x, 
                        datos.bloques[i].y, 
                        datos.bloques[i].ancho, 
                        datos.bloques[i].alto);
            }
        }
        */
       
        /* *********************************
         * DETALLES
         ********************************* */
        datos.detalles = new Image();
        datos.detalles.src = "views/img/nivel"+datos.nivel+"/detalles.png";
        
        
        /* *********************************
         * BLOQUES DETALLES
         ********************************* */
        var xhrPosDetalles = new XMLHttpRequest();
        xhrPosDetalles.open("GET", "views/js/json/nivel"+datos.nivel+"/posicionDetalles.json", true);
        xhrPosDetalles.send();
        datos.posDetalles = [];
        
        xhrPosDetalles.onreadystatechange = function(){
           if((xhrPosDetalles.readyState == 4) && (xhrPosDetalles.status == 200)){
               datos.posDetalles = JSON.parse(xhrPosDetalles.responseText);
           }
        };
        
        /*
         * detalles.onload fue definido en ésta sección con el fín de maquetar el escenario, pero una vés 
         * dibujado el escenario, el código de los detalles se comenta y es trasladado al archivo lienzo.js
         * sin la declaración de function()
         *
        datos.detalles.onload = function(){
            for(var i=0; i<datos.posDetalles.length; i++){
                
                ctx.drawImage(
                        datos.detalles, 
                        datos.posDetalles[i].x, 
                        datos.posDetalles[i].y, 
                        datos.posDetalles[i].ancho, 
                        datos.posDetalles[i].alto);
            }
        }
        */
        
        
        /* *********************************
         * PLATAFORMA
         ********************************* */
        /* *********************************
         * BLOQUES DETALLES
         ********************************* */
        var xhrPlataforma = new XMLHttpRequest();
        xhrPlataforma.open("GET", "views/js/json/nivel"+datos.nivel+"/plataforma.json", true);
        xhrPlataforma.send();
        datos.plataforma = [];
        
        xhrPlataforma.onreadystatechange = function(){
           if((xhrPlataforma.readyState == 4) && (xhrPlataforma.status == 200)){
               datos.plataforma = JSON.parse(xhrPlataforma.responseText);
           }
        };
        
        
        /* *********************************
         * MONEDAS
         ********************************* */
        var xhrPosMonedas = new XMLHttpRequest();
        xhrPosMonedas.open("GET", "views/js/json/nivel"+datos.nivel+"/posicion_monedas.json", true);
        xhrPosMonedas.send();
        datos.posicionMonedas = [];
        datos.imgMonedas = [];
        xhrPosMonedas.onreadystatechange = function(){
           if((xhrPosMonedas.readyState == 4) && (xhrPosMonedas.status == 200)){
               datos.posicionMonedas = JSON.parse(xhrPosMonedas.responseText);
               
               for(var i=0; i<datos.posicionMonedas.length; i++){
                   datos.imgMonedas[i] = new Image();
                   datos.imgMonedas[i].src = datos.img_monedas.src;
               }
           }
        };

        datos.monedasColisionadas=[];
        
        
        /* *********************************
         * TRAMPAS
         ********************************* */
        var xhrPosTrampas = new XMLHttpRequest();
        xhrPosTrampas.open("GET", "views/js/json/nivel"+datos.nivel+"/posicion_trampas.json", true);
        xhrPosTrampas.send();
        datos.posicionTrampas = [];
        datos.imgTrampas = [];
        
        xhrPosTrampas.onreadystatechange = function(){
           if((xhrPosTrampas.readyState == 4) && (xhrPosTrampas.status == 200)){
               datos.posicionTrampas = JSON.parse(xhrPosTrampas.responseText);
               
               for(var i=0; i<datos.posicionTrampas.length; i++){
                   datos.imgTrampas[i] = new Image();
                   datos.imgTrampas[i].src = datos.img_trampas.src;
               }
           }
        };
        
        /* *********************************
         * ENEMIGOS
         ********************************* */
        var xhrPosEnemigos = new XMLHttpRequest();
        xhrPosEnemigos.open("GET", "views/js/json/nivel"+datos.nivel+"/posicion_enemigos.json", true);
        xhrPosEnemigos.send();
        
        datos.imgEnemigos = new Image();
        datos.imgEnemigos.src = "views/img/utileria/enemigos.png";

        datos.posicionEnemigos = [];
        datos.imgBalasEnemigos = [];

        xhrPosEnemigos.onreadystatechange = function(){
           if((xhrPosEnemigos.readyState == 4) && (xhrPosEnemigos.status == 200)){
               datos.posicionEnemigos = JSON.parse(xhrPosEnemigos.responseText);
               datos.posicionBalasEnemigos = JSON.parse(xhrPosEnemigos.responseText);   //Las balas de los enemigos inician desde la misma posición de los enemigos                
                    datos.posicionBalasEnemigos.forEach(function(elem, index){
                        datos.imgBalasEnemigos[index] = new Image();
                        datos.imgBalasEnemigos[index].src = datos.imgDisparoEnemigos.src;
                });
            
           }
        };
        
        
        
        /* *********************************
         * JUGADOR
         ********************************* */   
        datos.imgJugador = new Image();
        datos.imgJugador.src = "views/img/jugador/stop_right.png";
        /*
         * El código de jugador es traladado al archivo lienzo.js
         * 
        datos.imgJugador = new Image();
        datos.imgJugador.src = "views/img/jugador/stop_right.png";
        datos.imgJugador.onload = function(){
            ctx.drawImage(
                    datos.imgJugador,
                    0, 0, 100, 100, 
                    datos.jugador_x, 
                    datos.jugador_y, 
                    datos.jugador_ancho, 
                    datos.jugador_alto
                    );
        }
        */
        
        /* *********************************
         * DISPARO JUGADOR
         ********************************* */
        //datos.imgDisparoJugador = new Image();
        //datos.imgDisparoJugador.src = "views/img/utileria/balasJugador.png";

        /* *********************************
         * PRELOAD
         ********************************* */

        var cargarArchivo = [datos.plano0, datos.texturaPlataforma, datos.detalles, datos.plano1, 
            datos.plano2, datos.plano3, datos.imgJugador, datos.imgEnemigos, datos.imgDisparoEnemigos,
            datos.imgColisionTrampa, datos.imgJumpLeft, datos.imgJumpRight, datos.imgRunLefth,
            datos.imgRunRight, datos.imgStopLeft, datos.imgStopRight, datos.imgColisionesBalas, 
            datos.imgColisionesBalasEnemigos, datos.imgColisionesMonedas, datos.imgColisionesTrampas, 
            datos.img_monedas, datos.img_trampas, datos.imgVidaMenos];
        var numeroArchivos = 0;
        var porcentajeCarga = 0;
        
            for(var i=0; i < cargarArchivo.length; i++){
                cargarArchivo[i].addEventListener("load", precarga);
            }
        
        
        
        function precarga(e){
            
            numeroArchivos++;
            porcentajeCarga=Math.ceil(numeroArchivos*100/cargarArchivo.length);
            
            document.getElementById("infoPreload").innerHTML = porcentajeCarga + "%";
            document.getElementById("medidorPorcentajeCarga").value = porcentajeCarga;
            
            if(numeroArchivos === cargarArchivo.length){
                document.getElementById("lienzo").style.display = "block";
                document.getElementById("btnAmpliar").style.display = "block";
                document.getElementById("btnFullScreen").style.display = "block";
                document.getElementById("tablero").style.display = "block";
                document.getElementById("controlesTouch").style.display = "block";    
                setTimeout(function(){
                    document.getElementById("final").style.display = "none";
                    
                    document.getElementById("carga").style.opacity = 0;
                    
                    
                    datos.contadorMonedasNivel = 0;
                    datos.penalizacionVidas = 0;

                    datos.gameOver = false;
                    
                    setTimeout(function(){
                        document.getElementById("carga").style.display = "none";
                    }, 10);
                    
                    juego.controlesTouch();
                    juego.teclado();                
                    juego.tiempo();      
                },1500);
                
            }
        }
        
        
    }
    
};

