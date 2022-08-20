var C = new Array();
var W = new Array();
var B = new Array();
var Wcoord = new Array(1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23);
var Bcoord = new Array(42, 44, 46, 48, 49, 51, 53, 55, 58, 60, 62, 64);
var step = -1;
var pervpoint;
/*const WPeshkainHTML = "<div class='WPeshka'><div>";
const BPeshkainHTML = "<div style='border-radius: 50%; width: 66px; height: 66px; border: 1px solid #888; position: inherit; margin: 1px; background: #644;'><div>";
const 
*/

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

function Click(id) {
	if (isOnBoard(id)) {
		if (step >= 0) {/*
			if (step % 4 == 0) {
				//Этап выбора перемещения белых
				if (Wcoord.indexOf(id) === -1) {
					alert('Сейчас играют белые');
				}
				else {
					pervpoint = id;
					C[id].innerHTML = "<div class='PeshkaW PeshkaWPoint'><div>";
					step++;
				}
			}
			else if (step % 2 == 1) {
				if (Wcoord.indexOf(pervpoint) >= 0) {
					if (Wcoord.indexOf(id) >= 0) { // Случай перевыбора
						C[pervpoint].innerHTML = "<div class='PeshkaW'><div>";
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaW PeshkaWPoint'><div>";
					}
					else if (Bcoord.indexOf(id) >= 0) { // Случай сруба вражеской пешки
						alert('срубил');
					}
					else { //Случай хода
						C[pervpoint].innerHTML = "";
						C[id].innerHTML = "<div class='PeshkaW'><div>";;
						Wcoord.splice(Wcoord.indexOf(pervpoint), 1, id);
						step++;
					}
				} 
				else if (Bcoord.indexOf(pervpoint) >= 0) {
					if (Wcoord.indexOf(id) >= 0) { //Случай сруба 
						alert('срубил');
					}
					else if (Bcoord.indexOf(id) >= 0) { //Случай перевыбора
						C[pervpoint].innerHTML = "<div Class='PeshkaB'><div>";
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaB PeshkaBPoint'><div>";
					}
					else { // случай хода 
						C[pervpoint].innerHTML = "";
						C[id].innerHTML = "<div Class='PeshkaB'><div>";
						Bcoord.splice(Bcoord.indexOf(pervpoint), 1, id);
						step++;
					}
				}
				else alert('Error');
			}
			else {
				if (Bcoord.indexOf(id) === -1) {
 					alert('Сейчас играют чёрные');
				}
				else {
					pervpoint = id;
					C[id].innerHTML = "<div Class='PeshkaB PeshkaBPoint'><div>";
					step++;
				}
			} */
			if (step % 2 == 0) { //Ход белых
				if (isNaN(pervpoint)) {
					//Этап выбора перемещения белых
					if (Wcoord.indexOf(id) === -1) {
						alert('Сейчас играют белые');
					}
					else {
						pervpoint = id;
						C[id].innerHTML = "<div class='PeshkaW PeshkaWPoint'><div>";
					}
				}
				else {
					if (Wcoord.indexOf(id) >= 0) { // Случай перевыбора
						C[pervpoint].innerHTML = "<div class='PeshkaW'><div>";
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaW PeshkaWPoint'><div>";
					}
					else if (Bcoord.indexOf(id) >= 0) { // Случай сруба вражеской пешки
						alert('срубил');
					}
					else { //Случай хода
						C[pervpoint].innerHTML = "";
						C[id].innerHTML = "<div class='PeshkaW'><div>";;
						Wcoord.splice(Wcoord.indexOf(pervpoint), 1, id);
						step++;
						pervpoint = NaN;
					}
				}
			}
			else { // Ход чёрных
				if (isNaN(pervpoint)) {
					if (Bcoord.indexOf(id) === -1) {
	 					alert('Сейчас играют чёрные');
					}
					else {
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaB PeshkaBPoint'><div>";
					}
				}
				else {
					if (Wcoord.indexOf(id) >= 0) { //Случай сруба 
						alert('срубил');
					}
					else if (Bcoord.indexOf(id) >= 0) { //Случай перевыбора
						C[pervpoint].innerHTML = "<div Class='PeshkaB'><div>";
						pervpoint = id;
						C[id].innerHTML = "<div Class='PeshkaB PeshkaBPoint'><div>";
					}
					else { // случай хода 
						C[pervpoint].innerHTML = "";
						C[id].innerHTML = "<div Class='PeshkaB'><div>";
						Bcoord.splice(Bcoord.indexOf(pervpoint), 1, id);
						step++;
						pervpoint = NaN;
					}
				}
			}
		}
		else {
			alert('Please, start the game');
		}
	}
}