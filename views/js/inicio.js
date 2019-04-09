/* ***************************************
 * OBJETOS
 ************************************** */
var inicio = {
    /* **********************
     * MÉTODOS
     ********************* */
    iniciar: function () {        
        var identificador = "111111111";
        var nombre = "Marcelo Bravo";
        var foto = "views/img/intro/pedro.png";

        /*utilizando ajax nativo de javascript*/
        var xhr = new XMLHttpRequest();
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
    },

    
    /* **********************
     * ELEGIR NIVEL
     ********************* */
    elegirNivel: function (e) {  
        datos.nivel = e.getAttribute("nivel");
        datos.id = e.getAttribute("id");
        
        /* **********************
        * SONIDOS
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

        sonidos.listaSonidos = document.getElementsByClassName("sonidos");

        for(var i=sonidos.listaSonidos.length-1; i>=0 ; i--){
            
            sonidos.listaSonidos[i].play();
            sonidos.listaSonidos[i].pause();
            sonidos.listaSonidos[i].muted = false;

            
        }

        inicio.inicioDeNiveles(datos.nivel);
    },

    /* *********************************
     * INICIO DE NIVELES
     ********************************* */
    
    
    inicioDeNiveles: function (nivel) {        
        document.getElementById("inicio").parentNode.removeChild(document.getElementById("inicio"));
        datos.nivel = nivel;
        inicio.preparaNiveles();
    },

    siguienteNivel: function(){
        datos.nivel++;        
        inicio.preparaNiveles();
    },

    preparaNiveles: function(){
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
                   datos.imgMonedas[i].src = "views/img/utileria/monedas.png";
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
                   datos.imgTrampas[i].src = "views/img/utileria/trampas.png";
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
                    datos.imgBalasEnemigos[index].src = "views/img/utileria/balasEnemigos.png";
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

        var cargarArchivo = [datos.plano0, datos.texturaPlataforma, datos.detalles, datos.plano1, datos.plano2, datos.plano3, datos.imgJugador, datos.imgEnemigos];
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
                document.getElementById("carga").style.opacity = 0;
                document.getElementById("btnAmpliar").style.display = "block";
                document.getElementById("btnFullScreen").style.display = "block";
                document.getElementById("tablero").style.display = "block";
                
                datos.contadorMonedasNivel = 0;
                datos.penalizacionVidas = 0;

                datos.gameOver = false;
                
                setTimeout(function(){
                    document.getElementById("carga").style.display = "none";
                }, 10);
                
                juego.teclado();
                juego.tiempo();
                
            }
        }
        
        
    }
    
};

