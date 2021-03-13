// const fs = require('fs');
// const fetch = require('node-fetch');
// import * as fetch from 'node-fetch';
import * as fs from 'fs';

const CONTENT_PATH = './content/';
const DATA_NAME = 'MOCK_DATA.json';
const DATA_NAME_SHUFFLED = 'SHUFFLED_' + DATA_NAME;
export const DATA = getJSON(CONTENT_PATH + DATA_NAME);
export const DATA_SHUFFLED = getJSON(CONTENT_PATH + DATA_NAME_SHUFFLED);

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

// setJSON(`${DATA_NAME_SHUFFLED}, shuffle(DATA));
