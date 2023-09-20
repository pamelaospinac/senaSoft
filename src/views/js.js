
// function nombreH1(){
// let nombreJugador = document.getElementById('nombre-jugador').value;
// let textNombre = document.getElementById('textNombre')

//    textNombre.innerHTML= nombreJugador
// }


let tiempoTerminado;
let intervaloDeTiempo;

function comenzarTiempo(){
    tiempoTerminado = setTimeout(tiempoCumplido, 1000 *30);
    intervaloDeTiempo = setInterval(ticTac, 1000)
    let tiempo= document.getElementById("conteoregresivo").textContent = 30;

    let nombreJugador = document.getElementById('nombre-jugador').value;
    let textNombre = document.getElementById('textNombre')

   textNombre.innerHTML= nombreJugador
}
function ticTac(){
    let tiempo= document.getElementById("conteoregresivo").textContent;

    document.getElementById("conteoregresivo").textContent = tiempo -1;
 }

 function tiempoCumplido(){
    clearInterval(intervaloDeTiempo);
    document.getElementById("conteoregresivo").textContent =0;
    alert('GAME  OVER')
 }
   

window.addEventListener('load', comenzarTiempo)