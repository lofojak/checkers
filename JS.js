var C = new Array();
var W = new Array();
var B = new Array();
var Wcoord = new Array(1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23);
var Bcoord = new Array(42, 44, 46, 48, 49, 51, 53, 55, 58, 60, 62, 64);

function init() {
	for (var i = 0; i < 64; i++) {
		C[i] = document.getElementById('C'+i);
	}

	for (var i = 0; i < 12; i++) {
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
}

function Click(id) {
	alert(id);
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