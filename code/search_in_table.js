import {DATA as DATA} from './api.js';
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

const nodeArgs = process.argv.slice(2);
console.log(DATA);
sequential(DATA);
console.log('Node args: ', nodeArgs);
