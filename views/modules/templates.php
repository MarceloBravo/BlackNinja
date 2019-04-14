<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf8">        
        
        <title>Black Ninja | Juego de plataforma</title>
        <!-- *************************************** 
        MARCADO DE OPEN GRAPH (Etiquetas necesarias para compartir en Facebook)
        *************************************** -->
        <meta property="og:url"           content="http://mabc.byethost9.com/blackninja" />
        <meta property="og:type"          content="article" />
        <meta property="og:title"         content="Black ninja" />
        <meta property="og:description"   content="Juego de plataforma en canbas" />
        <meta property="og:image"         content="http://mabc.byethost9.com/blackninja/portadaFacebook.jpg" />
        <meta property="fb:app_id"        content="1257207024453523" />
        
        <!-- *************************************** 
        PANTALLA DE INICIO PARA DISPOSITIVOS TOUCH
        *************************************** -->
        <meta name="viewport" content="user-scalable=no, maximum-scale=1.0, minima-ui"/>

        <!--  for ios 7 style, multiresolution icon of 152x152 -->
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent"/>
        <meta name="apple-touch-icon" size="152x152" content="views/img/touch/favicon152.png"/>

        <!-- Chrome on Android, multiresolution icon of 196x196 -->
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="shortcut icon" size="196x196" content="views/img/touch/favicon196.png"/>

        <link rel="icon" href="views/img/intro/favicon.png">
        <link href="views/css/estilo.min.css" type="text/css" rel="stylesheet" media=""> <!-- Para que el juego se adapte a cualquier dispositivo dejar la etiqueta media vacia -->
        <link href="views/css/ingreso.min.css" type="text/css" rel="stylesheet" media=""> <!-- Para que el juego se adapte a cualquier dispositivo dejar la etiqueta media vacia -->
        <link href="views/css/inicio.min.css" type="text/css" rel="stylesheet" media=""> <!-- Para que el juego se adapte a cualquier dispositivo dejar la etiqueta media vacia -->
        <link href="https://fonts.googleapis.com/css?family=Patrick+Hand+SC" rel="stylesheet">  <!-- font-family: 'Patrick Hand SC', cursive; -->
        
        <script type="text/javascript" src="views/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="views/js/variables_y_propiedades.min.js"></script>
        <script type="text/javascript" src="views/js/inicio.min.js"></script>
        <script type="text/javascript" src="views/js/juego.min.js"></script>
        <script type="text/javascript" src="views/js/lienzo.min.js"></script>
        
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
            if(isset($_GET['action']) && $_GET['action'] != ""){
                include $_GET['action'].".php";
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

        
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1257207024453523',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

    </body>
    <script type="text/javascript" src="views/js/ampliar.min.js"></script>
    
</html>
