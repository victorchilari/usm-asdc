import { DATA, DATA_SHUFFLED, randomIndex, startTrackFunctionTimeAndIterations } from './api.js';

function linear(arr, propName = 'id', propValue = randomIndex(arr) + 1) {
	let isntFound = true;
	let i = 0;
	do {
		const element = arr[i];
		if (element[propName] == propValue) isntFound = false;
		i++;
	} while (isntFound && i < arr.length);
	// console.log(propValue, i, isntFound, arr.length);
	return i; // number of iterations
}

function binaryTree(array, propName = 'id', propValue = randomIndex(array) + 1) {
	const initValue = array[0][propName];
	const node = {value: initValue, min: undefined, max: undefined};
	// Create binary tree
	for (let i = 1; i < array.length; i++) {
		const number = array[i][propName];

		let studyTree = node;
		let isntInserted = true;
		let state = '';
		do {
			if (number < studyTree.value) {
				state = 'min';
			} else {
				state = 'max';
			}
			if (studyTree[state] == undefined) {
				studyTree[state] = {value: number, min: undefined, max: undefined};
				isntInserted = false;
			} else {
				studyTree = studyTree[state];
			}
		} while (isntInserted);
	}
	// console.log(node); // it works becouse is mutable
	// Process
	let target = JSON.parse(JSON.stringify(node));
	let i = 0;
	while (target.value != propValue) {
		i++;
		// console.log(i, target.value, propValue);
		propValue < target.value ? (target = target.min) : (target = target.max);
	}
	i++; // becouse while work until is correct the condition, and stop when we find what we search
	return i;
}

function binary(array, propName = 'id', propValue = randomIndex(array) + 1) {
	let start = 0,
		end = array.length - 1;
	let i = 0;
	while (start < end) {
		i++;
		const current = Math.floor((start + end) / 2);
		const indexValue = array[current][propName];
		if (indexValue == propValue) {
			break;
		} else if (indexValue < propValue) {
			start = current + 1;
		} else {
			end = current - 1;
		}
	}
	// return [i, array[i], propValue];
	return i;
}

const nodeArgs = process.argv.slice(2);
// console.log(DATA);
// console.log('Node args: ', nodeArgs);
// linear(DATA);
// binaryTree(DATA_SHUFFLED);
// binary(DATA);
function fibonacciSearch(
	array,
	target = randomIndex(array) + 1,
	propName = 'id',
	min_position = 0,
	max_position = array.length
) {
	function fib(n) {
		if (n <= 0) return 0;
		if (n <= 2) return 1;
		return fib(n - 1) + fib(n - 2);
	}
	function smallest_greater_eq_fib(n) {
		let f = fib(0), cut = 0;
		while (f < n) f = fib(++cut);
		return cut;
	}

	let f = smallest_greater_eq_fib(max_position - min_position + 1);
	let glob_comp = 0;
	while (f >= 0) {
		let index = Math.min(min_position + fib(f - 1), max_position - 1);
		index = Math.max(0, index);

		// console.log(
		// 	f,
		// 	`index: ${index} min_position: ${min_position} max_position: ${max_position}`
		// );

		if (array[index][propName] == target) {
			glob_comp++;

			// console.log(glob_comp, array[index][propName]);
			return index;
		} else if (target < array[min_position + fib(f - 1)][propName]) {
			glob_comp += 2;
			max_position = index;
			f -= 1;
		} else {
			glob_comp += 2;
			min_position = index;
			f -= 2;
		}
	}
	return glob_comp;
}
// const fib_arr = [-2, 0, 3, 5, 7, 9, 11, 15, 18, 21];
function trackAll(timesToCall = 6) {
	startTrackFunctionTimeAndIterations(()=>linear(DATA_SHUFFLED),timesToCall,'Linear');
	startTrackFunctionTimeAndIterations(()=>binaryTree(DATA_SHUFFLED),timesToCall,'Binary Tree');
	startTrackFunctionTimeAndIterations(()=>binary(DATA),timesToCall,'Binary Search');
	startTrackFunctionTimeAndIterations(()=>fibonacciSearch(DATA),timesToCall,'Fibonacci Search');
}
trackAll()