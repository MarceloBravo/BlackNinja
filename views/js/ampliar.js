/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var contenedor = document.getElementById("contenedor");
var lienzoCanvas = document.getElementById("lienzo");
var btnAmpliar = document.getElementById("btnAmpliar");
var btnFullScreen = document.getElementById("btnFullScreen");
var tablero = document.getElementById("tablero");

document.onfullscreenchange  = function(){
    screen.onFullScreenChange();
};

var screen = {
    onFullScreenChange: function(){        
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement; 
        if(fullscreenElement === undefined){
            btnAmpliar.style.display = "block";
            btnFullScreen.style.display = "block";
        }
    },

    fullScreen: function () {
        screen.ampliarJuego();
        btnAmpliar.style.display = "none";
        btnFullScreen.style.display = "none";
        
        var elem = document.getElementById("contenedor");

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari y Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }

    },

    ampliarJuego: function () {
        contenedor.style.width = "100%";
        contenedor.style.height = "100vh";
        contenedor.style.margin = "0";

        tablero.style.width = "100%";

        lienzoCanvas.style.width = "100%";
        lienzoCanvas.style.height = "100vh";

        btnAmpliar.innerHTML = "REDUCIR JUEGO";
        btnAmpliar.style.position = "fixed";
        btnAmpliar.style.zIndex = "100";
        btnAmpliar.style.top = "60px";
        btnAmpliar.style.left = "0px";
        
        btnFullScreen.style.top = "60px";
        btnFullScreen.style.left = "calc(100% - 210px)";
        btnFullScreen.style.position = "absolute";

        btnAmpliar.setAttribute("onclick", "screen.reducirJuego()");
    },

    reducirJuego: function () {
        contenedor.style.width = "1000px";
        contenedor.style.height = "500px";
        contenedor.style.margin = "5vh auto";

        lienzoCanvas.style.width = "1000px";
        lienzoCanvas.style.height = "500px";

        btnAmpliar.innerHTML = "AMPLIAR JUEGO";
        btnAmpliar.style.position = "relative";
        btnAmpliar.style.zIndex = "0";
        btnAmpliar.style.top = "0px";
        
        btnFullScreen.style.top = "-30px";
        btnFullScreen.style.left = "79%";
        btnFullScreen.style.position = "relative";
        
        btnAmpliar.setAttribute("onclick", "screen.ampliarJuego()");
    }
};
