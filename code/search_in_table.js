import {DATA, DATA_SHUFFLED, randomIndex} from './api.js';

function sequential(arr, propName = 'id', propValue = randomIndex(arr) + 1) {
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

function binaryTree(
	array,
	propName = 'id',
	propValue = randomIndex(array) + 1)
) {
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
	console.log(node); // it works becouse is mutable
	// Process
	let target = JSON.parse(JSON.stringify(node));
	let i = 0;
	while (target.value != propValue) {
		i++;
		console.log(i, target.value, propValue);
		propValue < target.value ? (target = target.min) : (target = target.max);
	}
	i++; // becouse while work until is correct the condition, and stop when we find what we search
	return i;
}

function binary(
	array,
	propName = 'id',
	propValue = randomIndex(array) + 1
) {
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
	return [i, array[i], propValue];
}

const nodeArgs = process.argv.slice(2);
// console.log(DATA);
// console.log('Node args: ', nodeArgs);
// sequential(DATA);
// binaryTree(DATA_SHUFFLED);
// binary(DATA);
