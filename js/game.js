//CONSTANTES;
FILAS = 10;
COLUMNAS =10;
TAMANIO=FILAS*COLUMNAS;

BARCO_S=1;//4
BARCO_M=2;//3
BARCO_L=3;//2
BARCO_XL=4;//1

NUMBARCOSTOTALES=10;

ARRAY = new Array();
ARRAYIMAGENES = new Array();

ARRAYBARCOSINDIVIDUAL = new Array();
numeroBarco=1;

clickDado=0;

/*
function start()-> Funcion principal que se ejecuta
al pulsar el boton start

*/


function start(){
	recogerNombres()
	jugador1Capa();//Crea la capa del jugador uno (ver js de Interfaz)

	eliminarCapas();//Elimina las capas de la pantalla de inicio (ver js de Interfaz)
	genenarCapas();//Genera el tablero(ver js de Interfaz)
	
	comenzarJuego();//Comienza la logica del juego
	//ponerImagenBarco();//De momento pone directamente las imagens MODIFICAR AL HACER CLIK
	jugador2Capa();
	
	marcadorJ1();
	marcadorJ2();
	empezarTurnos();
	
}

/*
inicializarArrays()-> Inicializa 2 arrays
ARRAY 1º-> rellena del 1 - 100, con este array se sacan los aleatorios
y se borran las "casillas" ya utilizadas

ARRAY 1º->Rellenara un array con los Strings de las imagenes

*/

function inicializarArrays(){
	for (i=1;i<=TAMANIO;i++){
		ARRAY[i]=""+i;
		ARRAYIMAGENES[i]="agua";
		}	
}




//Funcion principal al iniciar el juego
function comenzarJuego(){
	
	inicializarArrays();//Se inicializan los arrays
	tamanioBarco = BARCO_XL;//Empezamos con un tamaño de barco de 4
	NUMBARCOSTOTALES=10;
	while(NUMBARCOSTOTALES!=0){//Hasta que no haya añadido todos los barcos
		direccion =  Math.floor(Math.random() * (5 - 1)) + 1;	//Numero aleatorio para la direccion
		numAleatorio = generarAleatorio();//Asigana el numero aleatorio a traves del array
		/*
			Al ir borrando el array para no repetir los numeros, comparamos el contenido
			con "undefined" lo que significa que ese indice ha sido borrado, por lo que
			lo ignoramos con un continue para que vuelva a empezar el bucle y busque otro 
			numero
			
			Si esta solapado también le indicamos que vuelva al buvle y busque otro numero 
			
		*/
		
		if(numAleatorio == undefined)continue;		
		if(numSolapados(numAleatorio,direccion)==true)continue;//Si se solapan vuelve al bucle

		console.log("He generado el numero "+numAleatorio);	
		
		indicarTamanioBarco(NUMBARCOSTOTALES);//Metodo que cambia el tamaño del barco segun los barcos que falten por marcar
		
		switch (direccion){
			//Izquierda
			case 1:
			
			if(numAleatorio>=FILAS){
				numComprobar = numAleatorio%FILAS;
				console.log("El numero casteado es  "+ numComprobar);
				
				}else numComprobar=numAleatorio;
				
			if(numComprobar>tamanioBarco){//Puedo hacerlo			
					indicarArrayImagenes(numAleatorio,'iz',tamanioBarco);
					NUMBARCOSTOTALES--;
				}
			break;
			
			//Derecha
			case 2:
				if(numAleatorio>=FILAS){
				numComprobar = numAleatorio%FILAS;
				console.log("El numero casteado es  "+ numComprobar);
				
				}else numComprobar=numAleatorio;
				//Problemas con 100 y al ser 40/30/20...
				if((numComprobar+tamanioBarco-1)<=10 && numAleatorio!=100 &&numAleatorio%10!=0){//Puedo hacerlo
					indicarArrayImagenes(numAleatorio,'de',tamanioBarco);
					NUMBARCOSTOTALES--;
				}
			
			break;
			
			
			//Arriba
			case 3:
				//numComprobar=numAleatorio+10;
				if(numAleatorio-(FILAS*tamanioBarco)<0 ){

				}else{
					
					indicarArrayImagenes(numAleatorio,'up',tamanioBarco);
					console.log(numAleatorio);
					NUMBARCOSTOTALES--;
					}
			break;
			//Abajo
			case 4:
			
			if((numAleatorio-FILAS)+(FILAS*tamanioBarco)>TAMANIO){
					
				}else{
					
					indicarArrayImagenes(numAleatorio,'down',tamanioBarco);
					NUMBARCOSTOTALES--;
					}
			
			break;
			
			
			
			
			
			
		
		}
	console.log("Quedan los siguientes casos"+NUMBARCOSTOTALES);
	}
}

function generarAleatorio(){
	indice = Math.floor(Math.random()*ARRAY.length);
	number = ARRAY[indice];
	return number;
	
}

/*

Se llama a esta funcion si es posible "pintar el barco" recibe la 
posion del barco, su direccion y el ramaño del barco


*/
function indicarArrayImagenes(pos,direc,tamanioBa){
	clickDados="-1";
	posInicial=pos;
	console.log(pos);
	switch (direc){
		//Izquierda-> Restara las casillas a la izquierda
		case "iz":
			pos++;//Reajuste para que coja el propio numero
			for(var i=0;i<tamanioBa;i++){
					pos--;				
					//Generamos un String que nos ayudará a coger la imagen correspodiente y 
					//lo añadimos al array de imagenes
					ARRAYIMAGENES[pos]="iz,"+tamanioBarco+","+i+","+numeroBarco;//Array de imagenes
					ARRAYBARCOSINDIVIDUAL[pos]=tamanioBarco+","+numeroBarco+","+clickDado+","+pos;
					//ARRAY.splice(pos, 1);//Para borrar el numero
					delete ARRAY[pos];//Borramos la posicion para que no puedan salir como posiciones aleatorias
				}
		
		numeroBarco++;
		break;
		//Derecha -> Sumara las casillas a la derecha 
		case "de":
			pos--;
			for(var i=0;i<tamanioBa;i++){
					pos++;
					ARRAYIMAGENES[pos]="de,"+tamanioBarco+","+i+","+numeroBarco;//Array de imagenes
					ARRAYBARCOSINDIVIDUAL[pos]=tamanioBarco+","+numeroBarco+","+clickDado+","+pos;

					delete ARRAY[pos];
				}
		
		
		numeroBarco++;
		break;
		//Arriba -> Resta las casillas con un incremento de 10
		case "up":
			posInt = parseInt(pos);
			posInt+=FILAS;
			for(var i=0;i<tamanioBa;i++){
					posInt-=FILAS;
					ARRAYIMAGENES[posInt]="up,"+tamanioBarco+","+i+","+numeroBarco;//Array de imagenes
					ARRAYBARCOSINDIVIDUAL[posInt]=tamanioBarco+","+numeroBarco+","+clickDado+","+posInt;

					delete ARRAY[posInt];
				}
		
		numeroBarco++;
		break;
		//Abajo ->Suma las casillas con un incremento de 10
		case "down":
			posInt = parseInt(pos);
			posInt-=FILAS;
			for(var i=0;i<tamanioBa;i++){
					posInt+=FILAS;
					ARRAYIMAGENES[posInt]="down,"+tamanioBarco+","+i+","+numeroBarco;//Array de imagenes
					ARRAYBARCOSINDIVIDUAL[posInt]=tamanioBarco+","+numeroBarco+","+clickDado+","+posInt;
					delete ARRAY[posInt];
				}
		
		numeroBarco++;
		break;
		
		
	
	}
}

/*
	Dependiendo del numero de barcos pintados asigna un tamaño y otro
*/
function indicarTamanioBarco(tmanioTo){
	switch (tmanioTo){
		
		case 9:
		tamanioBarco = BARCO_L;
		numeroBarco=1;
		break;
		
		case 7:
		tamanioBarco = BARCO_M;
		numeroBarco=1;
		break;
		
		case 4:
		tamanioBarco = BARCO_S;
		numeroBarco=1;
		break;
		
		
	}
	
}



