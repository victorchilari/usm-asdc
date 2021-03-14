class HashTable {
	constructor() {
		this.table = new Array(137);
		this.values = [];
	}

	// Defining the hashing function which allows a sting to be used as a key
	hash(string) {
		const H = 37;
		let total = 0;

		for (var i = 0; i < string.length; i++) {
			total += H * total + string.charCodeAt(i);
		}
		total %= this.table.length;
		if (total < 1) {
			this.table.length - 1;
		}
		return parseInt(total);
	}

	showDistro() {
		for (const key in this.table) {
			if (this.table[key] !== undefined) {
				console.log(key, ' : ', this.table[key]);
			}
		}
	}

	put(data) {
		const pos = this.hash(data);
		this.table[pos] = data;
	}

	get(key) {
		return this.table[this.hash(key)];
	}
}

// HashTable with Build Chains technique of collision-resolution.
class HashTableChains extends HashTable {
	constructor() {
		super();
		this.buildChains();
	}
	buildChains() {
		for (var i = 0; i < this.table.length; i++) {
			this.table[i] = new Array();
		}
	}

	showDistro() {
		console.log(this.table);
		for (const key in this.table) {
			if (this.table[key][0] !== undefined) {
				console.log(key, ' : ', this.table[key]);
			}
		}
	}

	put(data) {
		const pos = this.hash(data);
		let index = 0;
		if (this.table[pos][index] === undefined) {
			this.table[pos][index] = data;
		} else {
			++index;
			while (this.table[pos][index] !== undefined) {
				index++;
			}
			this.table[pos][index] = data;
		}
	}

	get(data) {
		const pos = this.hash(data);
		let index = 0;
		console.log(pos, this.table[pos]);
		while (this.table[pos][index] != data) {
			if (this.table[pos][index] !== undefined) {
				return this.table[pos][index];
			}
			// else {
			// 	return undefined;
			// }
			index++;
		}
		return this.table[pos];
	}
}

// HashTable with Linear Probing technique of collision-resolution.
class HashTableLinearP extends HashTable {
	constructor() {
		super();
		this.values = new Array();
	}

	put(key, data) {
		let pos = this.hash(key);
		if (this.table[pos] === undefined) {
			this.table[pos] = key;
			this.values[pos] = data;
		} else {
			while (this.table[pos] !== undefined) {
				pos++;
			}
			this.table[pos] = key;
			this.values[pos] = data;
		}
	}

	get(key) {
		const hash = this.hash(key);
		if (hash > -1) {
			for (let i = hash; this.table[i] !== undefined; i++) {
				if (this.table[i] === key) {
					return this.values[i];
				}
			}
		}
		return undefined;
	}

	showDistro() {
		console.log(this.table);
		for (const key in this.table) {
			if (this.table[key] !== undefined) {
				console.log(key, ' : ', this.values[key]);
			}
		}
	}
}

const hash = new HashTableChains(); //HashTableLinearP();HashTableChains
hash.put('aa21z');
hash.put('k', 'aa21z');
hash.put('k', 'aa');
hash.put('a');
hash.put('z');
hash.put('0');
hash.put('0');
hash.put(0);
hash.put({'a': 4});
hash.put({'v': 10});
hash.showDistro();
console.log(hash.get('0'));
