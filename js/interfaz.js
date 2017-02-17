//Variables
player1="";
player2="";


//Animaciones
function animarPlayer1(){
	
  document.getElementById('player1').src = "image/interfaz/Player1.gif";	
}

function animarPlayer2(){
	
  document.getElementById('player2').src = "image/interfaz/Player2.gif";	
}

//Estructura HTML
function genenarCapas(){
	document.body.className="fondoNegro";
	for (i=1;i<=TAMANIO;i++){
			var capa=document.createElement("div");
			document.getElementById('conteneddorCasillas').appendChild(capa);
			capa.setAttribute("onclick","levantarTablero(this)");
			//capa.setAttribute("onclick","generarExplo(this)");
			capa.id=""+i;
			capa.className="capasJuego";
		}
}

function jugador1Capa(){
	var capaJ=document.createElement("div");
	document.getElementById('contenedorJM1').appendChild(capaJ);
	capaJ.id="jugador1";
	var parrafo = document.createElement('p');
    var texto = document.createTextNode(player1);
    parrafo.appendChild(texto);
	document.getElementById('contenedorJM1').appendChild(parrafo);
	parrafo.id="n1";

            
}

function jugador2Capa(){
	var capaJ=document.createElement("div");
	document.getElementById('contenedorJM2').appendChild(capaJ);
	capaJ.id="jugador2";
	var parrafo = document.createElement('p');
	var texto = document.createTextNode(player2);
    parrafo.appendChild(texto);
	document.getElementById('contenedorJM2').appendChild(parrafo);
	parrafo.id="n2";

}	

function marcadorJ1(){
	var capaM=document.createElement("div");
	document.getElementById('marcadorJ1').appendChild(capaM);
	capaM.className="marcadorPlayer1";
	var h1=document.createElement("h1");
	var texto = document.createTextNode(puntuacionP1);
	h1.id="puntuacionP1";
	h1.appendChild(texto);
	document.getElementById('marcadorJ1').appendChild(h1);
}

function marcadorJ2(){
	var capaM=document.createElement("div");
	document.getElementById('marcadorJ2').appendChild(capaM);
	capaM.className="marcadorPlayer2";
	var h1=document.createElement("h1");
	var texto = document.createTextNode(puntuacionP2);
	h1.appendChild(texto);
	h1.id="puntuacionP2";
	document.getElementById('marcadorJ2').appendChild(h1);

}



//Esta funcion usa JQUERY elimna la capa y todas sus hijas en funcion del id o class

function eliminarCapas(){
	$('.logo').remove();
	$('#boton').remove();
	$('.contenedorPlayers').remove();
}


function recogerNombres(){
	player1 = document.getElementById("p1").value;
	player2 = document.getElementById("p2").value;

}

