
let secuenciaMaquina = [];
let secuenciaPlayer = [];
let ronda = 0;



document.querySelector('#botonComienzo').onclick = comenzarJuego;

actualizarEstado('Bienvenido al juego de Simon Dice, clickeá en Empezar para comenzar el juego')
actualizarNumeroRonda('-')
bloquearInputUsuario()

function comenzarJuego(){
    reiniciarJuego();
    manejarRonda()
}

function reiniciarJuego(){
    secuenciaMaquina = []
    secuenciaPlayer = []
    ronda = 0
}


function manejarRonda(){
        actualizarEstado('Replicá el siguiente patrón!')
        bloquearInputUsuario();
    
    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro)

    const retraso_turno_player = (secuenciaMaquina.length + 1) * 1000

    secuenciaMaquina.forEach(function($cuadro, index){
        const retraso_ms = (index + 1) * 1000;
        setTimeout(function(){
            resaltar($cuadro)
        }, retraso_ms)
    })

    setTimeout(function(){
        actualizarEstado('Lo recordas bien? Tu turno!')
        desbloquearInputUsuario()
    }, retraso_turno_player)

    secuenciaPlayer = []
    ronda++
    actualizarNumeroRonda(ronda)
}


function manejarInputUsuario(e){
    const $cuadro = e.target;
    resaltar($cuadro);
    secuenciaPlayer.push($cuadro)
    
    const $cuadroMaquina = secuenciaMaquina[secuenciaPlayer.length - 1]
    
    if($cuadro.id !== $cuadroMaquina.id){
        perder()
        return
    }

    if(secuenciaPlayer.length === secuenciaMaquina.length){
        bloquearInputUsuario()
        setTimeout(manejarRonda, 1000)
    }
}

function desbloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
        $cuadro.onclick = manejarInputUsuario
    })
}


function perder(){
    bloquearInputUsuario()
    actualizarEstado('Perdiste! Tocá "Empezar" para volver a intentarlo!', false)
}

function actualizarNumeroRonda(ronda){
    document.querySelector('#ronda').textContent = ronda
}


function resaltar($cuadro){
    $cuadro.style.opacity = 1
    setTimeout(function(){
        $cuadro.style.opacity = 0.5
    }, 250)
} 



function obtenerCuadroAleatorio(){ //elije un cuadro aleatorio de los 4
    const $cuadros = document.querySelectorAll('.cuadro')
    const indice = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[indice]
}

function bloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
        $cuadro.onclick = function(){
            //funcion vacía para que no haga nada cuando haya input
        }
    })
}

function actualizarEstado(estado, gana = true){
    $estado = document.querySelector('#estado')
    $estado.innerText = estado
    if(!gana){
        $estado.classList.remove('alert-primary')
        $estado.classList.add('alert-danger')
    } else{
        $estado.classList.remove('alert-danger')
        $estado.classList.add('alert-primary')
    }
}




