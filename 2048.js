/**
 * Global Stup
 * ----------------------------------------------------------------------------------------------
 */
var cellSelect = document.getElementsByClassName("cell");
var lineSelect = document.getElementsByClassName("line");
var totalLine = lineSelect.length;
var totalCell = cellSelect.length;
const d = 4, c = 4;
var diem = 0, MoveV = 0, MoveH = 0, V = 1, H = 1, gameOver = 0;
var a = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var empH = new Array(4).fill(0);
var empV = new Array(4).fill(0);
var b = new Array(4).fill(0);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = () => {
	FirstRoll();
}

/**
 *	Game Function
 * ----------------------------------------------------------------------------------------------
 */

//Kiem tra nut nhan
if (gameOver != 1) {
	function character(event) {
		if (typeof event.key === 'undefined' || event.key === 'Unidentified') {
			return String.fromCharCode(keyCodeNumber(event));
		} else {
			return event.key;
		}
	}

	document.addEventListener("keydown", () => { checkKey(event); });

	function checkKey(event) {
		var k = character(event);

		switch(k)
		{
			case 'w':
			case 'W': //Up
			{
				MoveV = 1;
				new Cmpt().up();
				if (empV.reduce((a, b) => { return a + b; }, 0) === 0 && MoveH === 1) {
					V = 0;
					if (H === 0) {
						GameOver();
					}
				}
				else {
					V = 1;
					H = 1;
				}
				new RndNmb().RndUp();
				empV.fill(0);
				break;
			}

			case 's':
			case 'S': //Down
			{
				MoveV = 1;
				new Cmpt().down();
				if (empV.reduce((a, b) => { return a + b; }, 0) === 0 && MoveH === 1) {
					V = 0;
					if (H === 0) {
						GameOver();
					}
				}
				else {
					V = 1;
					H = 1;
				}
				new RndNmb().RndDown();
				empV.fill(0);
				break;
			}

			case 'a':
			case 'A':	//Left
			{
				MoveH = 1;
				new Cmpt().left();
				if (empH.reduce((a, b) => { return a + b; }, 0) === 0 && MoveV === 1) {
					H = 0;
					if (V === 0) {
						GameOver();
					}
				}
				else {
					H = 1;
					V = 1;
				}
				new RndNmb().RndLeft();
				empH.fill(0);
				break;
			}

			case 'd':
			case 'D': //Right
			{
				MoveH = 1;
				new Cmpt().right();
				if (empH.reduce((a, b) => { return a + b; }, 0) === 0 && MoveV === 1) {
					H = 0;
					if (V === 0) {
						GameOver();
					}
				}
				else {
					H = 1;
					V = 1;
				}
				new RndNmb().RndRight();
				empH.fill(0);
				break;
			}
		}

		UpdateRoll();
		ResizeNumber();
		document.querySelector('.score').children[0].innerHTML = diem;
	}
}

function FirstRoll() {
	var m = 0;
	for (let i = 0; i < d; i++) {
		for (let e = 0; e < c; e++) {
			if (m < 2 && i === 3 && (e === c - 1 || e === c - 2)) {
				a[i][e] = 2;
				m++;
			}
			else if (a[i][e] === 0 && getRndInteger(1, 10) === 1 && m < 2) {
				a[i][e] = 2;
				m++;
			}
			else {
				a[i][e] = 0;
			}

			if (a[i][e] === 0 || a[i][e] === 'undefined' || a[i][e] === 'Unidentified') {
				lineSelect[i].getElementsByClassName("cell")[e].children[0].innerHTML = "";
			}
			else {
				lineSelect[i].getElementsByClassName("cell")[e].children[0].innerHTML = a[i][e];
			}
		}
	}
}

function startNewGame() {
	for (let i = 0; i < d; i++) {
		a[i].fill(0);
	}

	b.fill(0);
	empH.fill(0);
	empV.fill(0);
	diem = 0;
	gameOver = 0;
	document.getElementsByClassName('score')[0].children[0].innerHTML = diem;
	ResizeNumber();
	document.documentElement.style.setProperty('--game-over-screen', 'scaleY(0)');
	document.documentElement.style.setProperty('--game-over-text-opacity', '0');
	FirstRoll();
}

function GameOver() {
	gameOver = 1;
	document.documentElement.style.setProperty('--game-over-screen', 'scaleY(1)');
	document.documentElement.style.setProperty('--game-over-text-opacity', '1');
	return;
}

function UpdateRoll() {
	for (let i = 0; i < d; i++) {
		for (let e = 0; e < c; e++) {
			if (a[i][e] === 0 || a[i][e] === 'undefined' || a[i][e] === 'Unidentified') {
				lineSelect[i].getElementsByClassName("cell")[e].children[0].innerHTML = "";
			}
			else {
				lineSelect[i].getElementsByClassName("cell")[e].children[0].innerHTML = a[i][e];
			}
		}
	}
}

function ResizeNumber() {
	for (let i = 0; i < totalCell; i++) {
		if (cellSelect[i].children[0].innerHTML != '') {
			cellSelect[i].children[0].style.fontSize = 48 - ((cellSelect[i].children[0].innerHTML.length - 1) * 4) + 'px';
		}
	}
	document.querySelector('.score').children[0].style.fontSize = 43 - ((document.querySelector('.score').children[0].innerHTML.length - 1) * 3) + 'px';
}

class Cmpt {
	constructor() {
	}

	left() {
		var t, x, m;

		for (let i = 0; i < d; i++) {
			t = 0;
			m = 0;
			x = 0;

			b.fill(0);

			for (let o = 0; o < c; o++) {
				if (a[i][o] != 0) {
					b[t] = a[i][o];
					t++;
					m = 1;
					a[i][o] = 0;
				}
			}

			if (t > 1) {
				for (let p = 0; p < t; p++) {
					if (b[p] === b[p + 1]) {
						b[p] *= 2;
						diem += b[p];
						b[p + 1] = 0;
						p++;
					}
				}
			}
			else if (m === 1) {
				a[i][0] = b[0];
				empH[i] = 3;
				continue;
			}

			for (let j = 0; j < c; j++) {
				if (b[j] != 0) {
					a[i][x] = b[j];
					x++;
				}
				else {
					empH[i]++;
				}
			}
		}
	}

	right() {
		var t, x, m, r;

		for (let i = 0; i < d; i++) {
			t = 0;
			m = 0;
			r = d - 1;
			x = c - 1;

			b.fill(0);

			for (let o = d - 1; o >= 0; o--) {
				if (a[i][o] != 0) {
					b[t] = a[i][o];
					t++;
					r--;
					m = 1;
					a[i][o] = 0;
				}
			}

			if (t > 1) {
				for (let p = 0; p < t; p++) {
					if (b[p] === b[p + 1]) {
						b[p] *= 2;
						diem += b[p];
						b[p + 1] = 0;
						p++;
					}
				}
			}
			else if (m === 1) {
				a[i][c - 1] = b[0];
				empH[i] = 3;
				continue;
			}

			for (let j = 0; j < c; j++) {
				if (b[j] != 0) {
					a[i][x] = b[j];
					x--;
				}
				else {
					empH[i]++;
				}
			}
		}
	}

	up() {
		var t, x, m;

		for (let i = 0; i < c; i++) {
			t = 0;
			m = 0;
			x = 0;

			b.fill(0);

			for (let o = 0; o < c; o++) {
				if (a[o][i] != 0) {
					b[t] = a[o][i];
					t++;
					m = 1;
					a[o][i] = 0;
				}
			}

			if (t > 1) {
				for (let p = 0; p < t; p++) {
					if (b[p] === b[p + 1]) {
						b[p] *= 2;
						diem += b[p];
						b[p + 1] = 0;
						p++;
					}
				}
			}
			else if (m === 1) {
				a[0][i] = b[0];
				empV[i] = 3;
				continue;
			}

			for (let j = 0; j < d; j++) {
				if (b[j] != 0) {
					a[x][i] = b[j];
					x++;
				}
				else {
					empV[i]++;
				}
			}
		}
	}

	down() {
		var t, x, m, r;

		for (let i = 0; i < c; i++) {
			t = 0;
			m = 0;
			r = c - 1;
			x = d - 1;

			b.fill(0);

			for (let o = c - 1; o >= 0; o--) {
				if (a[o][i] != 0) {
					b[t] = a[o][i];
					t++;
					r--;
					m = 1;
					a[o][i] = 0;
				}
			}

			if (t > 1) {
				for (let p = 0; p < t; p++) {
					if (b[p] === b[p + 1]) {
						b[p] *= 2;
						diem += b[p];
						b[p + 1] = 0;
						p++;
					}
				}
			}
			else if (m === 1) {
				a[d - 1][i] = b[0];
				empV[i] = 3;
				continue;
			}

			for (let j = 0; j < d; j++) {
				if (b[j] != 0) {
					a[x][i] = b[j];
					x--;
				}
				else {
					empV[i]++;
				}
			}
		}
	}
}

class RndNmb {
	constructor() {
		this.totalEmptyHorizontal = empH.reduce((a, b) => { return a + b; }, 0);
		this.totalEmptyVertical = empV.reduce((a, b) => { return a + b; }, 0);
	}

	RndLeft() {
		var n = 0, S = this.totalEmptyHorizontal;

		if (S > 1) {
			do
			{
				for (let e = 0; e < d; e++) {
					if (empH[e] > 0) {
						for (let j = c - 1; j > c - empH[e] - 1; j--) {
							if (a[e][j] == 0 && getRndInteger(1, 10) === 1) {
								if (getRndInteger(1, 13) === (1 || 2)) {
									a[e][j] = 4;
								}
								else {
									a[e][j] = 2;
								}
								n++;
								break;
							}
						}
					}

					if (n > 0) {
						break;
					}
				}
			} while (n < 1);
		}
		else if (S === 1) {
			for (let e = 0; e < d; e++) {
				if (empH[e] > 0) {
					if (getRndInteger(1, 10) === (1 || 2)) {
						a[e][c - 1] = 4;
					}
					else {
						a[e][c - 1] = 2;
					}

					break;
				}
			}
		}
	}

	RndRight() {
		var n = 0, S = this.totalEmptyHorizontal;

		if (S > 1) {
			do
			{
				for (let e = 0; e < d; e++) {
					if (empH[e] > 0) {
						for (let j = 0; j < empH[e]; j++) {
							if (a[e][j] == 0 && getRndInteger(1, 10) === 1) {
								if (getRndInteger(1, 13) === (1 || 2)) {
									a[e][j] = 4;
								}
								else {
									a[e][j] = 2;
								}
								n++;
								break;
							}
						}
					}

					if (n > 0) {
						break;
					}
				}
			} while (n < 1);
		}
		else if (S === 1) {
			for (let e = 0; e < d; e++) {
				if (empH[e] > 0) {
					if (getRndInteger(1, 10) === (1 || 2)) {
						a[e][0] = 4;
					}
					else {
						a[e][0] = 2;
					}

					break;
				}
			}
		}
	}

	RndUp() {
		var n = 0, S = this.totalEmptyVertical;

		if (S > 1) {
			do
			{
				for (let e = 0; e < c; e++) {
					if (empV[e] > 0) {
						for (let j = d - 1; j > d - empV[e] - 1; j--) {
							if (a[j][e] == 0 && getRndInteger(1, 10) === 1) {
								if (getRndInteger(1, 13) === (1 || 2)) {
									a[j][e] = 4;
								}
								else {
									a[j][e] = 2;
								}
								n++;
								break;
							}
						}
					}

					if (n > 0) {
						break;
					}
				}
			} while (n < 1);
		}
		else if (S === 1) {
			for (let e = 0; e < c; e++) {
				if (empV[e] > 0) {
					if (getRndInteger(1, 10) === (1 || 2)) {
						a[d - 1][e] = 4;
					}
					else {
						a[d - 1][e] = 2;
					}

					break;
				}
			}
		}
	}

	RndDown() {
		var n = 0, S = this.totalEmptyVertical;

		if (S > 1) {
			do
			{
				for (let e = 0; e < c; e++) {
					if (empV[e] > 0) {
						for (let j = 0; j < empV[e]; j++) {
							if (a[j][e] == 0 && getRndInteger(1, 10) === 1) {
								if (getRndInteger(1, 13) === (1 || 2)) {
									a[j][e] = 4;
								}
								else {
									a[j][e] = 2;
								}

								n++;
								break;
							}
						}
					}

					if (n > 0) {
						break;
					}
				}
			} while (n < 1);
		}
		else if (S === 1) {
			for (let e = 0; e < c; e++) {
				if (empV[e] > 0) {
					if (getRndInteger(1, 10) === (1 || 2)) {
						a[0][e] = 4;
					}
					else {
						a[0][e] = 2;
					}

					break;
				}
			}
		}
	}
}