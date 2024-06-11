let o;
let isBPressed = false; //  indicar si la tecla 'B' está presionada
let isEnterPressed = false; // indicar si la tecla 'Enter' está presionada


//----AUDIO----
let mic;

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

function setup() {
  createCanvas(600, 600);
  o = new obras();
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  userStartAudio(); // forzar el inicio del audio en el navegador

  classifier.classify(gotResult);

 
}

function draw() {
  o.dibujar();
  
  if (label == "aplauso") // Cambiar colores de fondo si la etiqueta es "aplauso"
  {  
    for (let i = 0; i < o.coloresFondos.length; i++) {
      o.coloresFondos[i] = {
        r: random(255),
        g: random(255),
        b: random(255)
      };
    }
  }

}

function startPitch() {
  pitch = ml5.pitchDetection(pichModel, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}


function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log(results);
  label = results[0].label;

  if (label === "PI") // Cambiar de obra cuando se detecte "PI"
  {
    o.cambioObras(); 
  }
}

function mousePressed() {
    o.cambioObras();
}

function keyPressed() {
  if (key === 'A' || key === 'a') 
  {
    o.teclaActual = 'A';
  } 
  else if (key === 'B' || key === 'b') 
  {
    o.teclaActual = 'B';
    o.coloresActuales[1] = o.generarColorAleatorio(); // Patrón 1
    o.coloresActuales[4] = o.generarColorAleatorio(); // Patrón 4
    o.coloresActuales[6] = o.generarColorAleatorio(); // Patrón 6
    o.coloresActuales[9] = o.generarColorAleatorio(); // Patrón 9
    o.coloresActuales[11] = o.generarColorAleatorio(); // Patrón 11
    o.coloresActuales[17] = o.generarColorAleatorio(); // Patrón 17
    o.coloresActuales[19] = o.generarColorAleatorio(); // Patrón 19
    o.coloresActuales[22] = o.generarColorAleatorio(); // Patrón 22
    o.coloresActuales[24] = o.generarColorAleatorio(); // Patrón 24
    o.coloresActuales[27] = o.generarColorAleatorio(); // Patrón 27
    o.coloresActuales[29] = o.generarColorAleatorio(); // Patrón 29
    o.coloresActuales[35] = o.generarColorAleatorio(); // Patrón 35
  } 
  else if (key === 'O' || key === 'o') // Cambiar de diseño cuando se presione 'O'
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