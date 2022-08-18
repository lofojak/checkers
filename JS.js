var C = new Array();
var W = new Array();
var B = new Array();
var Wcoord = new Array(1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23);
var Bcoord = new Array(42, 44, 46, 48, 49, 51, 53, 55, 58, 60, 62, 64);
var isStarted = false;

function init() {
	for (var i = 0; i < 65; i++) {
		C[i] = document.getElementById('C'+i);
	}

	for (var i = 0; i < 13; i++) {
		W[i] = document.getElementById('W'+i);
		B[i] = document.getElementById('B'+i);
	}
}

function Start() {
	for (var i = 0; i < 12; i++) {
		W[i].style.visibility = "visible";
		W[i].style.top = (558 - 78 * Math.floor((Wcoord[i] - 1) / 8)) + "px";
		W[i].style.left = (12 + 79 * ((Wcoord[i] - 1) % 8)) + "px";

		B[i].style.visibility = "visible";
		B[i].style.top = (558 - 78 * Math.floor((Bcoord[i] - 1) / 8)) + "px";
		B[i].style.left = (12 + 79 * ((Bcoord[i] - 1) % 8)) + "px";
	}
	isStarted = true;
}

function Click(id) {
	if (isStarted) {
		for (var i = 0; i < 12; i++) {
			C[Wcoord[i]].innerHTML = "<div style='border-radius: 50%; width: 66px; height: 66px; border: 1px solid #fff; position: inherit; margin: 1px; background: #bcc;'><div>";
		}
		for (var i = 0; i < 12; i++) {
			C[Bcoord[i]].innerHTML = "<div style='border-radius: 50%; width: 66px; height: 66px; border: 1px solid #fff; position: inherit; margin: 1px; background: #644;'><div>";
		}
		for (var i = 1; i < 13; i++) {
			W[i - 1].style.visibility = "hidden";
			B[i - 1].style.visibility = "hidden";
		}
	}
	else {
		alert('Please, start the game');
	}
}