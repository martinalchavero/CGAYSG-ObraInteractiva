let o;
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
let generarObra = 0;

//----AUDIO----
let mic;

//GESTOR
let gestorAmp;
let gestorPitch;
let audioContext;

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

}

function draw() {
  o.dibujar();

  gestorAmp.actualizar(mic.getLevel());  

  amp = gestorAmp.filtrada;

  frec = gestorPitch.filtrada;

  haySonido = amp > AMP_MIN;

  let empezoElSonido = haySonido && !antesHabiaSonido; //evento

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
   // o.cambioObras(); 
   generarObra = (generarObra + 1) % 15;
    cambiarObra(generarObra);
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
      default:

        console.error("Diseño no válido");
    }
  }

  antesHabiaSonido = haySonido;

}
function cambiarObra(indice) {
  o.estadoObra = indice;
}
// ---- Pitch detection ---
function startPitch() {
  pitch = ml5.pitchDetection(pitchModel, audioContext , mic.stream, modelLoaded);
}

//function modelLoaded() {
  //getPitch();
//}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {

      gestorPitch.actualizar(frequency);    
      console.log(frequency);
    } 
    getPitch();
  })
}


