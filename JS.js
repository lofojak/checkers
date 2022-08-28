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

function isCanStep(pervpoint, nextpoint, isWhite) {
	if (isWhite) {
		if ((pervpoint[0] - nextpoint[0] == 1) && (Math.abs(pervpoint[1] - nextpoint[1]) == 1)) {
			return true;
		}
		else {
			return false;
		}
	}	// отсекаем ходы назад
	else {
		if ((nextpoint[0] - pervpoint[0] == 1) && (Math.abs(pervpoint[1] - nextpoint[1]) == 1)) {
			return true;
		}
		else {
			return false;
		}
	}
}

var pervpoint;

function Click(ClicledPoint) {
	if (step >= 0) {
		if (step % 2 === 0) { 				// Ход белых
			if (pervpoint === undefined) {					// Этап выбора шашки, которая будет делать ход
				if (SearchArr(Wcoord, ClicledPoint) === -1) {
					console.log('Clicked to not white checker!');
				}
				else {
					console.log("Move from " + ClicledPoint);
					pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div class='PeshkaW PeshkaWClicked'><div>";
				}
			}
			else {									// Этап выбора пути, куда будет делать ход шашка
				if (~SearchArr(Wcoord, ClicledPoint)) {					// Случай перевыбора
					console.log("Move from " + ClicledPoint);
					C[pervpoint[0]][pervpoint[1]].innerHTML = "<div class='PeshkaW'><div>";
					pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaW PeshkaWClicked'><div>";
				}
				else if (~SearchArr(Bcoord, ClicledPoint)) {			// Случай сруба вражеской пешки
					alert('срубил');
				}
				else {										// Случай хода
					if (isCanStep(pervpoint, ClicledPoint, true)) {
						console.log("to " + ClicledPoint + " is done!");
						C[pervpoint[0]][pervpoint[1]].innerHTML = "";
						C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div class='PeshkaW'><div>";;
						Wcoord.splice(SearchArr(Wcoord, pervpoint), 1, ClicledPoint);
						step++;
						pervpoint = undefined;
					}
					else {
						alert('Так нельзя ходить');
					}
				}
			}
		}
		else {								// Ход чёрных
			if (pervpoint === undefined) {					// Этап выбора шашки, которая будет делать ход
				if (SearchArr(Bcoord, ClicledPoint) === -1) {
					console.log('Clicked to not black checker!');
				}
				else {
					console.log("Move from " + ClicledPoint);
					pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
				}
			}
			else {									// Этап выбора пути хода шашки
				if (~SearchArr(Wcoord, ClicledPoint)) {					// Случай сруба 
					alert('срубил');
				}
				else if (~SearchArr(Bcoord, ClicledPoint)) {				// Случай перевыбора
					C[pervpoint[0]][pervpoint[1]].innerHTML = "<div Class='PeshkaB'><div>";
					pervpoint = ClicledPoint;
					C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
				}
				else {										// Случай хода 
					if (isCanStep(pervpoint, ClicledPoint)) {
						C[pervpoint[0]][pervpoint[1]].innerHTML = "";
						C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB'><div>";
						Bcoord.splice(SearchArr(Bcoord, pervpoint), 1, ClicledPoint);
						step++;
						pervpoint = undefined;
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