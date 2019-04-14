/* *********************************
 * VARIABLES LA LINEA DE TIEMPO
 ********************************* */
var frame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;

var animacion; 
/* *********************************
 * VARIABLES DEL CANVAS
 ********************************* */
var canvas;
var ctx;

/* *********************************
 * VARIABLES DEL DATOS
 ********************************* */
var datos = {
    nivel: null,
    plano3: null,
    plano2: null,
    plano1: null,
    plano0: null,
    texturaPlataforma: null,
    bloques:[],
    imgJugador:"",
    jugador_x:70,
    jugador_y:200,
    jugador_ancho:50,
    jugador_alto:50,
    detalles:null,
    posDetalles:[],
    
    izquierda: false,
    derecha:false,
    movimiento:0,
    desplazamientoEscenario:0,
    velocidad:5,
    limiteEscenario: -2000,
    movimientoJugador: 0,
    velocidadJugador: 5,
    id:null,
    plataforma: null,
    plataformaOrigen: null,
    
    gravedad:0,
    limiteGravedad:20,
    pesoPersonaje: .5,
    
    salto: false,
    alturaSalto: -10,
    
    sprite:0,
    cicloSprite:0,
    
    reiniciar: false,
    
    imgMonedas:[],
    posicionMonedas:[],
    monedasColisionadas:[],
    contadorMonedas:0,
    contadorMonedasNivel: 0,
    
    imgTrampas:[],
    posicionTrampas:[],        
    movTrampa:-1,
    cambioMovTrampa:false, 
    energiaTrampa:.5,
    
    imgEnemigos:null,
    posicionEnemigos:[],

    imgBalasEnemigos:[],
    posicionBalasEnemigos:[],
    movBalasEnemigos:0,
    velocidadBalasEnemigos:5,
    cicloDisparoEnemigos:0,
    energiaBalas:1, 

    disparo: false,
    imgDisparoJugador:[],
    disparo_x:[],
    disparo_y:[],
    disparo_ancho:[],
    disparo_alto:[],    
    disparando:false,
    //disparoDerecho:false,
    //disparoIzquierdo:false,
    movDisparoJugador:0,
    velocidadDisparoJugador:5,
    direccionDisparo:[],
    direccionJugador: "der",
    disparoActivado:true,

    energia:100,
    vida:3, 

    gameOver: false,

    puntajeTotal:0,
    puntajeNivel:0,
    penalizacionEnergia: 0,
    penalizacionVidas: 0,
    incrementoPuntaje: 0,

    /* *********************************
    * IMÁGENES
    ********************************* */
   imgColisionTrampa: null,
   imgJumpLeft: null,
   imgJumpRght: null,
   imgRunLefth: null,
   imgRunRight: null,
   imgStopLeft: null,
   imgStopRight: null,
   imgColisionesBalas: null,
   imgColisionesBalasEnemigos: null,
   imgColisionesMonedas: null,
   imgColisionesTrampas: null,
   img_monedas: null,
   img_trampas: null,
   imgBalasJugador: null,
   imgDisparoEnemigos: null,
   imgVidaMenos: null
};

/* *********************************
 * VARIABLES DEL SONIDO
 ********************************* */
var sonidos = {
    sBackground01:null,
    sBackground02:null,
    sBackground03:null,
    sColisionBalasEnemigo:null,
    sColisionTrampasEnemigos:null,
    sDisparoEnemigo:null,
    sDisparoJugador:null,
    sEnergia:null,
    sGanar:null,
    sMonedas:null,
    sMonedero:null,
    sPerder:null,
    sPerderVida:null,
    sPuntos:null,
    sSaltoJugador:null,
    sResumenPuntaje:null,
    listaSonidos:[]
};
