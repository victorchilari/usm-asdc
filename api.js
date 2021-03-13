// const fs = require('fs');
// const fetch = require('node-fetch');
// import * as fetch from 'node-fetch';
import * as fs from 'fs';

export const DATA_PATH = './MOCK_DATA.json';
export const DATA = getJSON(DATA_PATH);
export const DATA_PATH_SHUFFLED = './MOCK_DATA_SHUFFLED.json';
export const DATA_SHUFFLED = getJSON(DATA_PATH_SHUFFLED);

export function getJSON(src) {
	// const doc = await fetch(src);
	// const data = doc.json();
	const data = fs.readFileSync(src, 'utf8');
	return JSON.parse(data);
}

export function setJSON(src, data) {
	const string = JSON.stringify(data);
	fs.writeFile(src, string, err => {
		if (err) console.error(err);
	});
}

export function rundomIntNumber(x) {
	return Math.floor(Math.random() * x);
}

export function shuffle(arr, coff = 0.5) {
	const data = arr;
	const dataLength = data.length;

	const howMutchShuffle = Math.floor(Math.random() * (dataLength / coff));

	for (let i = 0; i < howMutchShuffle; i++) {
		const a = rundomIntNumber(dataLength);
		const b = rundomIntNumber(dataLength);
		[data[b], data[a]] = [data[a], data[b]];
	}
	return data;
}

// setJSON('MOCK_DATA_SHUFFLED.json', shuffle(getJSON('./MOCK_DATA.json')));
