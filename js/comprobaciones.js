/*
	Esta clase comprueba si al indicar un numero aleatorio al sumarle
	las posicines se solapa con una ya "pintada"


*/
function numSolapados(numAlei,dir){
	isSolapados=false;
	posCas = parseInt(numAlei);
	console.log("Comprobando numeros solapados");	

	switch (dir){
		//Derecha
		case 1:
		for (i=0;i<=tamanioBarco;i++){	
			if(ARRAY[posCas]==undefined){
				console.log("El numero "+posCas+" Se solapa con "+ARRAY[posCas]);	
				isSolapados=true;
			}
			posCas--;

		}
		break;
		//Izquierda
		case 2:
		for (i=0;i<=tamanioBarco;i++){	
			if(ARRAY[posCas]==undefined){
				isSolapados=true;
			}
			posCas++;

		}
		break;
		
		//Arriba
		case 3:
		for (i=0;i<=tamanioBarco;i++){	
			if(ARRAY[posCas]==undefined){
				isSolapados=true;
			}
			posCas-=10;
		}
		break;
		
		//Abajo
		case 4:
		for (i=0;i<=tamanioBarco;i++){	
			if(ARRAY[posCas]==undefined){
				isSolapados=true;
			}
			posCas+=10;
		}
		break;
		
		
	
	
	
	}//Fin switch
	console.log("NUMEROS SOLAPADOS: "+isSolapados);	
	return 	isSolapados;
}
