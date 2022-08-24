var C = new Array();
var W = new Array();
var B = new Array();
var Wcoord = new Array(1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23);
var Bcoord = new Array(42, 44, 46, 48, 49, 51, 53, 55, 58, 60, 62, 64);
var step = -1;
var pervpoint;

function init() {
	document.getElementBy
	for (var i = 0; i < 65; i++) {
		C[i] = document.getElementById('C'+i);
	}

	for (var i = 0; i < 13; i++) {
		W[i] = document.getElementById('W'+i);
		B[i] = document.getElementById('B'+i);
	}
}

function isOnBoard(id) {
	if ((id > 64) | (id < 1)) {
		return false;
	}
	else {
		return ((Math.floor((id - 1) / 8) + id - 1) % 2 == 0);
	}
}

function Start() {
	if (step === -1) {
		step = 0;
		for (var i = 0; i < 12; i++) {
			W[i].style.top = (558 - 78 * Math.floor((Wcoord[i] - 1) / 8)) + "px";
			W[i].style.left = (12 + 79 * ((Wcoord[i] - 1) % 8)) + "px";

			B[i].style.top = (558 - 78 * Math.floor((Bcoord[i] - 1) / 8)) + "px";
			B[i].style.left = (12 + 79 * ((Bcoord[i] - 1) % 8)) + "px";
		}
		for (var i = 0; i < 12; i++) {
			C[Wcoord[i]].innerHTML = "<div class='PeshkaW'><div>";
		}
		for (var i = 0; i < 12; i++) {
			C[Bcoord[i]].innerHTML = "<div class='PeshkaB'><div>";
		}
	}
}

function isCanStep(pervpoint, nextpoint) {
	var isWhite;
	if (Wcoord.indexOf(pervpoint) === -1) {isWhite = true;}
	else if (Bcoord.indexOf(pervpoint) === -1) {isWhite = false;}
	if (!isNaN(isWhite)) {
		var a1 = Math.floor((pervpoint - 1) / 8);	// a - координата по вертикали
		var a2 = Math.floor((nextpoint - 1) / 8); 
		var b1 = (pervpoint - 1) % 8;				// b - координата по горизонтали
		var b2 = (nextpoint - 1) % 8;
		if (isWhite) {
			if ((a1 - a2 == 1) && (Math.abs(b1 - b2) == 1)) {
				return true;
			}
			else {
				return false;
			}
		}	// отсекаем ходы назад
		else {
			if ((a2 - a1 == 1) && (Math.abs(b1 - b2) == 1)) {
				return true;
			}
			else {
				return false;
			}
		}
	}
}

function Click(id) {
	if (isOnBoard(id)) {
		if (step >= 0) {
			if (step % 2 == 0) { 				// Ход белых
				if (isNaN(pervpoint)) {					// Этап выбора шашки, которая будет делать ход
					if (Wcoord.indexOf(id) === -1) {
						alert('Сейчас играют белые');
					}
					else {
						pervpoint = id;
						C[id].innerHTML = "<div class='PeshkaW PeshkaWPoint'><div>";
					}
				}
				else {									// Этап выбора пути, куда будет делать ход шашка
					if (Wcoord.indexOf(id) >= 0) {				// Случай перевыбора
						C[pervpoint].innerHTML = "<div class='PeshkaW'><div>";
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaW PeshkaWPoint'><div>";
					}
					else if (Bcoord.indexOf(id) >= 0) {			// Случай сруба вражеской пешки
						alert('срубил');
					}
					else {										// Случай хода
						if (isCanStep(pervpoint, id)) {
							C[pervpoint].innerHTML = "";
							C[id].innerHTML = "<div class='PeshkaW'><div>";;
							Wcoord.splice(Wcoord.indexOf(pervpoint), 1, id);
							step++;
							pervpoint = NaN;
						}
						else {
							alert('Так нельзя ходить');
						}
					}
				}
			}
			else {								// Ход чёрных
				if (isNaN(pervpoint)) {					// Этап выбора шашки, которая будет делать ход
					if (Bcoord.indexOf(id) === -1) {
	 					alert('Сейчас играют чёрные');
					}
					else {
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaB PeshkaBPoint'><div>";
					}
				}
				else {									// Этап выбора пути хода шашки
					if (Wcoord.indexOf(id) >= 0) {				// Случай сруба 
						alert('срубил');
					}
					else if (Bcoord.indexOf(id) >= 0) {			// Случай перевыбора
						C[pervpoint].innerHTML = "<div Class='PeshkaB'><div>";
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaB PeshkaBPoint'><div>";
					}
					else {										// Случай хода 
						if (isCanStep(pervpoint, id)) {
							C[pervpoint].innerHTML = "";
							C[id].innerHTML = "<div Class='PeshkaB'><div>";
							Bcoord.splice(Bcoord.indexOf(pervpoint), 1, id);
							step++;
							pervpoint = NaN;
						}
						else {
							alert('Так нельзя ходить');
						}
					}
				}
			}
		}
		else {
			alert('Please, start the game');
		}
	}
}