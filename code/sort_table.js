import {DATA_SHUFFLED, startTrackFunctionTimeAndIterations} from './api.js';

function bubble_sort(unsortedArr, propName = 'id') {
	let wasChanged = false;
	let i = 0;
	let arr = unsortedArr;
	do {
		wasChanged = false;
		for (let j = 1; j < arr.length; j++) {
			i++;
			const [x2, x1] = [parseInt(arr[j][propName]), parseInt(arr[j - 1][propName])];
			if (x2 < x1) {
				[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
				wasChanged = true;
			}
		}
	} while (wasChanged);
	return i; // number of iterations
}

function deleteFromArrayByIndex(array, index) {
	const arr = [...array];
	const firstPart = arr.slice(0, index);
	const secondPart = arr.slice(index + 1);
	return [...firstPart, ...secondPart];
}
function insertIntoArrayByIndex(array, index, element) {
	const arr = [...array];
	const firstPart = arr.slice(0, index);
	const secondPart = arr.slice(index);
	return [...firstPart, element, ...secondPart];
}

function insertion_sort(unsortedArr, propName = 'id') {
	let i = 0,
		prev;
	let arr = [...unsortedArr];
	for (let j = 1; j < arr.length; j++) {
		const target = arr[j][propName];
		prev = j;
		let readyToCut = true;
		while (prev > 0 && readyToCut) {
			i += 1;
			prev -= 1;
			const current = arr[prev][propName];
			// Daca numarul cercetat este mai mare decat numarul de la stanga acestuia
			// Se ia pozitia numarului aflat la stanga (current) si se aduna cu 1
			// Aceasta va fi pozitia noua a numarului cercetat (target).
			if (target > current) {
				readyToCut = false;
				prev += 1;
				break;
			}
		}

		if (arr[j][propName] < arr[prev][propName]) {
			// In caz ca-i necesar de schimbat cu locul, se schimba
			const clearedArr = deleteFromArrayByIndex(arr, j);
			const newArr = insertIntoArrayByIndex(clearedArr, prev, arr[j]);
			arr = newArr;
		}
	}
	// console.log(arr);
	return i; // number of iterations
}

function selection_sort(unsortedArr, propName = 'id') {
	let i = 0;
	let arr = [...unsortedArr];
	let sortedArr = [],
		restArr = [];
	while (arr.length) {
		const j = 0;
		const target = arr[j][propName];
		let minNode = {value: target, position: j, content: arr[j]};

		for (let k = j + 1; k < arr.length; k++) {
			++i;
			const current = arr[k][propName];
			// console.log(current, minNode.value, current < minNode.value, arr, sortedArr);
			if (current < minNode.value) {
				minNode = {value: current, position: k, content: arr[k]};
			}
		}
		restArr = deleteFromArrayByIndex(arr, minNode.position); // Stergem nodul cu valoare minima din tabelul nesortat.
		// console.log('Scoatem nodul minim: ', restArr);
		restArr = insertIntoArrayByIndex(restArr, minNode.position, arr[j]); // Pozitionam nodul maxim pe pozitia elementului celui minim, acela pe care l-am sters.
		restArr = deleteFromArrayByIndex(restArr, j); // Stergem elementul, cu care am operat precedent, de pe pozitia sa initiala.
		// console.log('Pozitionam nodul maxim: ', restArr);

		sortedArr.push(minNode.content); // Adaugam nodul minim in masivul sortat.
		arr = [...restArr]; // inlocuim masivul curent cu cel nesortat.
	}
	console.log(sortedArr);
	return i; // number of iterations
	// TODO change minNode.value-> minNode.content[propName]
}
const testArr = [45, 5, 1, 23, 40, 35];
console.log(selection_sort(DATA_SHUFFLED));
