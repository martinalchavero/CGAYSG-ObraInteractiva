class obras{
    
    constructor(){
        
        this.estadoObra=0;
        imageMode(CENTER);
        this.fondo=[]; //arreglo de fondos
        for(let i=0 ; i<19; i++ ){
            this.nombre = "data/fondos-copia/recurso"+i+".png";
            this.fondo[i]=loadImage(this.nombre);
         }
        
        this.patron=[]; //arreglo de patrones
        for(let i=0 ; i<37; i++ ){
            this.nombre1 = "data/patrones-copia/recurso"+i+".png";
            this.patron[i]=loadImage(this.nombre1);
         }


         this.coloresIniciales = [  // Colores iniciales para cada patrón
            [255,150,0], // 0
            [0,250,125],  //1
            [0,0,0], //2
            [142,62,99], //3
            [200, 100, 50], //4
            [200,200,200], //5
            [255, 118, 206], //6
            [200,30,60], //7
            [60,60,60], //8
            [178, 34, 34], //9
            [0,0,0], //10
            [200, 100, 50], //11
            [120, 160, 131], //12
            [139, 50, 44], //13
            [200, 100, 50], //14
            [217, 237, 191], //15
            [200, 100, 50], //16
            [255, 244, 85], //17
            [200, 100, 50], //18
            [70, 130, 180], //19

            [255,150,0], // 20
            [0,250,125],  //21
            [0,0,0], //22
            [142,62,99], //23
            [200, 100, 50], //24
            [200,200,200], //25
            [255, 118, 206], //26
            [200,30,60], //27
            [60,60,60], //28
            [178, 34, 34], //29
            [0,0,0], //30
            [200, 100, 50], //31
            [120, 160, 131], //32
            [139, 50, 44], //33
            [200, 100, 50], //34
            [217, 237, 191], //35
            [200, 100, 50], //36
            //[255, 244, 85], //17
            //[200, 100, 50], //18
            //[70, 130, 180], //19

        ];

        this.coloresActuales = [...this.coloresIniciales]; // Colores actuales para cada patrón (se inicializan con los colores iniciales)
        this.teclaActual = null;


        this.coloresFondos = [];
        for (let i = 0; i < 20; i++) {
            this.coloresFondos.push({
                r: random(255),
                g: random(255),
                b: random(255)
            }
            );
        }
        
        
    }
    generarColorAleatorio() {
        const r = Math.floor(Math.random() * 200); // Limitar el componente rojo a valores más bajos
        const g = Math.floor(Math.random() * 200); // Limitar el componente verde a valores más bajos
        const b = Math.floor(Math.random() * 200); // Limitar el componente azul a valores más bajos
        
        return [r, g, b];
    }
    
    //fc=fondo color ---- fx,fy,fw,fh=x,y,ancho,alto ---- pc=patron color
    
    generarObra(fc1,fc2,fc3,figura,fx,fy,fw,fh){
        push();
        tint(fc1,fc2,fc3);
        image(this.fondo[figura],fx,fy,fw,fh);
        pop();
    }

    generarPatron(tecla, colores, diseño, figura, fx, fy, fw, fh) {
        // Almacenar los colores actuales antes de presionar la tecla
        const coloresPrevios = this.coloresActuales[diseño].slice();
    
        if ((diseño === 0 || diseño === 2 || diseño === 3 || diseño === 5 || diseño === 7 || diseño === 8 || diseño === 10 || diseño === 12 || diseño === 13 || diseño === 14 || diseño === 15 || diseño === 16 || diseño === 18 || diseño === 20|| diseño === 21 || diseño === 23 || diseño === 25 || diseño === 26 || diseño === 28 || diseño === 30 || diseño === 31 || diseño === 32 || diseño === 33 || diseño === 34 || diseño === 36 ) && keyIsDown(tecla)) {
            this.teclaActual = tecla;
            this.coloresActuales[diseño] = this.generarColorAleatorio();
        } else {
            this.teclaActual = null;
        }
    
        push();
        if (this.teclaActual) {
            tint(this.coloresActuales[diseño][0], this.coloresActuales[diseño][1], this.coloresActuales[diseño][2]);
        } else {
            // Restaurar los colores previos cuando no se está presionando la tecla
            tint(coloresPrevios[0], coloresPrevios[1], coloresPrevios[2]);
        }
        this.patron[diseño].mask(this.fondo[figura]);
        image(this.patron[diseño], fx, fy, fw, fh);
        pop();
    }
    
    
    
    dibujar() {
        switch (this.estadoObra) {
            case 0:
                push();
                background(240);

                this.generarObra(this.coloresFondos[0].r, this.coloresFondos[0].g, this.coloresFondos[0].b, 0, 30, 80, 500, 500);

                this.generarObra(this.coloresFondos[1].r, this.coloresFondos[1].g, this.coloresFondos[1].b, 1, 80, 80, 500, 500);

                this.generarObra(this.coloresFondos[2].r, this.coloresFondos[2].g, this.coloresFondos[2].b, 2, 124, 80, 500, 500);

                this.generarObra(this.coloresFondos[3].r, this.coloresFondos[3].g, this.coloresFondos[3].b, 3, 164, 80, 500, 500);
                this.generarPatron(65, [255, 150, 0], 0, 3, 164, 80, 500, 500); // patron 0

                this.generarObra(this.coloresFondos[4].r, this.coloresFondos[4].g, this.coloresFondos[4].b, 4, 220, 80, 500, 500);

                this.generarObra(this.coloresFondos[5].r, this.coloresFondos[5].g, this.coloresFondos[5].b, 5, 440, 30, 730, 730);
                this.generarPatron(65, [255, 140, 0], 7, 5, 440, 30, 730, 730); // patron 7

                this.generarObra(this.coloresFondos[6].r, this.coloresFondos[6].g, this.coloresFondos[6].b, 6, 20, 380, 500, 645);
                this.generarPatron(73, [0, 0, 128], 9, 6, 20, 380, 500, 645); // patron 9

                this.generarObra(this.coloresFondos[7].r, this.coloresFondos[7].g, this.coloresFondos[7].b, 7, 148, 223, 490, 514);

                this.generarObra(this.coloresFondos[8].r, this.coloresFondos[8].g, this.coloresFondos[8].b, 8, 272, 236, 700, 500);

                this.generarObra(this.coloresFondos[9].r, this.coloresFondos[9].g, this.coloresFondos[9].b, 9, 344, 242, 740, 500);

                this.generarObra(this.coloresFondos[10].r, this.coloresFondos[10].g, this.coloresFondos[10].b, 10, 491, 310, 704, 550);
                this.generarPatron(65, [0, 0, 0], 2, 10, 491, 310, 704, 550); // patron 2

                this.generarObra(this.coloresFondos[11].r, this.coloresFondos[11].g, this.coloresFondos[11].b, 11, 140, 344, 480, 550);
                this.generarPatron(65, [0, 250, 125], 1, 11, 140, 344, 480, 550); // patron 1

                this.generarObra(this.coloresFondos[12].r, this.coloresFondos[12].g, this.coloresFondos[12].b, 12, 218, 485, 546, 740);
                this.generarPatron(65, [200, 200, 200], 5, 12, 218, 485, 546, 740); // patron 5

                this.generarObra(this.coloresFondos[13].r, this.coloresFondos[13].g, this.coloresFondos[13].b, 15, 300, 575, 620, 950);
                this.generarPatron(65, [142, 62, 99], 3, 15, 300, 575, 620, 950); // patron 3

                pop();
                break;

            case 1:
                push();
                background(240, 100, 10);

                this.generarObra(this.coloresFondos[14].r, this.coloresFondos[14].g, this.coloresFondos[14].b, 13, 40, 220);
                this.generarPatron(73, [255, 228, 181], 27, 13, 40, 220); // patron 27

                this.generarObra(this.coloresFondos[15].r, this.coloresFondos[15].g, this.coloresFondos[15].b, 12, 80, 50, 900, 600);
                this.generarPatron(65, [220, 20, 60], 15, 12, 70, 40, 900, 600); // patron 15

                this.generarObra(this.coloresFondos[16].r, this.coloresFondos[16].g, this.coloresFondos[16].b, 4, 237, 285, 1120, 1000);
                this.generarPatron(65, [60, 60, 60], 8, 4, 237, 285, 1120, 1000); // patron 8

                this.generarObra(this.coloresFondos[17].r, this.coloresFondos[17].g, this.coloresFondos[17].b, 13, 65, 390, 480, 480);

                this.generarObra(this.coloresFondos[18].r, this.coloresFondos[18].g, this.coloresFondos[18].b, 17, 345, 280, 950, 1380);
                this.generarPatron(65, [255, 118, 206], 6, 17, 345, 280, 950, 1380); // patron 6

                this.generarObra(this.coloresFondos[19].r, this.coloresFondos[19].g, this.coloresFondos[19].b, 12, 165, 510, 600, 900);
                this.generarPatron(65, [217, 237, 191], 14, 12, 165, 510, 600, 900); // patron 14

                this.generarObra(this.coloresFondos[0].r, this.coloresFondos[0].g, this.coloresFondos[0].b, 11, 500, 250, 640, 1500);
                
                this.generarObra(this.coloresFondos[1].r, this.coloresFondos[1].g, this.coloresFondos[1].b, 18, 615, 50, 500, 500);
                this.generarPatron(65, [139, 50, 44], 21, 18, 615, 50, 500, 500); // patron 21

                this.generarObra(this.coloresFondos[2].r, this.coloresFondos[2].g, this.coloresFondos[2].b, 11, 490, 520, 700, 655);
                this.generarPatron(65, [255, 182, 193], 12, 11, 490, 520, 700, 655); // patron 12

                this.generarObra(this.coloresFondos[3].r, this.coloresFondos[3].g, this.coloresFondos[3].b, 15, 165, 430);
                pop();
            break;

            case 2:
                push();
                background(240, 100, 50);

                    
                this.generarObra(this.coloresFondos[7].r, this.coloresFondos[5].g, this.coloresFondos[18].b, 10, 395, 350, 550, 400);
                this.generarPatron(65, [255, 228, 181],36,10, 395, 350, 550, 400); // patron 36

                this.generarObra(this.coloresFondos[13].r, this.coloresFondos[15].g, this.coloresFondos[15].b, 12, 80, 540, 900, 600);
                this.generarPatron(73, [0, 250, 125], 24,12, 80, 540, 900, 600); // patron 24
                
                this.generarObra(this.coloresFondos[3].r, this.coloresFondos[13].g, this.coloresFondos[5].b, 7, 350, 150,800, 600);
                this.generarPatron(73, [139, 50, 44],11, 7, 350, 150,800, 600); // patron 11
                
                this.generarObra(this.coloresFondos[18].r, this.coloresFondos[3].g, this.coloresFondos[14].b, 14, 255, 350,850,800);
                
                //this.generarPatron(65, [220, 20, 60], 17, 12, 70, 40, 900, 600); // patron 17.

                this.generarObra(this.coloresFondos[10].r, this.coloresFondos[16].g, this.coloresFondos[16].b, 4, 70, 270, 1120, 1250);
                this.generarPatron(65, [255, 118, 206], 28, 4, 70, 270, 1120, 1250); // patron 28

                this.generarObra(this.coloresFondos[17].r, this.coloresFondos[17].g, this.coloresFondos[17].b, 13, 450, 560, 480, 480);
                this.generarPatron(65, [255, 118, 206], 25,13, 455, 560, 480, 480); // patron 25
                
                this.generarObra(this.coloresFondos[8].r, this.coloresFondos[13].g, this.coloresFondos[2].b, 18, 380, 50, 400, 500);
                    
                this.generarObra(this.coloresFondos[5].r, this.coloresFondos[0].g, this.coloresFondos[0].b, 11, 360, 10, 850, 150);
                this.generarPatron(65, [70, 130, 180], 19,11, 360, 10, 850, 150); // patron 1
                   
                this.generarObra(this.coloresFondos[19].r, this.coloresFondos[19].g, this.coloresFondos[19].b, 10, 550, 50, 400, 400);
                this.generarPatron(73, [200, 100, 50],17, 10, 550, 50, 400, 400); // patron 17

                this.generarObra(this.coloresFondos[18].r, this.coloresFondos[18].g, this.coloresFondos[18].b, 17, 562, 420, 1820, 1600);

                this.generarObra(this.coloresFondos[2].r, this.coloresFondos[2].g, this.coloresFondos[2].b, 6, 510, 430, 700, 655);

                this.generarObra(this.coloresFondos[12].r, this.coloresFondos[14].g, this.coloresFondos[14].b, 5, 90, 30,400,600);
                pop();
            break;

            case 3:
                push();
                background(240);

                this.generarObra(this.coloresFondos[10].r, this.coloresFondos[10].g, this.coloresFondos[10].b, 11, 318, 340, 770, 850);

                this.generarObra(this.coloresFondos[8].r, this.coloresFondos[8].g, this.coloresFondos[8].b, 8, 492, 250, 700, 505);

                this.generarObra(this.coloresFondos[9].r, this.coloresFondos[9].g, this.coloresFondos[9].b, 9, 564, 255, 740, 525);
                this.generarPatron(65, [0, 0, 0], 30, 9, 564, 255, 740, 525); // patron 30

                this.generarObra(this.coloresFondos[0].r, this.coloresFondos[0].g, this.coloresFondos[0].b, 0, 375, 518, 500, 500);

                this.generarObra(this.coloresFondos[1].r, this.coloresFondos[1].g, this.coloresFondos[1].b, 1, 422, 518, 500, 500);
                this.generarPatron(65, [142, 62, 99], 34, 1, 422, 518, 500, 500); // patron 34

                this.generarObra(this.coloresFondos[2].r, this.coloresFondos[2].g, this.coloresFondos[2].b, 2, 465, 518, 500, 500);

                this.generarObra(this.coloresFondos[3].r, this.coloresFondos[3].g, this.coloresFondos[3].b, 3, 505, 518, 500, 500);

                this.generarObra(this.coloresFondos[4].r, this.coloresFondos[4].g, this.coloresFondos[4].b, 4, 565, 518, 500, 500);
                this.generarPatron(73, [255, 150, 0], 29, 4, 565, 518, 500, 500); // patron 29

                this.generarObra(this.coloresFondos[7].r, this.coloresFondos[7].g, this.coloresFondos[7].b, 10, 80, 223, 490, 514);
                this.generarPatron(73, [255, 140, 0], 4, 10, 80, 223, 490, 514); // patron 7

                this.generarObra(this.coloresFondos[6].r, this.coloresFondos[6].g, this.coloresFondos[6].b, 6, 20, 225, 500, 670);

                this.generarObra(this.coloresFondos[5].r, this.coloresFondos[5].g, this.coloresFondos[5].b, 16, 165, 524, 680, 900);
                this.generarPatron(65, [0, 250, 125], 26, 16, 165, 524, 680, 900); // patron 26

                //this.generarPatron(65, [255, 140, 0], 7, 5, 440, 30, 730, 730); // patron 7
                
                //this.generarPatron(65, [0, 0, 0], 2, 10, 491, 310, 704, 550); // patron 2

                this.generarObra(this.coloresFondos[11].r, this.coloresFondos[11].g, this.coloresFondos[11].b, 13, 324, 156, 1146, 620);
                this.generarPatron(65, [0, 0, 128],10,13, 324, 156, 1146, 620); // patron 31

                this.generarObra(this.coloresFondos[12].r, this.coloresFondos[12].g, this.coloresFondos[12].b, 15, 395, 28, 480, 1820);
                this.generarPatron(73, [70, 130, 180], 22,15, 395, 28, 480, 1820); // patron 22

                //this.generarObra(this.coloresFondos[13].r, this.coloresFondos[13].g, this.coloresFondos[13].b, 15, 300, 575, 620, 950);
                //this.generarPatron(65, [142, 62, 99], 3, 15, 300, 575, 620, 950); // patron 3

                pop();
                break;
        }
    }

    

    cambioObras(){
        if(this.estadoObra==0){
            this.estadoObra=int(random(4));
        }
        else if(this.estadoObra==1){
            this.estadoObra=int(random(4));
        }
        else if(this.estadoObra==2){
            this.estadoObra=int(random(4));
        }
        else if(this.estadoObra==3){
            this.estadoObra=int(random(4));
        }
        
    }
 

    
}