import {DATA as DATA} from './api.js';
//_SHUFFLED
function sequential(
	arr,
	propName = 'id',
	propValue = Math.floor(Math.random() * arr.length)
) {
	let instFound = true;
	let i = 0;
	do {
		const element = arr[i];
		if (element[propName] == propValue) instFound = false;
		i++;
	} while (instFound && i < arr.length);
	// console.log(propValue, i, instFound, arr.length);
	return i; // number of iterations
}

const nodeArgs = process.argv.slice(2);
console.log(DATA);
sequential(DATA);
console.log('Node args: ', nodeArgs);
