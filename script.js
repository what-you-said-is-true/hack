const container = document.querySelector('.container');
const keys = document.querySelectorAll('.key');
const panda = document.querySelector('.panda');
const eyes = document.querySelectorAll('.eye');
const features = document.querySelectorAll('.feature');
const leftear = document.querySelector('.leftear');
const rightear = document.querySelector('.rightear');
const mouth = document.querySelector('.mouth');

const synth = new Tone.Synth();
const gain = new Tone.Gain(0.5);
gain.toMaster();
synth.connect(gain);

const calcValue = (mouse, width) => {
  return (mouse / width * limit - limit / 2).toFixed(1);
};

const setContainerSize = () => {
  let size = window.innerHeight / 100 * 90;
  if (size > window.innerWidth) {
    size = window.innerWidth / 100 * 90;
  }
  container.style.height = `${size}px`;
  container.style.width = `${size}px`;
};

setContainerSize();


let resizeTimeout;
window.addEventListener('resize', () => {
  if (resizeTimeout) window.cancelAnimationFrame(resizeTimeout);
  resizeTimeout = window.requestAnimationFrame(() => {
    setContainerSize();
  });
}, false);

const limit = 15;
let timeout;
window.addEventListener('mousemove', event => {
  if (timeout) window.cancelAnimationFrame(timeout);

  panda.classList.remove('idle');

  timeout = window.requestAnimationFrame(() => {
    let xValue = calcValue(event.x, window.innerWidth);
    let yValue = calcValue(event.y, window.innerHeight);

    [...features].forEach(feature => {
      feature.style.transform = `translateX(${xValue}px) translateY(${yValue}px)`;
    });

    [...eyes].forEach(eye => {
      eye.setAttribute('ry', '7.5');
      eye.style.transform = `translateX(${xValue * 2}px) translateY(${yValue * 2}px)`;
    });

    leftear.style.transform = `translateX(${-xValue * 0.7}px) translateY(${-yValue * 0.7}px)`;
    rightear.style.transform = `translateX(${-xValue * 0.7}px) translateY(${-yValue * 0.7}px)`;
  });
}, false);
// Game
const celeste = document.getElementById('celeste');
const verde = document.getElementById('verde');
const amarillo = document.getElementById('amarillo');
const mostaza = document.getElementById('mostaza');
const naranja = document.getElementById('naranja');
const rojo = document.getElementById('rojo');
const rosado = document.getElementById('rosado');
const violeta = document.getElementById('violeta');
const btnStart = document.getElementById('btnStart');
const ULTIMO_NIVEL = 10;

class Juego {
    constructor(){
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
    }
    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnStart();
        this.nivel = 1;
        this.colores = {
            celeste,
            verde,
            amarillo,
            mostaza,
            naranja,
            rojo,
            rosado,
            violeta,
        }
    }
    toggleBtnStart(){
        if (btnStart.classList.contains('hide')){
            btnStart.classList.remove('hide')
        }
        else{
            btnStart.classList.add('hide');
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n=> Math.floor(Math.random()*8));
    }
    siguienteNivel(){
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }
    transformarNumeroColor(numero){
        switch (numero){
            case 0 :
                return 'celeste'
            case 1 :
                return 'verde'
            case 2 :
                return 'amarillo'
            case 3 :
                return 'mostaza'
            case 4 :
                return 'naranja'
            case 5 :
                return 'rojo'
            case 6 :
                return 'rosado'
            case 7 :
                return 'violeta'
        }
    }
    transformarColorNumero(color){
        switch (color){
            case 'celeste' :
                return 0
            case 'verde' :
                return 1
            case 'amarillo' :
                return 2
            case 'mostaza' :
                return 3
            case 'naranja' :
                return 4
            case 'rojo' :
                return 5
            case 'rosado' :
                return 6
            case 'violeta' :
                return 7
        }
    }
    iluminarSecuencia(){
        for (var i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.amarillo.addEventListener('click', this.elegirColor);
        this.colores.mostaza.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.rojo.addEventListener('click', this.elegirColor);
        this.colores.rosado.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.amarillo.removeEventListener('click', this.elegirColor);
        this.colores.mostaza.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.rojo.removeEventListener('click', this.elegirColor);
        this.colores.rosado.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
    }
    elegirColor(ev){
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorNumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++;
            if (this.subnivel === this.nivel){
               this.nivel++;
               this.eliminarEventosClick()
               if (this.nivel === (ULTIMO_NIVEL + 1)){
                   this.ganoJuego();
               }
               else{
                   setTimeout(this.siguienteNivel, 1500);
               }

            }
        }
        else{
            this.perdioJuego();
        }
    }
    ganoJuego(){
        swal('Bear says:', 'Felicitaciones, ganaste el juego!', 'success')
        .then(() => this.inicializar())
    }
    perdioJuego(){
        swal('Bear says:', 'Lo siento, perdiste el juego!', 'error')
        .then( () => {
            this.eliminarEventosClick()
            this.inicializar()}
        )
    }
}
function empezarJuego(){
    var juego = new Juego();
    console.log(juego);
}