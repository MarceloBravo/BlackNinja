<?php 
    if(session_status() != PHP_SESSION_ACTIVE){session_start();}
    
    if(!isset($_SESSION['validar']) || !$_SESSION['validar']){
        header("location:inicio");
        exit();
    }
    $ptje = new UsuariosController();
    
?>
<div id="inicio">
    <div id="cerrarSesion"><a href="salir">Cerrar Sesión</a></div>
    <h2 id="saludo">!Hola <?php echo $_SESSION['usuario']['nombre'] ?><img style="border-radius: 100%; margin-left:  10px" width="30px" src="<?php echo $_SESSION['usuario']['foto'] ?>">Bienvenid@</h2>
    
    <!-- ***************************** 
    NIVEL 1
    ****************************** *-->
    <div id="nivel1" class="niveles">
        <div class="puntaje"><?php echo $_SESSION['usuario']['ptje1'] ?> pts</div>
        <img src="views/img/intro/checkLevel1.svg">
        <center><button onclick="inicio.elegirNivel(this)" nivel="1" id="<?php echo $_SESSION['usuario']['id'] ?>">INGRESAR</button></center>
        <div class="puntajes">
            <div>MEJORES PUNTAJES</div>
            <ul>
                <?php
                    $ptje->mejoresPuntajes(1);
                ?>
            </ul>
        </div>
    </div>
    
    
    <!-- ***************************** 
    NIVEL 2
    ****************************** *-->
    <div id="nivel2" class="niveles">
        <div class="puntaje"><?php echo $_SESSION['usuario']['ptje2'] ?> pts</div>
        <?php if($_SESSION['usuario']['nivel2']){ ?>
            <img src="views/img/intro/checkLevel2.svg">
            <center><button onclick="inicio.elegirNivel(this)" nivel="2" id="<?php echo $_SESSION['usuario']['id'] ?>">INGRESAR</button></center>            
        <?php }else{ ?>
            <img src="views/img/intro/blockLevel2.svg">
        <?php } ?> 
        <div class="puntajes">
            <div>MEJORES PUNTAJES</div>
            <ul>
                <?php
                    $ptje->mejoresPuntajes(2);
                ?>
            </ul>
        </div>
    </div>
    <!-- ***************************** 
    NIVEL 3
    ****************************** *-->
    <div id="nivel3" class="niveles">
        <div class="puntaje"><?php echo $_SESSION['usuario']['ptje3'] ?> pts</div>
        <?php if($_SESSION['usuario']['nivel3']){ ?>
            <img src="views/img/intro/checkLevel3.svg">
            <center><button onclick="inicio.elegirNivel(this)" nivel="3" id="<?php echo $_SESSION['usuario']['id'] ?>">INGRESAR</button></center>
        <?php }else{ ?>
            <img src="views/img/intro/blockLevel3.svg">
        <?php } ?>
        <div class="puntajes">
            <div>MEJORES PUNTAJES</div>
            <ul>
                <?php
                    $ptje->mejoresPuntajes(3);
                ?>
            </ul>
        </div>
    </div>
    
</div>

<!-- ***********************************
INICIO
************************************ -->
<canvas id="lienzo" width="1000px" height="500px">  <!-- El ancho y alto del canvas se debe configurar en html ya que de hacerlo en css este funciona mal y la imágen se ve con mala resolución -->
    
</canvas>
<div id="btnAmpliar" onclick="screen.ampliarJuego()">AMPLIAR JUEGO</div>
<div id="btnFullScreen" onclick="screen.fullScreen()">PANTALLA COMPLETA</div>

<!-- ***********************************
TABLERO
************************************ -->
<div id="tablero">
    <!-- ***********************************
    VIDAS
    ************************************ -->
    <div id="vidas">
        <p>VIDAS: </p>
        <ul>
            <li id="vida1">
                <img src="views/img/utileria/vidas.png"/>
            </li>
            <li id="vida2">
                <img src="views/img/utileria/vidas.png"/>
            </li>
            <li id="vida3">
                <img src="views/img/utileria/vidas.png"/>
            </li>
        </ul>
    </div>
    <!-- ***********************************
    ENERGÍA
    ************************************ -->
    <div id="energia">
        <p>ENERGÍA: </p>
        <meter id="barraEnergia" value="100" max="100" min="0" high="40"></meter>
        <span id="porcentajeEnergia">100%</span>
    </div>
    <!-- ***********************************
    MONEDAS
    ************************************ -->
    <div id="monedas">
        <p>MONEDAS: </p>        
        <span id="contadorMonedas">0</span>
        <div id="spriteMonedas">
            
        </div>
    </div>
    <!-- ***********************************
    AUDIO
    ************************************ -->
    <div id="controlVolumen">
            <p>VOLUMEN: </P>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
    </div>
    <!-- ***********************************
    SALIDA
    ************************************ -->
    <div id="salida">
        <button onclick="juego.salir()">Salir</button>
    </div>
            
</div>

<!-- ***********************************
PRELOAD
************************************ -->
<div id="carga">
    <div id="preload">
        <span id="infoPreload">0%</span>
        <meter id="medidorPorcentajeCarga" value="0" max="100" high="90"></meter> <!-- high indica en que velor cambiará de color la etiqueta meter -->
    </div>
</div>
<!-- ***********************************
GAME OVER
************************************ -->
<div id="gameOver">
    <h1>Game Over</h1>
</div>

<!-- ***********************************
FINAL NIVEL
************************************ -->
<div id="final">
    <center>
        <div>
            <!-- <img src="views/img/intro/F-compartir.png" width="150px"/> -->
        </div>
    </center>
    <h1>Lo lograste<br/>
        <span id="puntajeNivel">0 pts</span>
    </h1>
    <ul>
        <li>
            <h3>Monedas</h3>
            <div id="spriteMonedasFinal"></div>
            <h4 id="totalMonedasNivel">
                <span id="spnMonedasRecogidas">100</span> pts
            </h4> 
        </li>
        <li>
            <h3>Energía</h3>
            <meter id="energiaFinal" min="0" max="100" value="100" high="40" style="margin-top:40px"></meter>
            <span id="spnTotalEnergia">100%</span>
            <h4 id="puntosEnergia" style="margin-top:20px">
                <span id="spnPuntosEnergia">100</span> pts
            </h4> 
        </li>
        <li>
            <h3>Vidas</h3>
                <ol>
                    <li id="vidaFinal1"><img src="views/img/utileria/vidas.png"/></li>
                    <li id="vidaFinal2"><img src="views/img/utileria/vidas.png"/></li>
                    <li id="vidaFinal3"><img src="views/img/utileria/vidas.png"/></li>
                </ol>            
            <h4 id="puntosVidas"><span id="spnPtsVida">100</span> pts</h4> 
        </li>
    </ul>

</div>
<!-- ***********************************
SONIDOS
************************************ -->
<audio id="sBackground01" class="sonidos" src="views/mp3/double dragon/01_Double Dragon (Opening Theme).mp3" type="audio/mpeg" muted></audio>
<audio id="sBackground02" class="sonidos" src="views/mp3/double dragon/02_Slums (Arrival of the Black Warriors).mp3" type="audio/mpeg" muted></audio>
<audio id="sBackground03" class="sonidos" src="views/mp3/double dragon/06_Industrial Area (Riot).mp3" type="audio/mpeg" muted></audio>
<audio id="sColisionBalasEnemigo" class="sonidos" src="views/mp3/colisionBalasEnemigo.mp3" type="audio/mpeg" muted></audio>
<audio id="sColisionTrampasEnemigos" class="sonidos" src="views/mp3/colisionTrampas-Enemigos.mp3" type="audio/mpeg" muted></audio>
<audio id="sDisparoEnemigo" class="sonidos" src="views/mp3/disparoEnemigo.mp3" type="audio/mpeg" muted></audio>
<audio id="sDisparoJugador" class="sonidos" src="views/mp3/disparoJugador.mp3" type="audio/mpeg" muted></audio>
<audio id="sEnergia" class="sonidos" src="views/mp3/energia.mp3" type="audio/mpeg" muted></audio>
<audio id="sGanar" class="sonidos" src="views/mp3/double dragon/04_Mission Complete.mp3" type="audio/mpeg" muted></audio>
<audio id="sMonedas" class="sonidos" src="views/mp3/monedas.mp3" type="audio/mpeg" muted></audio>
<audio id="sMonedero" class="sonidos" src="views/mp3/monedero.mp3" type="audio/mpeg" muted></audio>
<audio id="sPerder" class="sonidos" src="views/mp3/double dragon/09_Reunion with Marian (Ending Theme).mp3" type="audio/mpeg" muted></audio>
<audio id="sPerderVida" class="sonidos" src="views/mp3/perderVida.mp3" type="audio/mpeg" muted></audio>
<audio id="sPuntos" class="sonidos" src="views/mp3/puntos.mp3" type="audio/mpeg" muted></audio>
<audio id="sSaltoJugador" class="sonidos" src="views/mp3/saltoJugador.mp3" type="audio/mpeg" muted></audio>


