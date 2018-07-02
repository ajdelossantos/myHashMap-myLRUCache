// Allows use of Array#flat
Object.defineProperty(Array.prototype, 'flat', {
  value: function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth - 1)) ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
  }
});

class MaxIntSet {
  constructor() { }

  insert() { }

  remove() { }

  has() { }

  // Optional for debugging
  toString() {
    // return `${this.store}`
  }

  _isValid() { }

  _validate() { }
};

class IntSet {
  constructor() { }

  has() { }

  insert() { }

  remove() { }

  // Optional for debugging
  toString() { }

  // HINT: optional helper method
  _intializeStore() { }

  // Replaces Ruby's bracket method
  _bucket(int) { }

  _numBuckets() { }
};

class ResizingIntSet {
  constructor() { }

  has() { }

  insert() { }

  remove() { }

  // Optional for debugging
  toString() { }

  // HINT: optional helper method
  _intializeStore() { }

  // Replaces Ruby's bracket method
  _bucket() { }

  _numBuckets() { }

  _resize() { }
};

// For testing
console.log("Test your scripts here!")

module.exports = { MaxIntSet, IntSet, ResizingIntSet };