const { MaxIntSet, IntSet, ResizingIntSet } = require('../scripts/p01_int_set');

describe('MaxIntSet', () => {
  const set = new MaxIntSet(50);

  describe('MaxIntSet#has', () => {
    test('should return false unless the number has been inserted', () => {
      expect(set.has(1)).toBe(false);
    });

    test('should return true if the number has been inserted', () => {
      set.insert(1);
      expect(set.has(1)).toBe(true);
    });
  });

  describe('MaxIntSet#insert', () => {
    test('should be able to insert numbers within range', () => {
      const insertFortyNine = () => {
        set.insert(49);
      };

      expect(insertFortyNine).not.toThrowError();
    });

    test('should raise an error when inserting numbers that are out of range', () => {
      const insertFifty = () => {
        set.insert(50);
      };
      const insertTwo = () => {
        set.insert(-1);
      };


      expect(insertFifty).toThrowError('Out of Bounds');
      expect(insertTwo).toThrowError('Out of Bounds');
    });
  });

  describe('MaxIntSet#remove', () => {
    test('should remove a number from the set', () => {
      set.insert(1);
      set.remove(1);
      expect(set.has(1)).not.toBe(true);
    })
  });

});

describe('IntSet', () => {
  const set = new IntSet(20);

  describe('IntSet#has', () => {
    test('should return false unless the number has been inserted', () => {
      expect(set.has(1)).toBe(false);
    });

    test('should return true if the number has been inserted', () => {
      set.insert(1);
      expect(set.has(1)).toBe(true);
    });
  });

  describe('IntSet#insert', () => {
    test('should be able to insert any numbers', () => {
      set.insert(50);
      expect(set.has(50)).toBe(true);
    })
  });

  describe('IntSet#remove', () => {
    test('should remove a number from the set', () => {
      set.insert(1);
      set.remove(1);
      expect(set.has(1)).not.toBe(true);
    })
  });

});

describe.skip('ResizingIntSet', () => {

});
