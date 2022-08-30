var C = new Array();
var Wcoord = new Array();
var Bcoord = new Array();
var step = -1;
var NumberCell = 8;
var Pervpoint;

function isOnBoard(id, WhatisCheck) {
	if (WhatisCheck === "cell") {
		if ((id[0] < NumberCell) && (id[1] < NumberCell)) {
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
	//NumberCell = prompt();
	document.write('<table name="Set"> <tbody>');
	for (var i = 0; i < NumberCell; i++) {
		document.write('<tr>');
		for (var j = 0; j < NumberCell; j++) {
			document.write('<td> <div class="Section' + (((i + j) % 2 === 0) ? "W" : "B") + '" id="C:' + i + ' ' + j  + '" onclick="Click([' + i + ', '+ j + '])"> </div> </td>');
		}
		document.write('</tr>');
	}
	document.write('</tbody> </table>');
}

function init() {
	for (var i = 0; i < NumberCell; i++) {
		C[i] = new Array();
		for (j = 0; j < NumberCell; j++ ) {
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
			else if (~SearchArr(Bcoord, id)) {
				C[id[0]][id[1]].innerHTML = "<div class='PeshkaB'></div>";
			}
			else {
				C[id[0]][id[1]].innerHTML = "<div> </div>"
			}
			
		});
	});
	if (Pervpoint != undefined) {
		if (SearchArr(Wcoord, Pervpoint) >= 0) {
			C[Pervpoint[0]][Pervpoint[1]].innerHTML = "<div class='PeshkaW PeshkaWClicked'><div>";
		}
		if (SearchArr(Bcoord, Pervpoint) >= 0) {
			C[Pervpoint[0]][Pervpoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
		}
	}
}

function Start() {
	step = 0;
	var i = new Array(0, 0);
	while (Bcoord.length < (NumberCell - 2) * NumberCell / 4) {
		if (isOnBoard(i, "cell") === "Black") {
			Bcoord.push(i.slice());
		}
		i[1]++;
		if (i[1] > NumberCell) {
			i[1] = 0;
			i[0]++;
		}
	} 

	i[0] = NumberCell;
	i[1] = 0;
	while (Wcoord.length < (NumberCell - 2) * NumberCell / 4) {
		if (isOnBoard(i, "cell") === "Black") {
			Wcoord.push(i.slice());
		}
		i[1]++;
		if (i[1] > NumberCell) {
			i[1] = 0;
			i[0]--;
		}
	}
	draw();
}

function isCellFree(point) {
	if (point.length === 2)	 {
		if ((point[0] >= NumberCell) || (point[1] >= NumberCell) || (point[0] < 0) || (point[1] < 0)) {
			return false;
		}
		else if (SearchArr(Wcoord, point) >= 0) {
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

function isCanBitMore(Cell, isWhite) {
	if (isWhite) {
		if (SearchArr(Bcoord, [Cell[0]+1, Cell[1]+1]) >= 0) {
			if (isCellFree([Cell[0]+2, Cell[1]+2])) {
				return true;
			}
		}
		else if (SearchArr(Bcoord, [Cell[0]+1, Cell[1]-1]) >= 0) {
			if (isCellFree([Cell[0]+2, Cell[1]-2])) {
				return true;
			}
		}
		else if (SearchArr(Bcoord, [Cell[0]-1, Cell[1]+1]) >= 0) {
			if (isCellFree([Cell[0]-2, Cell[1]+2])) {
				return true;
			}
		}
		else if (SearchArr(Bcoord, [Cell[0]-1, Cell[1]-1]) >= 0) {
			if (isCellFree([Cell[0]-2, Cell[1]-2])) {
				return true;
			}
		}
		else {return false;}
	}
	else {
		if (SearchArr(Wcoord, [Cell[0]+1, Cell[1]+1]) >= 0) {
			if (isCellFree([Cell[0]+2, Cell[1]+2])) {
				return true;
			}
		}
		else if (SearchArr(Wcoord, [Cell[0]+1, Cell[1]-1]) >= 0) {
			if (isCellFree([Cell[0]+2, Cell[1]-2])) {
				return true;
			}
		}
		else if (SearchArr(Wcoord, [Cell[0]-1, Cell[1]+1]) >= 0) {
			if (isCellFree([Cell[0]-2, Cell[1]+2])) {
				return true;
			}
		}
		else if (SearchArr(Wcoord, [Cell[0]-1, Cell[1]-1]) >= 0) {
			if (isCellFree([Cell[0]-2, Cell[1]-2])) {
				return true;
			}
		}
		else {return false;}
	}
}

function Click(ClicledPoint) {
	if (step >= 0) {
		if (step % 2 === 0) { 				// Ход белых
			if ((Pervpoint === undefined) && (SearchArr(Wcoord, ClicledPoint) >= 0)) {		// Этап выбора шашки, которая будет делать ход
				Pervpoint = ClicledPoint;
				C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div class='PeshkaW PeshkaWClicked'><div>";
			}
			else if (~SearchArr(Wcoord, ClicledPoint)) {									// Случай перевыбора
				C[Pervpoint[0]][Pervpoint[1]].innerHTML = "<div class='PeshkaW'><div>";
				Pervpoint = ClicledPoint;
				C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaW PeshkaWClicked'><div>";
			}
			else if (isCanStep(Pervpoint, ClicledPoint, true)) {							// Случай хода
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
						Wcoord[SearchArr(Wcoord, Pervpoint)] = nextpoint;
						Bcoord.splice(SearchArr(Bcoord, [Pervpoint[0] + directon[0], Pervpoint[1] + directon[1]]), 1);

						C[Pervpoint[0] + directon[0]][Pervpoint[1] + directon[1]].innerHTML = "";
						C[Pervpoint[0]][Pervpoint[1]].innerHTML = "";
						if (!isCanBitMore(nextpoint, true)) {
							Pervpoint = undefined;
							step++;
							C[nextpoint[0]][nextpoint[1]].innerHTML = "<div class='PeshkaW'><div>";
						}
						else {
							Pervpoint = nextpoint;
							C[nextpoint[0]][nextpoint[1]].innerHTML = "<div Class='PeshkaW PeshkaWClicked'><div>";
						}
					}
				}
			}
		}
		else {								// Ход чёрных
			if ((Pervpoint === undefined) && (SearchArr(Bcoord, ClicledPoint) >= 0)) {	// Этап выбора шашки, которая будет делать ход
				Pervpoint = ClicledPoint;
				C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
			}
			else if (~SearchArr(Bcoord, ClicledPoint)) {										// Случай перевыбора
				C[Pervpoint[0]][Pervpoint[1]].innerHTML = "<div Class='PeshkaB'><div>";
				Pervpoint = ClicledPoint;
				C[ClicledPoint[0]][ClicledPoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
			}
			else if (isCanStep(Pervpoint, ClicledPoint, false)) { 								// Случай хода
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
						Bcoord[SearchArr(Bcoord, Pervpoint)] = nextpoint;
						Wcoord.splice(SearchArr(Wcoord, [Pervpoint[0] + directon[0], Pervpoint[1] + directon[1]]), 1);
						C[Pervpoint[0] + directon[0]][Pervpoint[1] + directon[1]].innerHTML = "";
						C[Pervpoint[0]][Pervpoint[1]].innerHTML = "";
						if (!isCanBitMore(nextpoint, false)) {
							Pervpoint = undefined;
							step++;
							C[nextpoint[0]][nextpoint[1]].innerHTML = "<div class='PeshkaB'><div>";
						}
						else {
							Pervpoint = nextpoint;
							C[nextpoint[0]][nextpoint[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
						}
					}
				}
			}
		}
	}
	else {
		Start();
	}
}