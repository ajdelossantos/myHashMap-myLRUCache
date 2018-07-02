const { MaxIntSet, IntSet, ResizingIntSet } = require('../scripts/p01_int_set');

describe('MaxIntSet', () => {
  let set1 = new MaxIntSet(50);

  afterEach(() => {
    let defaultSet = new MaxIntSet(50)
    set1 = defaultSet;
  })

  describe('MaxIntSet#has', () => {
    test('should return false unless the number has been inserted', () => {
      expect(set1.has(1)).toBe(false);
    });

    test('should return true if the number has been inserted', () => {
      set1.insert(1);
      expect(set1.has(1)).toBe(true);
    });
  });

  describe('MaxIntSet#insert', () => {
    test('should be able to insert numbers within range', () => {
      const insertFortyNine = () => {
        set1.insert(49);
      };

      expect(insertFortyNine).not.toThrowError();
    });

    test('should raise an error when inserting numbers that are out of range', () => {
      const insertFifty = () => {
        set1.insert(50);
      };
      const insertTwo = () => {
        set1.insert(-1);
      };


      expect(insertFifty).toThrowError('Out of Bounds');
      expect(insertTwo).toThrowError('Out of Bounds');
    });
  });

  describe('MaxIntSet#remove', () => {
    test('should remove a number from the set', () => {
      set1.insert(1);
      set1.remove(1);
      expect(set1.has(1)).not.toBe(true);
    })
  });

});

describe('IntSet', () => {
  let set2 = new IntSet(20);

  afterEach(() => {
    let defaultSet = new IntSet(20)
    set2 = defaultSet;
  })

  describe('IntSet#has', () => {
    test('should return false unless the number has been inserted', () => {
      expect(set2.has(1)).toBe(false);
    });

    test('should return true if the number has been inserted', () => {
      set2.insert(1);
      expect(set2.has(1)).toBe(true);
    });
  });

  describe('IntSet#insert', () => {
    test('should be able to insert any numbers', () => {
      set2.insert(50);
      expect(set2.has(50)).toBe(true);
    })
  });

  describe('IntSet#remove', () => {
    test('should remove a number from the set', () => {
      set2.insert(1);
      set2.remove(1);
      expect(set2.has(1)).not.toBe(true);
    })
  });

  // Ensures that each bucket points to its own array, not a reference to the same one
  describe('Implementation', () => {
    describe('when implemented using a store of arrays', () => {
      // Probably tests too many things.
      test('operations are performed on the correct bucket', () => {
        expect(Array.isArray(set2.store[0])).toBe(true);

        set2.insert(1);

        expect(set2.store[1]).toContain(1);
        expect(set2.store[0]).not.toContain(1);

        set2.remove(1);
        expect(set2.store[1]).not.toContain(1)
      });
    });
  });

});

describe('ResizingIntSet', () => {
  let set3 = new ResizingIntSet(20);

  afterEach(() => {
    let defaultSet = new ResizingIntSet(20)
    set3 = defaultSet;
  })

  describe('ResizingIntSet#has', () => {
    test('should return false unless the number has been inserted', () => {
      let empty = new ResizingIntSet(5);
      expect(empty.has(1)).toBe(false);
    });

    test('should return true if the number has been inserted', () => {
      set3.insert(1);
      expect(set3.has(1)).toBe(true);
    });
  });

  describe('ResizingIntSet#insert', () => {
    test('should be able to insert any numbers', () => {
      const insertFortyNine = set3.insert(49);
      expect(insertFortyNine instanceof Error).toBe(false)

      set3.insert(50)
      expect(set3.has(50)).toBe(true);
    });

    test('should not insert the same item twice', () => {
      for (let i = 0; i < 3; i++) {
        set3.insert(1);
      };

      expect(set3.count).toBe(1);
    });
  });

  describe('ResizingIntSet#remove', () => {
    beforeEach(() => {
      set3.insert(1);
    });

    describe('if the number exists in the set', () => {
      beforeEach(() => {
        set3.remove(1);
      })

      test('should remove a number from the set', () => {
        expect(set3.has(1)).toBe(false);
      });

      test('decrements the count', () => {
        expect(set3.count).toBe(0);
      });
    });

    describe('if number doesn\'t exist in the set', () => {
      test('should do nothing when removing an item that hasn\'t been added', () => {
        expect(set3.count).toBe(1);
        set3.remove(2);
        expect(set3.count).toBe(1);
      });
    });
  });

  describe('ResizingIntSet.count', () => {
    test('should keep track of how many entries the set has', () => {
      expect(set3.count).toBe(0);

      for (let i = 0; i < 5; i++) {
        set3.insert(i);
      }

      expect(set3.count).toBe(5);
    });
  });

  describe('ResizingIntSet#_resize', () => {
    test.skip('should resize when enough items are inserted', () => {

    });

    test('should move elements into the correct bucket after resizing', () => {
      let elements = [];
      for (let i = 10; i <= 30; i++) {
        elements.push(i);
      };
      elements.forEach(int => set3.insert(int));

      elements.forEach(int => {
        expect(set3.has(int)).toBe(true);
      })
    });

    test('should create twice as many buckets', () => {
      let previousNumBuckets = set3._numBuckets();

      for (let i = 0; i < 21; i++) {
        set3.insert(i);
      }

      expect(set3._numBuckets()).toBe(2 * previousNumBuckets);
    });

    test('should not change the count of the set', () => {
      let elements = [];
      for (let i = 10; i <= 30; i++) {
        elements.push(i);
      };
      elements.forEach(int => set3.insert(int));

      expect(set3.count).toBe(elements.length);
    });
  });
});
