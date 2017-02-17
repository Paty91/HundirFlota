puntuacionGlobal=30;

puntuacionP2=0;
puntuacionP1=0;

puntosJ1=1;
puntosJ2=1;

incremento=0;
turnoActual="";
turnoJ1="turnoJ1";
turnoJ2="turnoJ2";

capaActiva=false;


function empezarTurnos(){
	
	puntuacion1 = document.getElementById('pt1');
	puntuacion2 = document.getElementById('pt1');
	
	jugador1=document.getElementById('jugador1');
	jugador2=document.getElementById('jugador2');
	
	
	turnoAleatorio();
	cambiarImagenes(turnoActual);
	colorNombreJugador(turnoActual);
}


function turnoAleatorio(){
	turnoAleatorio =  Math.floor(Math.random() * (2));	//Numero aleatorio para la direccion
	if(turnoAleatorio==0){
	  turnoActual=turnoJ1;		
	}else{
		turnoActual = turnoJ2;
		}
}



function cambiarImagenes(turno){
	var urlString;
	switch (turno){
		case "turnoJ1":
		urlString = 'url(image/interfaz/J1.gif)';
		urlStringPng = 'url(image/interfaz/JUGADOR2PNG.png)';
		jugador1.style.backgroundImage=urlString;
		jugador2.style.backgroundImage=urlStringPng;

		break;
		
		case "turnoJ2":
		urlString = 'url(image/interfaz/J2.gif)';
		urlStringPng = 'url(image/interfaz/JUGADOR1PNG.png)';
		jugador2.style.backgroundImage=urlString;
		jugador1.style.backgroundImage=urlStringPng;

		break;	
	}
}


 function levantarTablero(elemento){

	 
	if(ARRAYIMAGENES[elemento.id]!="agua"){//Si hay un barco

			document.getElementById(elemento.id).removeAttribute("onclick");			
			//Animacion de explosion
			posIzq = elemento.offsetLeft;
			posTop = elemento.offsetTop;
			generarExplo(posIzq,posTop);
			

			elemento.style.backgroundImage="url(image/barcos/destruido.png)";//Le pongo la imagen de hundido
			
			sumarPuntos(turnoActual);
				
		
			
			
			cadenaCortada = ARRAYBARCOSINDIVIDUAL[elemento.id].split(",");//Array generico
			cadenaCortada[3] = elemento.id//Asigno la posicion marcada
			
			numBarcoIndividual=cadenaCortada[1];			
			//Le sumare los clicks a todas las casillas que contengan el tmanio del barco y el identificador del baroc iguales
			for (i=0;i<=ARRAYBARCOSINDIVIDUAL.length;i++){
				if(ARRAYBARCOSINDIVIDUAL[i] == undefined)continue;
				cadenaCortadaBarcoGeneral = ARRAYBARCOSINDIVIDUAL[i].split(",");
				cadenaCortadaClick = ARRAYBARCOSINDIVIDUAL[elemento.id].split(",");
				if(cadenaCortadaBarcoGeneral[1] == cadenaCortadaClick[1] 
				&& cadenaCortadaBarcoGeneral[0] == cadenaCortadaClick[0] ){//Si es el mismo tipo de barco
							
					var cadenaFor = ARRAYBARCOSINDIVIDUAL[i].split(",");
					
					incrementoActual=parseInt(cadenaFor[2]);
					clicksTotales = 1 + incrementoActual;
					///Modificamos el array
					ARRAYBARCOSINDIVIDUAL[i]=cadenaFor[0]
											+","+cadenaFor[1]
											+","+clicksTotales
											+","+cadenaFor[3];
					var modificado = ARRAYBARCOSINDIVIDUAL[i].split(",");
					if(modificado[0]==modificado[2]){//Si el tamaño del barco es igual al numero de clicks
					levantarImagenBarco(modificado[0],modificado[1]);
					sumarPuntos(turnoActual);
					break;
					}
				}
				
				

			}
			comprobarGanador();

		}else{//Las imagenes restantes serán todas de agua
			var urlagua = 'url(image/barcos/agua.jpg)';
			document.getElementById(elemento.id).style.backgroundImage=urlagua;
			
			if(turnoActual==turnoJ1){
				turnoActual=turnoJ2;
			}else{turnoActual=turnoJ1;}
			
			colorNombreJugador(turnoActual);
			cambiarImagenes(turnoActual);
			document.getElementById(elemento.id).removeAttribute("onclick");			

		}	
			
	//removeEvent(elemento,'click',this); 		
	
}


function generarExplo(posI,posT){
	var explo =document.createElement("div");
	explo.className="explo";
	explo.style.top=posT-25+"px";
	explo.style.left=posI+308+"px";
	explo.style.backgroundImage="url(image/interfaz/explo.gif)" ;

	document.body.appendChild(explo);
	
	
	timer = setTimeout(function(){ 

	document.body.removeChild(explo); }, 1100);


}


function animarPuntacion(idPuntuacion){
setInterval(function(){
	$(idPuntuacion).addClass('magictime puffIn');
	},50);
	
}


function sumarPuntos(turno){
		switch (turno){
			
		case "turnoJ1":
		document.getElementById("puntuacionP1").innerHTML=puntosJ1++		
		animarPuntacion("#puntuacionP1");
		$("#puntuacionP1").removeClass("magictime puffIn");//Se tiene que borrar la clase para que se vuelva a repetir
		break;
		
		case "turnoJ2":
		document.getElementById("puntuacionP2").innerHTML=puntosJ2++
		animarPuntacion("#puntuacionP2");
		$("#puntuacionP2").removeClass("magictime puffIn");//Se tiene que borrar la clase para que se vuelva a repetir


		break;	
	}
}


function comprobarGanador(){
		 
	var ppuntosJ1 = document.getElementById("puntuacionP1").innerText;
	var ppuntosJ2 = document.getElementById("puntuacionP2").innerText;
	var puntosActuales = parseInt(ppuntosJ1) + parseInt(ppuntosJ2);

	if(puntosActuales==puntuacionGlobal && parseInt(ppuntosJ1)>parseInt(ppuntosJ2)){
		mostrarPantallaGanador("jugador1")
		}else if(puntosActuales==puntuacionGlobal && parseInt(ppuntosJ2)>parseInt(ppuntosJ1)){
			mostrarPantallaGanador("jugador2")
			}else if (puntosActuales==puntuacionGlobal && parseInt(ppuntosJ2)==parseInt(ppuntosJ1)){
				mostrarPantallaGanador("empate")
			}
	
}

function interfazGanador(idJugador,claseJugador){		
		capaTexto = document.createElement("div");
		capaImagen = document.createElement("div");
		capaImagen.className=claseJugador;
		capaTexto.className="capaGanador";
		stringN=document.getElementById(idJugador).innerHTML;
		txtGanador = document.createElement("h2");
		txtGanador.className="nombreGanador";
		texto = document.createTextNode(stringN);
		document.body.appendChild(capaTexto);
		document.body.appendChild(capaImagen);
		capaTexto.appendChild(txtGanador);
		txtGanador.appendChild(texto);
}

function interfazEmpate(claseJugador){		
		capaTexto = document.createElement("div");
		capaTexto.className=claseJugador;
		txtGanador = document.createElement("h2");
		txtGanador.className="nombreGanador";
		texto = document.createTextNode("Empate");
		document.body.appendChild(capaTexto);
		capaTexto.appendChild(txtGanador);
		txtGanador.appendChild(texto);
}

function anadirBotonReiniciar(){
	capaReiniciar = document.createElement("div");
	capaReiniciar.className="reiniciar";
	capaReiniciar.setAttribute("onClick","reiniciar()");
	document.body.appendChild(capaReiniciar);	
}

function reiniciar(){
	location.reload();//Recarga la pagina

}

function mostrarPantallaGanador(ganador){
	
	$('#conteneddorCasillas').remove();
	
	switch (ganador){
		
		case "jugador1":
				var stringJ="turnoJ1";
				cambiarImagenes(stringJ);
				interfazGanador("n1","ganadorJugador1");
				anadirBotonReiniciar();

		break;
		
		case "jugador2":
				stringJ="turnoJ2";
				cambiarImagenes(stringJ);
				interfazGanador("n2","ganadorJugador2")
				anadirBotonReiniciar();

		break;
		
		
		case "empate":
				interfazEmpate("empate")
				anadirBotonReiniciar();

		
		break;
		
		
		
		}
	
	
}


function colorNombreJugador(turno){
	switch (turno){

	case "turnoJ1":
		document.getElementById("n1").className="seleccionado";
		document.getElementById("n2").className="noseleccionado";

		break;
		
		case "turnoJ2":
		document.getElementById("n2").className="seleccionado";
		document.getElementById("n1").className="noseleccionado";
		break;	
	}
}



function levantarImagenBarco(tmanioB,identificadorB){
	//Recorremos el array completo
	for(var i=0;i<ARRAYIMAGENES.length;i++){
		if(ARRAYIMAGENES[i] == undefined)continue;//Evitamos el error al asignar los ids de las capas
	

		var cadenaCortada = ARRAYIMAGENES[i].split(",");
		if(cadenaCortada[1]==tmanioB && cadenaCortada[3]==identificadorB){

			switch (cadenaCortada[0]){
				
				case "de":
				// Corresponde al tamaño del barco-> cadenaCortada[1]
				// Corresponde a la parte de la que se compone la imagen (0-1-2-3)
				// Por lo que las imagenes se llaman tamañodelbarco + partedelbarco
				// Es decir el nombre de la imgen de la ultima parte de un barco de 4 sera -> 43(empieza por 0)
				var urlString = 'url(image/barcos/' + cadenaCortada[1] +cadenaCortada[2]+ '.gif)';
				document.getElementById(i).className="rot0";//Esta clase corresponde a la rotacion
				document.getElementById(i).style.backgroundImage=urlString;//Asignamos el url de la imagen
				break;
				
				case "iz":
				//clase tot180 -> gira 180 grados la imagen
				var cadenaCortada = ARRAYIMAGENES[i].split(",");
				var urlString = 'url(image/barcos/' + cadenaCortada[1] +cadenaCortada[2]+ '.gif)';
				document.getElementById(i).className="rot180";
				document.getElementById(i).style.backgroundImage=urlString;
				break;
				
				case "down":
				//clase tot90 -> gira 90 grados la imagen
				var cadenaCortada = ARRAYIMAGENES[i].split(",");
				var urlString = 'url(image/barcos/' + cadenaCortada[1] +cadenaCortada[2]+ '.gif)';
				document.getElementById(i).className="rot90";
				document.getElementById(i).style.backgroundImage=urlString;
				break;
				
				
				case "up":
				var cadenaCortada = ARRAYIMAGENES[i].split(",");
				var urlString = 'url(image/barcos/' + cadenaCortada[1] +cadenaCortada[2]+ '.gif)';
				document.getElementById(i).className="rot270";
				document.getElementById(i).style.backgroundImage=urlString;
				break;
				
			}

	

		
		}
	}
	
}





