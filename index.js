/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */

class HashMap {
  constructor() {
    this.length = 8;
    this.storage = new Array(this.length);
    this.count = 0;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 61;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    let bucket = this.hash(key) % this.length;

    if (bucket < 0 || bucket >= this.storage.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (this.has(key)) {
      return this.storage[bucket][1] = value;
    }

    if (this.count / this.length >= this.loadFactor || this.storage[bucket]) {
      this.growStorage();

      if (this.storage[bucket]) {
        bucket = this.hash(key) % this.length;
        return this.set(key, value);
      }
      this.count++;
      return this.storage[bucket] = [this.hash(key), value];
    }

    this.storage[bucket] = [this.hash(key), value];
    this.count++;
    return this.storage;
  }

  growStorage() {
    const oldStorage = this.storage;
    this.length *= 2;
    this.storage = new Array(this.length);
    oldStorage.forEach((element) => {
      if (this.storage[element[0] % (this.length)]) {
        return this.growStorage();
      }
      return this.storage[element[0] % (this.length)] = element;
    });
  }

  get(key) {
    const bucket = this.hash(key) % this.length;

    if (this.storage[bucket] && this.storage[bucket][0] == this.hash(key)) {
      return this.storage[bucket][1];
    }
    return null;
  }

  has(key) {
    const bucket = this.hash(key) % this.length;
    if (this.storage[bucket] && this.storage[bucket][0] == this.hash(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    const bucket = this.hash(key) % this.length;

    if (!this.storage[bucket]) {
      return false;
    }
    return delete this.storage[bucket];
  }

  getLength() {
    return this.count;
  }

  clear() {
    for (let i = 0; i < this.storage.length; i++) {
      delete this.storage[i];
    }
    this.count = 0;
    this.length = 8;
    this.storage = new Array(this.length);
  }

  keys() {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
      if (this.storage[i]) {
        arr.push(this.storage[i][0]);
      }
    }
    return arr;
  }

  values() {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
      if (this.storage[i]) {
        arr.push(this.storage[i][1]);
      }
    }
    return arr;
  }

  entries() {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
      if (this.storage[i]) {
        arr.push([this.storage[i][0], this.storage[i][1]]);
      }
    }
    return arr;
  }
}

const hashmap = new HashMap();

hashmap.set('Crow', '1');
hashmap.set('Curlings', '2');
hashmap.set('Casual', '3');
hashmap.set('David', '4');
hashmap.set('Link', '5');
hashmap.set('We', '6');
hashmap.set('Tonight', '7');
hashmap.set('Tag', '8');
hashmap.set('Patrick', '9');
hashmap.set('14', '10');
console.log(hashmap.storage);
