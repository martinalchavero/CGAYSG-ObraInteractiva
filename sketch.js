let o;
let isBPressed = false; //  indicar si la tecla 'B' está presionada
let isEnterPressed = false; // indicar si la tecla 'Enter' está presionada

let monitorear = true;

//---- CALIBRACION----
let AMP_MIN = 0.01;
let AMP_MAX = 0.1;

let FREC_MIN = 210; //grave
let FREC_MAX = 300; //agudo



let AMORTIGUACION = 0.9; // factor de amortiguación de la señal
let pitch;
let amp;
let ampCruda;
let frec;

let haySonido = false;
let antesHabiaSonido = false;  // memoria del estado de "haySonido" un fotograma atrás
let diseñoActual = 0;

//----AUDIO----
let mic;


//GESTOR
let gestorAmp;
let gestorPitch;

let audioContext;
const pitchModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let classifier;
const options = { probabilityThreshold: 0.9 };
let label;

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/VvpBMYSvg/';

function preload() {
  // Load SpeechCommands18w sound classifier model
  classifier = ml5.soundClassifier(soundModel + 'model.json', options);
}
//IMPRIMIR
let IMPRIMIR = true;


function setup() {
  createCanvas(600, 600);
  o = new obras();
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

//GESTOR
gestorAmp = new GestorSenial (AMP_MIN, AMP_MAX); // inicilizo en goestor con los umbrales mínimo y máximo de la señal
gestorPitch = new GestorSenial( FREC_MIN, FREC_MAX);

gestorAmp.f = AMORTIGUACION;



  userStartAudio(); // forzar el inicio del audio en el navegador

  classifier.classify(gotResult);

 
}

function draw() {
  o.dibujar();

  gestorAmp.actualizar(mic.getLevel());  

  amp = gestorAmp.filtrada;

  frec = gestorPitch.filtrada;

  haySonido = amp > AMP_MIN;

  let empezoElSonido = haySonido && !antesHabiaSonido; //evento

  if (IMPRIMIR){
    printData();
  }

  // Cambiar colores con la voz
  if (haySonido && amp >= AMP_MAX && frec <= 0.3) {
    console.log("Cambiando colores de los círculos (frecuencia grave)");

    // Índices de los patrones a cambiar
    const patrones1 = [0, 2, 3, 5, 7, 8, 10, 12, 13, 14, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 31, 32, 33, 34, 36];
    const patrones2 = [1, 4, 6, 9, 11, 17, 19, 22, 24, 27, 29, 35];

    // Combinar ambos conjuntos de patrones
    const todosPatrones = [...patrones1, ...patrones2];

    // Asignar colores aleatorios a los patrones específicos
    todosPatrones.forEach((indice) => {
      o.coloresActuales[indice] = o.generarColorAleatorio();
    });
}


  if (haySonido && amp > AMP_MAX && frec >= 0.7) {
    console.log("Cambiando colores los fondos");
    // Índices de los patrones a cambiar
    for (let i = 0; i < o.coloresFondos.length; i++) {
      o.coloresFondos[i] = {
      r: random(255),
        g: random(255),
        b: random(255)
    };
  }
}

//cambio estado
if (empezoElSonido && amp < 0.5 && frec >= 0.4) {
    o.cambioObras(); 
    console.log("Se detectó cambio estado");
}

  if (haySonido && amp > 0.05 && frec <= 0.4) {
    // Cambiar de diseño cuando se presione 'O'
  
    // Incrementar el diseño actual y asegurarse de que esté dentro del rango válido
    diseñoActual = (diseñoActual + 1) % 15;
  
    // Llamar al método de cambio de diseño correspondiente
    switch(diseñoActual) {
      case 0:
        o.cambiarDiseño();
        break;
      case 1:
        o.cambiarDiseño1();
        break;
      case 2:
        o.cambiarDiseño2();
        break;
      case 3:
        o.cambiarDiseño3();
        break;
      case 4:
        o.cambiarDiseño4();
        break;
      case 5:
        o.cambiarDiseño5();
        break;
      case 6:
        o.cambiarDiseño6();
        break;
      case 7:
        o.cambiarDiseño7();
        break;
      case 8:
        o.cambiarDiseño8();
        break;
      case 9:
        o.cambiarDiseño9();
        break;
      case 10:
        o.cambiarDiseño10();
        break;
      case 11:
        o.cambiarDiseño11();
        break;
      case 12:
        o.cambiarDiseño12();
        break;
      case 13:
        o.cambiarDiseño13();
        break;
      case 14:
        o.cambiarDiseño14();
        break;
      default:
        // Opcional: manejar el caso por si hay algún error
        console.error("Diseño no válido");
    }
  }

  /*if(monitorear){
    gestorPitch.dibujar(100, 300);
  }*/

  antesHabiaSonido = haySonido;
}

// ---- Pitch detection ---
function startPitch() {
  pitch = ml5.pitchDetection(pitchModel, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {

      gestorPitch.actualizar(frequency);    
      console.log(frequency);
    } 
    getPitch();
  })
}

//-------- CLASIFICADOR------
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log(results);
  label = results[0].label;

  //if (label === "PI") // Cambiar de obra cuando se detecte "PI"
  //{
    //o.cambioObras(); 
    //console.log("Se detectó la palabra 'pi'");
  //}

}

function mousePressed() {
    o.cambioObras();
}

function keyPressed() {
    if (key === 'O' || key === 'o') // Cambiar de diseño cuando se presione 'O'
  {
    o.cambiarDiseño();
    o.cambiarDiseño1();
    o.cambiarDiseño2();
    o.cambiarDiseño3();
    o.cambiarDiseño4();
    o.cambiarDiseño5();
    o.cambiarDiseño6();
    o.cambiarDiseño7();
    o.cambiarDiseño8();
    o.cambiarDiseño9();
    o.cambiarDiseño10();
    o.cambiarDiseño11();
    o.cambiarDiseño12();
    o.cambiarDiseño13();
    o.cambiarDiseño14();
  } 
  else if (keyCode === ENTER) // Marcar la tecla 'Enter' como presionada
  {
    isEnterPressed = true; 
  } else {
    o.teclaActual = null;
  }
}



function keyReleased() {
  if (keyCode === ENTER) // Marcar la tecla 'Enter' como soltada
  {
    isEnterPressed = false; 
  }
}
function printData(){

  push();
  textSize (16);
  fill(0);
  let texto;

  texto = 'amplitud: ' + amp;
  text (texto, 20, 20);
  pop();

  push();
  textSize (16);
  texto = 'frecuencia: ' + frec;
  text (texto, 20, 40);
  pop();
  gestorAmp.dibujar(100, 500); //barra de gestor
}
