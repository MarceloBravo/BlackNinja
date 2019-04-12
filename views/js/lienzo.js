/* **************************
 * MÉTODOS DEL OBJETOC LIENZO
************************** */

var lienzo = {
    canvas: function(){
        /* **************************
        * BORRAR CANVAS CADA 60 FOTOGRAMAS POR SEGUNDO
        ************************** */

       ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* **************************
        * PLANO 3
        ************************** */
      
        ctx.drawImage(datos.plano3, datos.desplazamientoEscenario/5 ,0, datos.plano3.naturalWidth, datos.plano3.naturalHeight);
        ctx.drawImage(datos.plano3, datos.desplazamientoEscenario/5 + 1000 ,0, datos.plano3.naturalWidth, datos.plano3.naturalHeight);
        //ctx.drawImage(datos.plano3, datos.desplazamientoEscenario/5 + 2000 ,0, datos.plano3.naturalWidth, datos.plano3.naturalHeight);
        
        /* **************************
        * PLANO 2
        ************************** */
        ctx.drawImage(datos.plano2, datos.desplazamientoEscenario/4 ,0, datos.plano2.naturalWidth, datos.plano2.naturalHeight);
        ctx.drawImage(datos.plano2, datos.desplazamientoEscenario/4 + 1000 ,0, datos.plano2.naturalWidth, datos.plano2.naturalHeight);
        //ctx.drawImage(datos.plano2, datos.desplazamientoEscenario/4 + 2000 ,0, datos.plano2.naturalWidth, datos.plano2.naturalHeight);
      
        /* **************************
        * PLANO 1
        ************************** */
        ctx.drawImage(datos.plano1, datos.desplazamientoEscenario/3 ,0, datos.plano1.naturalWidth, datos.plano1.naturalHeight);
        ctx.drawImage(datos.plano1, datos.desplazamientoEscenario/3 +  1000 ,0, datos.plano1.naturalWidth, datos.plano1.naturalHeight);
        //ctx.drawImage(datos.plano1, datos.desplazamientoEscenario/3 + 2000 ,0, datos.plano1.naturalWidth, datos.plano1.naturalHeight);
                
        /* **************************
         * DETALLES
         ************************** */
        for(var i=0; i<datos.posDetalles.length; i++){
                
            ctx.drawImage(datos.detalles, 
                            datos.desplazamientoEscenario + datos.posDetalles[i].x, 
                            datos.posDetalles[i].y, 
                            datos.posDetalles[i].ancho, 
                            datos.posDetalles[i].alto);
        }
        
        
        /* **************************
         * TRAMPAS
         ************************** */
        for(var i=0; i<datos.imgTrampas.length; i++){
            ctx.drawImage(
                    datos.imgTrampas[i], 
                    datos.sprite, 0, 100, 100,
                    datos.desplazamientoEscenario + datos.posicionTrampas[i].x + datos.movTrampa,
                    datos.posicionTrampas[i].y, 
                    datos.posicionTrampas[i].ancho, 
                    datos.posicionTrampas[i].alto);
        }
        
        /* **************************
         * BLOQUES
         ************************** */
        for(var i=0; i<datos.bloques.length; i++){
            ctx.drawImage(
                    datos.texturaPlataforma, 
                    datos.desplazamientoEscenario + datos.bloques[i].x, 
                    datos.bloques[i].y, 
                    datos.bloques[i].ancho, 
                    datos.bloques[i].alto);
        }

        /* **************************
         * BALAS ENEMIGOS
         ************************** */
        for(var i=0; i<datos.posicionBalasEnemigos.length; i++){
            try{
            ctx.drawImage(
                    datos.imgBalasEnemigos[i], 
                    0, 0, 100, 100,
                    datos.desplazamientoEscenario + datos.posicionBalasEnemigos[i].x,
                    datos.posicionBalasEnemigos[i].y + 5, 
                    datos.posicionBalasEnemigos[i].ancho - 20, 
                    datos.posicionBalasEnemigos[i].alto - 20);
            }catch(e){
                console.log(e);
            }
        }

        /* **************************
         * ENEMIGOS
         ************************** */
        for(var i=0; i<datos.posicionEnemigos.length; i++){
            ctx.drawImage(
                    datos.imgEnemigos, 
                    0, 0, 100, 100,
                    datos.desplazamientoEscenario + datos.posicionEnemigos[i].x,
                    datos.posicionEnemigos[i].y, 
                    datos.posicionEnemigos[i].ancho, 
                    datos.posicionEnemigos[i].alto);
        }
        
        /* **************************
         * MONEDAS
         ************************** */
        for(var i=0; i<datos.imgMonedas.length; i++){
            ctx.drawImage(
                    datos.imgMonedas[i], 
                    datos.sprite, 0, 100, 100,
                    datos.desplazamientoEscenario + datos.posicionMonedas[i].x,
                    datos.posicionMonedas[i].y, 
                    datos.posicionMonedas[i].ancho, 
                    datos.posicionMonedas[i].alto);
        }
        
        
        
        /* *********************************
         * JUGADOR
         ********************************* */        
        //datos.imgJugador = new Image();
        //datos.imgJugador.src = "views/img/jugador/stop_right.png";
        //datos.imgJugador.onload = function(){
        
            ctx.drawImage(
                    datos.imgJugador,
                    datos.sprite, 0, 100, 90, 
                    datos.jugador_x, 
                    datos.jugador_y, 
                    datos.jugador_ancho, 
                    datos.jugador_alto
                    );
        //}
                
         /* **************************
         * DISPARO JUGADOR
         ************************** */
        
        datos.disparo_x.forEach(function(elem, i){
            ctx.drawImage(datos.imgDisparoJugador[i], datos.sprite, 0, 100, 100, datos.disparo_x[i], datos.disparo_y[i], datos.disparo_ancho[i], datos.disparo_alto[i]);
        })
            
        /* **************************
         * PLANO 0
         ************************** */
        ctx.drawImage(datos.plano0, datos.desplazamientoEscenario/2 ,0, datos.plano0.naturalWidth, datos.plano0.naturalHeight);
        ctx.drawImage(datos.plano0, datos.desplazamientoEscenario/2 + 1000 ,0, datos.plano0.naturalWidth, datos.plano0.naturalHeight);
        ctx.drawImage(datos.plano0, datos.desplazamientoEscenario/2 + 2000 ,0, datos.plano0.naturalWidth, datos.plano0.naturalHeight);

        
        /* **************************
         * PLATAFORMA
         ************************** */
        ctx.fillStyle = "rgba(255, 0, 0, 0)";
        for(var i=0; i<datos.plataforma.length; i++){
            ctx.fillRect( 
                    datos.plataforma[i].x, 
                    datos.plataforma[i].y, 
                    datos.plataforma[i].ancho, 
                    datos.plataforma[i].alto);
        }
        
    }
};

