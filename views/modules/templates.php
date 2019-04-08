<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf8">
        <title>Black Ninja | Juego de plataforma</title>
        
        <link rel="icon" href="views/img/intro/favicon.png">
        <link href="views/css/estilo.css" type="text/css" rel="stylesheet" media=""> <!-- Para que el juego se adapte a cualquier dispositivo dejar la etiqueta media vacia -->
        <link href="views/css/ingreso.css" type="text/css" rel="stylesheet" media=""> <!-- Para que el juego se adapte a cualquier dispositivo dejar la etiqueta media vacia -->
        <link href="views/css/inicio.css" type="text/css" rel="stylesheet" media=""> <!-- Para que el juego se adapte a cualquier dispositivo dejar la etiqueta media vacia -->
        <link href="https://fonts.googleapis.com/css?family=Patrick+Hand+SC" rel="stylesheet">  <!-- font-family: 'Patrick Hand SC', cursive; -->
        
        <script type="text/javascript" src="views/jquery/jquery.js"></script>
        <script type="text/javascript" src="views/js/variables_y_propiedades.js"></script>
        <script type="text/javascript" src="views/js/inicio.js"></script>
        <script type="text/javascript" src="views/js/juego.js"></script>
        <script type="text/javascript" src="views/js/lienzo.js"></script>
        
        <script type="text/javascript" src="views/js/screenfull.min.js"></script>
    </head>
    <body>
        <!-- Pantalla vertical -->
        <div id="verticalMsg">
            
        </div>
        <!-- /Pantalla vertical -->
        <!-- Marco -->
        <div id="marco">
            
        </div>
        <!-- /Marco -->
        <!-- Contenedor -->
        <div id="contenedor">
            <?php 
            if(isset($_GET['action'])){
                include $_GET['action'].".php";
                /*
                switch ($_GET['action']){
                    case "inicio":
                        include 'inicio.php';
                    default :
                        include $_GET['action'].".php";
                }
                 */
            }else{
                include 'ingreso.php'; 
            }
            ?>            
        </div>
        <!-- /Contenedor -->
        <!-- Footer -->
        <footer>
            <center>
                <p>Juego desarrollado por Marcelo Bravo C | <a href="#" target="blank">mabc.juegos.cl (Este link no funciona) </a></p>
            </center>
        </footer>
        <!-- /Footer -->
    </body>
    <script type="text/javascript" src="views/js/ampliar.js"></script>
    
</html>
