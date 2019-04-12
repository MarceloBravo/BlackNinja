<!-- *******************
INGRESO
******************** -->
<div id="ingreso">
    <div id="loginTouch">
        <button onclick="inicio.ocultarMsgTouch()">X</button>
        <img src="views/img/touch/instructivoTOUCH.jpg" />
    </div>
    <div id="ingresoFacebook">
        <img src="views/img/intro/facebook.svg" />
        <button id="btnIngresar" onclick="inicio.iniciar()">Ingresar con facebook</button>
    </div>
    <form id="loginForm">
        <input type="email" id="email" name="email" placeholder="Ingresa tu email" required/>
        <input type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre" required/>

        <button type="button" id="btnLoginForm" onclick="inicio.loginForm()">Ingresar</button>
    </form>
</div>

