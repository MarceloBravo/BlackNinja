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
PRELOAD
************************************ -->
<div id="gameOver">
    <h1>Game Over</h1>
</div>


