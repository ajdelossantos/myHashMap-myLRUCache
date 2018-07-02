// Allows use of flat()
Object.defineProperty(Array.prototype, 'flat', {
  value: function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth - 1)) ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
  }
});

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

  toString() {
    return `[${this.store}]`;
  }

  _isValid(int) {
    return int >= 0 && int < this.setLength;
  }

  _validate(int) {
    if (this._isValid(int) === false) {
      throw new RangeError('Out of Bounds');
    }
  }

};

class IntSet {
  constructor(numBuckets = 20) {
    this.store = new Array(numBuckets).fill(false);
    this._intializeStore();
  }

  has(int) {
    return this._bucket(int).includes(int);
  }

  insert(int) {
    if (this.has(int) === false) {
      this.store[int % this._numBuckets()].push(int);
    };

    return this.store;
  }

  remove(int) {
    if (this.has(int) === true) {
      let index = this.store[int % this._numBuckets()].indexOf(int);
      this.store[int % this._numBuckets()].splice(index, 1);
    }

    return int;
  }

  toString() {
    return `${this.store}`;
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
};

class ResizingIntSet {
  constructor(numBuckets = 20) {
    this.store = new Array(numBuckets).fill(false);
    this.count = 0;
    this._intializeStore();
  }

  has(int) {
    return this._bucket(int).includes(int);
  }

  insert(int) {
    if (this.has(int) === false) {
      if (this.count >= this._numBuckets()) {
        this._resize();
      }
      this.store[int % this._numBuckets()].push(int)
      this.count++;
    }
    return this.store;
  };

  remove(int) {
    if (this.has(int) === true) {
      let index = this.store[int % this._numBuckets()].indexOf(int);
      this.store[int % this._numBuckets()].splice(index, 1);
      this.count--;
    }

    return int;
  }


  toString() {
    return `${this.store}`;
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

  _resize() {
    const newNumBuckets = this.store.length * 2;
    const currentValues = this.store.flat();

    this.count = 0;
    this.store = new Array(newNumBuckets).fill(false);
    this._intializeStore();

    currentValues.forEach(int => (this.insert(int)));
  }
};

// For testing
console.log("Test your scripts here!")

module.exports = { MaxIntSet, IntSet, ResizingIntSet };