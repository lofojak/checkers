var C = new Array();
var Wcoord = new Array(); // массив из векторов [int x, int y, boolean isDamka]
var Bcoord = new Array();
var step = -1;
var NumberCell = 8;
var Pickcell;

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

function draw(point) {
	if (point === undefined) {
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
		if (Pickcell != undefined) {
			if (SearchArr(Wcoord, Pickcell) >= 0) {
				C[Pickcell[0]][Pickcell[1]].innerHTML = "<div class='PeshkaW PeshkaWClicked'><div>";
			}
			if (SearchArr(Bcoord, Pickcell) >= 0) {
				C[Pickcell[0]][Pickcell[1]].innerHTML = "<div Class='PeshkaB PeshkaBClicked'><div>";
			}
		}
	}
	else {
		var text;
		var pos = SearchArr(Wcoord, point);
		if (pos >= 0) {
			text = "PeshkaW";
			if (Wcoord[pos][2]) {
				text = "PeshkaW PeshkaWDamki"
			}
		}
		else {
			var pos = SearchArr(Bcoord, point);
			if (pos >= 0) {
				text = "PeshkaB"
				if (Bcoord[pos][2]) {
					text = "PeshkaB PeshkaBDamki"
				}
			}
			else {text = "";}
		}
		if (Pickcell != undefined) {
			if ((Pickcell[0] == point[0]) && (Pickcell[1] == point[1])) {
				if (text == "PeshkaW") {
					text = "PeshkaW PeshkaWClicked";
				}
				if (text == "PeshkaB") {
					text = "PeshkaB PeshkaBClicked";
				}
				if (text == "PeshkaW PeshkaWDamki") {
					text = "PeshkaW PeshkaWDamkiClicked";
				}
				if (text == "PeshkaB PeshkaBDamki") {
					text = "PeshkaB PeshkaBDamkiClicked";
				}
			}
		}
		if (text != "") {
			C[point[0]][point[1]].innerHTML = "<div Class='" + text + "'><div>"
		}
		else {
			C[point[0]][point[1]].innerHTML = "";
		}

	}
}

function Start() {
	step = 0;
	var i = new Array(0, 0, false);
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

function isCanStep(Pickcell, nextpoint, isWhite) {
	if (isWhite) {
		var pos = SearchArr(Wcoord, Pickcell);
		if (Wcoord[pos][2]) {
			if ((Math.abs(Pickcell[0] - nextpoint[0]) == Math.abs(Pickcell[1] - nextpoint[1])) && isCellFree(nextpoint)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if ((Pickcell[0] - nextpoint[0] == 1) && (Math.abs(Pickcell[1] - nextpoint[1]) == 1) && isCellFree(nextpoint)) {
				return true;
			}
			else {
				return false;
			}
		}
	}	// отсекаем ходы назад
	else {
		var pos = SearchArr(Bcoord, Pickcell);
		if (Wcoord[pos][2]) {
			if ((Math.abs(Pickcell[0] - nextpoint[0]) == Math.abs(Pickcell[1] - nextpoint[1])) && isCellFree(nextpoint)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if ((nextpoint[0] - Pickcell[0] == 1) && (Math.abs(Pickcell[1] - nextpoint[1]) == 1) && isCellFree(nextpoint)) {
				return true;
			}
			else {
				return false;
			}
		}
	}
}


function isCanBit(Pickcell, mediumpoint, nextpoint) {

	if ((SearchArr(Wcoord, Pickcell) >= 0) && (SearchArr(Bcoord, mediumpoint) >= 0) && isCellFree(nextpoint)) {
		return true;
	}
	else if ((SearchArr(Bcoord, Pickcell) >= 0) && (SearchArr(Wcoord, mediumpoint) >= 0) && isCellFree(nextpoint)) {
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
			if ((Pickcell === undefined) && (SearchArr(Wcoord, ClicledPoint) >= 0)) {		// Этап выбора шашки, которая будет делать ход
				Pickcell = ClicledPoint;
				draw(ClicledPoint);
			}
			else if (~SearchArr(Wcoord, ClicledPoint)) {									// Случай перевыбора
				var pointbefore = Pickcell;
				Pickcell = ClicledPoint;
				draw(pointbefore);
				draw(ClicledPoint);
			}
			else if (isCanStep(Pickcell, ClicledPoint, true)) {							// Случай хода
				step++;
				Pickcell = Wcoord[(SearchArr(Wcoord, Pickcell))];
				if (ClicledPoint[0] == 0) { // тест на дамку
					Wcoord.splice(SearchArr(Wcoord, Pickcell), 1, [ClicledPoint[0], ClicledPoint[1], true]);
				}
				else {
					Wcoord.splice(SearchArr(Wcoord, Pickcell), 1, [ClicledPoint[0], ClicledPoint[1], Pickcell[2]]);
				}
				draw(Pickcell);
				draw(ClicledPoint);
				Pickcell = undefined;
			}
			else {																		// Проверка случая сруба
				var directon = new Array();
				var Pervpoint = Pickcell.slice();
				if (ClicledPoint[0] > Pervpoint[0])	{directon[0] = 1;}
				else 								{directon[0] = -1;}
				if (ClicledPoint[1] > Pervpoint[1])	{directon[1] = 1;}
				else 								{directon[1] = -1;}
				var posperv = SearchArr(Wcoord, Pervpoint);
				var nextpoint = [Pervpoint[0] + 2 * directon[0], Pickcell[1] + 2 * directon[1]];
				if (((Math.abs(ClicledPoint[0] - Pervpoint[0]) <= Math.abs(2* directon[0])) &&
					(Math.abs(ClicledPoint[1] - Pervpoint[1]) <= Math.abs(2* directon[1]))) || 
					(Wcoord[posperv][2])) {
																								// Случай сруба вражеской пешки
					if (isCanBit(Pickcell, [Pickcell[0] + 	directon[0], Pickcell[1] +		directon[1]],
											[Pickcell[0] + 2 *	directon[0], Pickcell[1] + 2 * directon[1]]))
					{
						Bcoord.splice(SearchArr(Bcoord, [Pickcell[0] + directon[0], Pickcell[1] + directon[1]]), 1); 	// Удаляем срубленную шашку
						Pickcell = Wcoord[(SearchArr(Wcoord, Pickcell))];												// На случай повторного сруба оставляем выбранную клетку в качестве данной
						if (nextpoint[0] == 0) { 																	// тест на дамку
							Wcoord.splice(SearchArr(Wcoord, Pickcell), 1, [nextpoint[0], nextpoint[1], true]);
						}
						else {
							Wcoord.splice(SearchArr(Wcoord, Pickcell), 1, [nextpoint[0], nextpoint[1], Pickcell[2]]);
						}
						if (!isCanBitMore(nextpoint, true)) {
							Pickcell = undefined;
							step++;
						}
						else {
							Pickcell = nextpoint;
						}
						draw(Pervpoint);
						draw([Pervpoint[0] + directon[0], Pervpoint[1] + directon[1]]);
						draw(nextpoint);
					}
				}
			}
		}
		else {								// Ход чёрных
			if ((Pickcell === undefined) && (SearchArr(Bcoord, ClicledPoint) >= 0)) {	// Этап выбора шашки, которая будет делать ход
				Pickcell = ClicledPoint;
				draw(ClicledPoint);
			}
			else if (~SearchArr(Bcoord, ClicledPoint)) {										// Случай перевыбора
				var pointbefore = Pickcell;
				Pickcell = ClicledPoint;
				draw(pointbefore);
				draw(ClicledPoint);
			}
			else if (isCanStep(Pickcell, ClicledPoint, false)) { 								// Случай хода
				Bcoord.splice(SearchArr(Bcoord, Pickcell), 1, ClicledPoint);
				step++;
				draw(Pickcell);
				draw(ClicledPoint);
				Pickcell = undefined;
			}
			else {
				var directon = new Array();
				var Pervpoint = Pickcell.slice();
				if (ClicledPoint[0] > Pickcell[0])	{directon[0] = 1;}
				else 								{directon[0] = -1;}
				if (ClicledPoint[1] > Pickcell[1])	{directon[1] = 1;}
				else 								{directon[1] = -1;}
				var posperv = SearchArr(Bcoord, Pervpoint);
				var nextpoint = [Pickcell[0] + 2 * directon[0], Pickcell[1] + 2 * directon[1]];
				if (((Math.abs(ClicledPoint[0] - Pickcell[0]) <= Math.abs(2* directon[0])) &&
					(Math.abs(ClicledPoint[1] - Pickcell[1]) <= Math.abs(2* directon[1]))) ||
					(Bcoord[posperv][2])) {
																			// Случай сруба вражеской пешки
					if (isCanBit(Pickcell, [Pickcell[0] + 	directon[0], Pickcell[1] +		directon[1]],
											[Pickcell[0] + 2 *	directon[0], Pickcell[1] + 2 * directon[1]]))
					{
						Wcoord.splice(SearchArr(Wcoord, [Pickcell[0] + directon[0], Pickcell[1] + directon[1]]), 1); 
						Pickcell = Bcoord[(SearchArr(Bcoord, Pickcell))];
						if (nextpoint[0] == 0) { // тест на дамку
							Bcoord.splice(SearchArr(Bcoord, Pickcell), 1, [nextpoint[0], nextpoint[1], true]);
						}
						else {
							Bcoord.splice(SearchArr(Bcoord, Pickcell), 1, [nextpoint[0], nextpoint[1], Pickcell[2]]);
						}
						if (!isCanBitMore(nextpoint, false)) {
							Pickcell = undefined;
							step++;
						}
						else {
							Pickcell = nextpoint;
						}
						draw(Pervpoint);
						draw([Pervpoint[0] + directon[0], Pervpoint[1] + directon[1]]);
						draw(nextpoint);
					}
				}
			}
		}
	}
	else {
		Start();
	}
}