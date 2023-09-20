let tiempoTerminado;
let intervaloDeTiempo;

function comenzarTiempo(){
    tiempoTerminado = setTimeout(tiempoCumplido, 1000 *30);
    intervaloDeTiempo = setInterval(ticTac, 1000)

    let tiempo= document.getElementById("conteoregresivo").textContent = 30;
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