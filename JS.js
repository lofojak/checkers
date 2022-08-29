var C = new Array();
var Wcoord = new Array();
var Bcoord = new Array();
var step = -1;
var Length = 8;

function isOnBoard(id, WhatisCheck) {
	if (WhatisCheck === "cell") {
		if ((id[0] < Length) && (id[1] < Length)) {
			if ((id[0] % 2) + (id[1] % 2) === 1) 	{return "Black";} 
			else 									{return "White";}
		}
		else {return undefined;}
	}
	else if (WhatisCheck === "checker") {

	}
}

function SearchArr(Arr1, Arr2) {
	var ret = -1;
	for (var i = 0; i < Arr1.length; i++) {
		if ((Arr1[i][0] == Arr2[0]) && (Arr1[i][1] == Arr2[1])) {
			ret = i;
			break;
		}
	}
	return ret;
}

function Table() {
	//Length = prompt();
	document.write('<table name="Set"> <tbody>');
	for (var i = 0; i < Length; i++) {
		document.write('<tr>');
		for (var j = 0; j < Length; j++) {
			document.write('<td> <div class="Section' + (((i + j) % 2 === 0) ? "W" : "B") + '" id="C:' + i + ' ' + j  + '" onclick="Click([' + i + ', '+ j + '])"> </div> </td>');
		}
		document.write('</tr>');
	}
	document.write('</tbody> </table>');
}

function init() {
	for (var i = 0; i < Length; i++) {
		C[i] = new Array();
		for (j = 0; j < Length; j++ ) {
			C[i].push(document.getElementById('C:' + i + ' ' + j));
		}
	}
}

function draw() {
	C.forEach(i =>{
		i.forEach(j => {
			var id = [parseInt(j.id.substring(2, j.id.indexOf(' '))), parseInt(j.id.substring(j.id.indexOf(' ')))];
			if (~SearchArr(Wcoord, id)) {
				C[id[0]][id[1]].innerHTML = "<div class='PeshkaW'></div>";
			}
			if (~SearchArr(Bcoord, id)) {
				C[id[0]][id[1]].innerHTML = "<div class='PeshkaB'></div>";
			}
		});
	});
}

function Start() {
	step = 0;
	var i = new Array(0, 0);
	while (Bcoord.length < (Length - 2) * Length / 4) {
		if (isOnBoard(i, "cell") === "Black") {
			Bcoord.push(i.slice());
		}
		i[1]++;
		if (i[1] > Length) {
			i[1] = 0;
			i[0]++;
		}
	} 

	i[0] = Length;
	i[1] = 0;
	while (Wcoord.length < (Length - 2) * Length / 4) {
		if (isOnBoard(i, "cell") === "Black") {
			Wcoord.push(i.slice());
		}
		i[1]++;
		if (i[1] > Length) {
			i[1] = 0;
			i[0]--;
		}
	}
	draw();
}

function isCellFree(point) {
	if (point.length === 2)	 {
		if (SearchArr(Wcoord, point) >= 0) {
			return false;
		}
		else if (SearchArr(Bcoord, point) >= 0) {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		console.log('Error')
		return undefined;
	}
}

function isCanStep(Pervpoint, nextpoint, isWhite) {
	if (isWhite) {
		if ((Pervpoint[0] - nextpoint[0] == 1) && (Math.abs(Pervpoint[1] - nextpoint[1]) == 1) && isCellFree(nextpoint)) {
			return true;
		}
		else {
			return false;
		}
	}	// отсекаем ходы назад
	else {
		if ((nextpoint[0] - Pervpoint[0] == 1) && (Math.abs(Pervpoint[1] - nextpoint[1]) == 1) && isCellFree(nextpoint)) {
			return true;
		}
		else {
			return false;
		}
	}
}


function isCanBit(Pervpoint, mediumpoint, nextpoint) {

	if ((SearchArr(Wcoord, Pervpoint) >= 0) && (SearchArr(Bcoord, mediumpoint) >= 0) && isCellFree(nextpoint)) {
		return true;
	}
	else if ((SearchArr(Bcoord, Pervpoint) >= 0) && (SearchArr(Wcoord, mediumpoint) >= 0) && isCellFree(nextpoint)) {
		return true;
	}
	else {
		return false;
	}
}

var Pervpoint;

function Click(ClicledPoint) {
	if (step >= 0) {
		if (step % 2 === 0) { 				// Ход белых
			if (Pervpoint === undefined) {					// Этап выбора шашки, которая будет делать ход
				if (SearchArr(Wcoord, ClicledPoint) === -1) {
					console.log('Clicked to not white checker!');
				}
				else {
					console.log("Move from " + ClicledPoint);
					Pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div class='PeshkaW PeshkaWClicked'><div>";
				}
			}
			else {											// Этап выбора пути, куда будет делать ход шашка
				if (~SearchArr(Wcoord, ClicledPoint)) {						// Случай перевыбора
					console.log("Move from " + ClicledPoint);
					C[Pervpoint[0]][Pervpoint[1]].innerHTML = "<div class='PeshkaW'><div>";
					Pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaW PeshkaWClicked'><div>";
				}
				else if (isCanStep(Pervpoint, ClicledPoint, true)) {		// Случай хода
					console.log("to " + ClicledPoint + " is done!");
					C[Pervpoint[0]][Pervpoint[1]].innerHTML = "";
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div class='PeshkaW'><div>";
					Wcoord.splice(SearchArr(Wcoord, Pervpoint), 1, ClicledPoint);
					step++;
					Pervpoint = undefined;
				}
				else {
					var directon = new Array();
					if (ClicledPoint[0] > Pervpoint[0])	{directon[0] = 1;}
					else 								{directon[0] = -1;}
					if (ClicledPoint[1] > Pervpoint[1])	{directon[1] = 1;}
					else 								{directon[1] = -1;}
					var nextpoint = [Pervpoint[0] + 2 * directon[0], Pervpoint[1] + 2 * directon[1]];
					if ((Math.abs(ClicledPoint[0] - Pervpoint[0]) <= Math.abs(2* directon[0])) &&
						(Math.abs(ClicledPoint[1] - Pervpoint[1]) <= Math.abs(2* directon[1]))) {
																				// Случай сруба вражеской пешки
						if (isCanBit(Pervpoint, [Pervpoint[0] + 	directon[0], Pervpoint[1] +		directon[1]],
												[Pervpoint[0] + 2 *	directon[0], Pervpoint[1] + 2 * directon[1]]))
						{
							console.log("yes");
							Wcoord[SearchArr(Wcoord, Pervpoint)] = nextpoint;
							Bcoord.splice(SearchArr(Bcoord, [Pervpoint[0] + directon[0], Pervpoint[1] + directon[1]]), 1);
							C[nextpoint[0]][nextpoint[1]].innerHTML = "<div class='PeshkaW'><div>";
							C[Pervpoint[0] + directon[0]][Pervpoint[1] + directon[1]].innerHTML = "";
							C[Pervpoint[0]][Pervpoint[1]].innerHTML = "";
							Pervpoint = undefined;
							step++;
						}
					}
					else {											
						alert('Так нельзя ходить');
					}
				}
			}
		}
		else {								// Ход чёрных
			if (Pervpoint === undefined) {					// Этап выбора шашки, которая будет делать ход
				if (SearchArr(Bcoord, ClicledPoint) === -1) {
					console.log('Clicked to not black checker!');
				}
				else {
					console.log("Move from " + ClicledPoint);
					Pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
				}
			}
			else {									// Этап выбора пути хода шашки
				if (~SearchArr(Bcoord, ClicledPoint)) {				// Случай перевыбора
					C[Pervpoint[0]][Pervpoint[1]].innerHTML = "<div Class='PeshkaB'><div>";
					Pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
				}
				else if (isCanStep(Pervpoint, ClicledPoint)) { 				// Случай хода
					C[Pervpoint[0]][Pervpoint[1]].innerHTML = "";
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB'><div>";
					Bcoord.splice(SearchArr(Bcoord, Pervpoint), 1, ClicledPoint);
					step++;
					Pervpoint = undefined;
				}
				else {
					var directon = new Array();
					if (ClicledPoint[0] > Pervpoint[0])	{directon[0] = 1;}
					else 								{directon[0] = -1;}
					if (ClicledPoint[1] > Pervpoint[1])	{directon[1] = 1;}
					else 								{directon[1] = -1;}
					var nextpoint = [Pervpoint[0] + 2 * directon[0], Pervpoint[1] + 2 * directon[1]];
					if ((Math.abs(ClicledPoint[0] - Pervpoint[0]) <= Math.abs(2* directon[0])) &&
						(Math.abs(ClicledPoint[1] - Pervpoint[1]) <= Math.abs(2* directon[1]))) {
																				// Случай сруба вражеской пешки
						if (isCanBit(Pervpoint, [Pervpoint[0] + 	directon[0], Pervpoint[1] +		directon[1]],
												[Pervpoint[0] + 2 *	directon[0], Pervpoint[1] + 2 * directon[1]]))
						{
							console.log("yes");
							Bcoord[SearchArr(Bcoord, Pervpoint)] = nextpoint;
							Wcoord.splice(SearchArr(Wcoord, [Pervpoint[0] + directon[0], Pervpoint[1] + directon[1]]), 1);
							C[nextpoint[0]][nextpoint[1]].innerHTML = "<div class='PeshkaB'><div>";
							C[Pervpoint[0] + directon[0]][Pervpoint[1] + directon[1]].innerHTML = "";
							C[Pervpoint[0]][Pervpoint[1]].innerHTML = "";
							Pervpoint = undefined;
							step++;
						}
					}
					else {											
						alert('Так нельзя ходить');
					}
				}
			}
		}
	}
	else {
		Start();
	}
}