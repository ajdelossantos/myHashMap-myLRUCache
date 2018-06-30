class MaxIntSet {
  constructor(max) {
    this.store = new Array(max).fill(false);
    this.setLength = max;
  }

  insert(int) {
    try {
      this._validate(int);
    } catch (e) {
      return this._validate(int);
    }

    this.store[int] = true;
    return this.store;
  }

  remove(int) {
    try {
      this._validate(int);
    } catch (e) {
      return this._validate(int);
    }

    if (this.has(int) === false) {
      throw new ReferenceError('Set does not include this integer');
    } else {
      this.store[int] = false;
      return int;
    }
  }

  has(int) {
    try {
      this._validate(int);
    } catch (e) {
      return e;
    }

    return this.store[int]
  }

  _isValid(int) {
    return int >= 0 && int < this.setLength;
  }

  _validate(int) {
    if (this._isValid(int) === false) {
      throw new RangeError('Out of Bounds');
    }
  }

  toString() {
    return `[${this.store}]`;
  }
};

class IntSet {
  constructor(numBuckets = 20) {
    this.store = new Array(numBuckets).fill(0);
    this._intializeStore();
  }

  has(int) {
    return this._bucket(int).includes(int);
  }

  insert(int) {
    if (this.has(int) === false) {
      let newBucket = this._bucket(int);
      newBucket.push(int);

      this.store[int % this._numBuckets()] = newBucket;
    };

    return this.store;
  }

  remove(int) {
    if (this.has(int) === true) {
      let newBucket = this._bucket(int);
      newBucket = newBucket.filter(el => el !== int);

      this.store[int % this._numBuckets()] = newBucket;
    }

    return int;
  }

  _intializeStore() {
    return this.store = this.store.map(bucket => bucket = new Array);
  }

  _bucket(int) {
    return this.store[int % this._numBuckets()];
  }

  _numBuckets() {
    return this.store.length;
  }

  toString() {
    return `${this.store}`;
  }
};

class ResizingIntSet {
  constructor() {

  }
};

// For testing
console.log("Test your scripts here!")

module.exports = { MaxIntSet, IntSet, ResizingIntSet };