let o;
let monitorear = true;

//---- CALIBRACION----
let AMP_MIN = 0.01;
let AMP_MAX = 0.06;

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
let generarObra = 0;

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

//colores
const coloresHex = [
  "0C0F14", "F1C552", "FBFDF7", "6D7ED6", "E157BB", "ADC2B8", 
  "FD5A5F", "F7FEE3", "A3B7C1", "A19B40", "E9F0BB", "EB4208", 
  "89A673", "E5E173", "A8B561", "556B78", "9F80CC", "ACF199", 
  "D4FA88", "EAD366", "E7E937", "A2AAA8", "DC0205", "FC5920", 
  "82939A", "FC4652", "FBFFFF", "FD5818", "FEA71F", "9BAF89", 
  "F1F5DA", "E7E537"
];

// Convertir el color hexadecimal a objeto RGB
function hexToRgb(hex) {
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}

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
generarObra = floor(random(7));
cambiarObra(generarObra);

  classifier.classify(gotResult);
}

function draw() {
  o.dibujar();

  gestorAmp.actualizar(mic.getLevel());  

  amp = gestorAmp.filtrada;

  frec = gestorPitch.filtrada;

  haySonido = amp > AMP_MIN;

  let empezoElSonido = haySonido && !antesHabiaSonido; //evento

  //if (IMPRIMIR){
    //printData();
  //}

  // Cambiar colores con la voz
  if (haySonido && amp >= AMP_MAX && frec <= 0.3) {
    console.log("Cambiando colores de los patrones (frecuencia grave)");

    // Índices de los patrones a cambiar
    const patrones1 = [0, 2, 3, 5, 7, 8, 10, 12, 13, 14, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 31, 32, 33, 34, 36];
    const patrones2 = [1, 4, 6, 9, 11, 17, 19, 22, 24, 27, 29, 35];

    // Combinar ambos conjuntos de patrones
    const todosPatrones = [...patrones1, ...patrones2];

    // Asignar colores aleatorios a los patrones específicos
    todosPatrones.forEach((indice) => {
      o.coloresActuales[indice] = o.generarColorAleatorio();
    });
      //detener la interacción
    } else if (amp <= AMP_MAX && frec <= 0.3) {
    console.log("Se detuvo el cambio de color de los patrones");
  }

  if (haySonido && amp >= AMP_MAX && frec >= 0.7) {
    console.log("Cambiando colores los fondos (frecuencia aguda)");
    // Índices de los patrones a cambiar
    for (let i = 0; i < o.coloresFondos.length; i++) {
      const randomColorHex = coloresHex[Math.floor(Math.random() * coloresHex.length)];
      o.coloresFondos[i] = hexToRgb(randomColorHex); // Convertir el color hex a RGB
  }  
  //detener la interacción
  } else if (amp <= AMP_MAX && frec >= 0.7) {
  console.log("Se detuvo el cambio de color de los fondos");
}

//cambio estado
if (empezoElSonido && amp < 0.1 && frec >= 0.4) {
    generarObra = (generarObra + 1) % 15;
    cambiarObra(generarObra);
    console.log("Se detectó cambio estado");
}

// Cambiar de diseño patron
  if (haySonido && amp > 0.05 && frec <= 0.4) {
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
      default:

        console.error("Diseño no válido");
    }
  }

  //if(monitorear){
    //gestorPitch.dibujar(100, 300);
  //}

  antesHabiaSonido = haySonido;
}

function cambiarObra(indice) {
  o.estadoObra = indice;
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
