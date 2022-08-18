var C1 = document.getElementById('1');
var C3 = document.getElementById('3');
var C5 = document.getElementById('5');
var C7 = document.getElementById('7');
var C10 = document.getElementById('10');
var C12 = document.getElementById('12');
var C14 = document.getElementById('14');
var C16 = document.getElementById('16');
var C17 = document.getElementById('17');
var C19 = document.getElementById('19');
var C21 = document.getElementById('21');
var C23 = document.getElementById('23');
var C26 = document.getElementById('26');
var C28 = document.getElementById('28');
var C30 = document.getElementById('30');
var C32 = document.getElementById('32');
var C33 = document.getElementById('33');
var C35 = document.getElementById('35');
var C37 = document.getElementById('37');
var C39 = document.getElementById('39');
var C42 = document.getElementById('42');
var C44 = document.getElementById('44');
var C46 = document.getElementById('46');
var C48 = document.getElementById('48');
var C49 = document.getElementById('49');
var C51 = document.getElementById('51');
var C53 = document.getElementById('53');
var C55 = document.getElementById('55');
var C58 = document.getElementById('58');
var C60 = document.getElementById('60');
var C62 = document.getElementById('62');
var C64 = document.getElementById('64');

var W = new Array();
var B = new Array();

function Tableleft(i) {
	return (Math.floor(i / 4)) % 2 + (2 * i) % 8;
}


function Start() {
	W[0] = document.getElementById("W0");
	W[1] = document.getElementById('W1');
	W[2] = document.getElementById('W2');
	W[3] = document.getElementById('W3');
	W[4] = document.getElementById('W4');
	W[5] = document.getElementById('W5');
	W[6] = document.getElementById('W6');
	W[7] = document.getElementById('W7');
	W[8] = document.getElementById('W8');
	W[9] = document.getElementById('W9');
	W[10] = document.getElementById('W10');
	W[11] = document.getElementById('W11');
	B[0] = document.getElementById("B0");
	B[1] = document.getElementById('B1');
	B[2] = document.getElementById('B2');
	B[3] = document.getElementById('B3');
	B[4] = document.getElementById('B4');
	B[5] = document.getElementById('B5');
	B[6] = document.getElementById('B6');
	B[7] = document.getElementById('B7');
	B[8] = document.getElementById('B8');
	B[9] = document.getElementById('B9');
	B[10] = document.getElementById('B10');
	B[11] = document.getElementById('B11');
	for (var i = 0; i < 12; i++) {
		W[i].style.visibility = "visible";
		W[i].style.top = (558 - 78 * Math.floor(i / 4)) +"px";
		W[i].style.left = (12 + 79 * Tableleft(i)) +"px";
		B[i].style.visibility = "visible";
		B[i].style.top = (558 - 78 * Math.floor((i + 20) / 4)) +"px";
		B[i].style.left = (12 + 79 * Tableleft(i)) +"px";
	}
}

function Click(id) {
	alert(isNumber(id))
}

/*  					|	(Math.floor(i / 4)) % 2 + (2 * i + 1) % 8
0 - 1;				|	0 - 1
1 - 3;				|	1 - 	3
2 - 5;				|	2 - 		5
3 - 7;				|	3 - 			7
4 -   10;			|	4 -  2
5 - 	12;			|	5 - 	 4
6 - 	14;			|	6 - 		 6
7 - 	16;			|	7 - 			 8
8 - 		17;		|	8 - 1
9 - 		19;		|	9 - 	3
10 - 		21;		|	10 - 		5
11 - 		23;		|	11 - 			7
12 - 			26;	|	12 -  2
13 - 			28;	|	13 - 	 4
14 - 			30;	|	14 - 		 6
15 - 			32;	|	15 - 			 8

16 - 			33;	|	
17 -			35;	|	
18 - 			37;	|	
19 - 			39;	|	
20 - 		42;		|	
21 - 		44;		|	
22 - 		46;		|	
23 - 		48;		|	
24 - 	49;			|	
25 - 	51;			|	
26 - 	53;			|	
27 - 	55;			|	
28 - 58;			|	
29 - 60;			|	
30 - 62;			|	
31 - 64;			|	*/