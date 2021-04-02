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
console.log(insertion_sort(DATA_SHUFFLED));
