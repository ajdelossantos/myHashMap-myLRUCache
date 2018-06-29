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

    try {
      this.has(int) === true;
    } catch (e) {
      throw new ReferenceError('Set does not include this integer')
    }

    this.store[int] = false;
    return int;
  }

  has(int) {
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

  _toString() {
    return `${this.store}`;
  }
};

class IntSet {
  constructor(numBuckets = 20) {
    this.store = new Array(20).fill(new Array);
  }

  has(int) {

  }

  insert() {

  }

  remove() {

  }

  _num_buckets() {
    return this.store.length;
  }

  _toString() {
    return `${this.store}`;
  }
};

class ResizingIntSet {
  constructor() {

  }
};

module.exports = { MaxIntSet, IntSet, ResizingIntSet };