import {DATA_SHUFFLED as DATA} from './api.js';
//_SHUFFLED
function sequential(
	arr,
	propName = 'id',
	propValue = Math.floor(Math.random() * arr.length)
) {
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
	propValue = Math.floor(Math.random() * array.length)
) {
	const initValue = array[0][propName];
	let node = {value: initValue, min: undefined, max: undefined};
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
	console.log(node);
}

const nodeArgs = process.argv.slice(2);
// console.log(DATA);
// sequential(DATA);
// console.log('Node args: ', nodeArgs);
binaryTree(DATA);
