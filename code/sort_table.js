import {
	DATA_SHUFFLED,
	deleteFromArrayByIndex,
	insertIntoArrayByIndex,
	startTrackFunctionTimeAndIterations
} from './api.js';

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
	return i; // number of iterations
}

function selection_sort(unsortedArr, propName = 'id') {
	let i = 0;
	const arr = [...unsortedArr];
	for (let j = 0; j < arr.length; j++) {
		const target = arr[j][propName];
		let minNode = {value: target, position: j};

		for (let k = j + 1; k < arr.length; k++) {
			++i;
			const current = arr[k][propName];
			if (current < minNode.value) {
				minNode = {value: current, position: k};
			}
		}
		[arr[minNode.position], arr[j]] = [arr[j], arr[minNode.position]];
	}
	return i; // number of iterations
}

function partition(arr, start, end, propName) {
	let iterations = 0;
	// Taking the last element as the pivot
	const pivotValue = arr[end][propName];
	let pivotIndex = start;
	for (let i = start; i < end; i++) {
		iterations++;
		if (arr[i][propName] < pivotValue) {
			// Swapping elements
			[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
			// Moving to next element
			pivotIndex++;
		}
	}
	// Putting the pivot value in the middle
	[arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
	return [pivotIndex, iterations];
}

function quick_sort(arr, start = 0, end = arr.length - 1, propName = 'id') {
	let i = 0;
	// Base case or terminating case
	if (start >= end) {
		return;
	}

	// Returns pivotIndex and number of iterations
	let [index, iterations] = partition(arr, start, end, propName);
	i += iterations;

	// Recursively apply the same logic to the left and right subarrays
	quick_sort(arr, start, index - 1);
	quick_sort(arr, index + 1, end);
	return i; // number of iterations
}

function shell_sort(arr, propName = 'id') {
	const length = arr.length;

	// Start with a really large gap, and then reduce the gap until there isn't any
	// Gap-ul se incepe ca jumatate din lungimea masivului
	// La sfarsitul fiecarei iteratii, in while, il impartim la 2
	let gap = Math.floor(length / 2);
	while (gap > 0) {
		// Do a insertion sort for each of the section the gap ends up dividing
		for (let i = gap; i < length; i += 1) {
			const current = arr[i];

			// Ciclu pentru a sorta
			let j;
			for (j = i; j >= gap && arr[j - gap][propName] > current[propName]; j -= gap) {
				arr[j] = arr[j - gap];
			}

			arr[j] = current;
		}

		gap = Math.floor(gap / 2);
	}

	return 0; //! to fix
}

function trackAll(timesToCall = 6) {
	startTrackFunctionTimeAndIterations(
		() => bubble_sort(DATA_SHUFFLED),
		timesToCall,
		'Bubble Sort'
	);
	startTrackFunctionTimeAndIterations(
		() => insertion_sort(DATA_SHUFFLED),
		timesToCall,
		'Insertion Sort'
	);
	startTrackFunctionTimeAndIterations(
		() => selection_sort(DATA_SHUFFLED),
		timesToCall,
		'Selection Sort'
	);
	startTrackFunctionTimeAndIterations(
		() => quick_sort(DATA_SHUFFLED),
		timesToCall,
		'Quick Sort'
	);
	startTrackFunctionTimeAndIterations(
		() => shell_sort(DATA_SHUFFLED),
		timesToCall,
		'Shell Sort'
	);
}
trackAll(1000);

// const testArr = [45, 5, 1, 23, 40, 35]; // DATA_SHUFFLED
// console.log(shell_sort(DATA_SHUFFLED));
