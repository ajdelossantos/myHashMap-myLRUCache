require('../scripts/solutions/p02_hashing');

// Returns a new, shuffled array. Fisher-Yates method
function shuffle(array) {
  let result = array.map(el => el);
  let counter = result.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = result[counter];
    result[counter] = result[index];
    result[index] = temp;
  }

  return result;
}

describe('Hashing', () => {
  describe.skip('Number', () => {
    test('should hash to an integer', () => {
      let a = 42;
      expect(typeof a.hash()).toBe("number");
    });

    test('should hash deterministically', () => {
      let a = 42;
      expect(a.hash()).toBe(a.hash());
    });

    test('should produce the same hash for two equivalent numbers', () => {
      let a = 42;
      let b = 42;

      expect(a.hash()).toBe(b.hash());
    });

    test('should produce a different hash for two different numbers', () => {
      let a = 42;
      let b = 0;

      expect(a.hash()).not.toBe(b.hash());
    });
  });

  describe('Array', () => {
    test('should hash to an integer', () => {
      expect(typeof [1, 2, 3].hash()).toBe("number");
    });

    test('should hash deterministically', () => {
      let a = [1, 2, 3];
      expect(a.hash()).toBe(a.hash());
    });

    test('should produce the same hash for two equivalent arrays', () => {
      let a = [1, 2, 3];
      let b = [1, 2, 3];

      expect(a.hash()).toBe(b.hash());
    });

    test('should produce different values for different orderings of an array', () => {
      let array = [];
      for (let i = 0; i < 100; i++) {
        array.push(i);
      }

      let shuffledArray = shuffle(array);

      expect(array.hash()).not.toBe(shuffledArray.hash())
    });

    test('should produce different values for subarrays', () => {
      let a = [1, 2, 3];
      let b = [1, 2, 3, 4];

      expect(a.hash()).not.toBe(b.hash());
    });

    test('should handle empty arrays', () => {
      expect(typeof [].hash()).toBe('number');
    });
  });

  describe('String', () => {
    test('should hash to an integer', () => {
      expect(typeof "JavaScript".hash()).toBe("number");
    });

    test('should hash deterministically', () => {
      let a = "hello";
      expect(a.hash()).toBe(a.hash());
    });

    test('should produce the same hash for two identical strings', () => {
      let a = "string";
      let b = "string";

      expect(a.hash()).toBe(b.hash());
    });

    test('should produce different values for different permutations of a string', () => {
      let charArray = ['a', 'b', 'c', 'd', 'e'];

      let string = charArray.join('');
      let shuffledString = shuffle(charArray).join('');

      // in case of a collusion
      while (shuffledString === string) {
        shuffledString = shuffle(charArray).join('');
      }

      expect(string.hash()).not.toBe(shuffledString.hash());
    });

    test('should produce different values for substrings', () => {
      let a = 'string';
      let b = 'substring';

      expect(a.hash()).not.toBe(b.hash());
    });
  });

  describe('Object', () => {
    test('should hash to an integer', () => {
      expect(typeof Object.hash()).toBe("number");
    });

    test('should hash deterministically', () => {
      let a = { a: "a", b: "b" };
      expect(a.hash()).toBe(a.hash());
    });

    test('should produce the same hash for two identical hashes', () => {
      let a = { a: "a", b: "b" };
      let b = { a: "a", b: "b" };

      expect(a.hash()).toBe(b.hash());
    });

    test('should produce the same value for a reordering of the same hash', () => {
      let a = { a: "a", b: "b" };
      let b = { b: "b", a: "a" };

      expect(a.hash()).toBe(b.hash());
    });

    test('subsets of hashes should hash to different values', () => {
      let a = { a: "a", b: "b" };
      let b = { b: "b" };

      expect(a.hash()).not.toBe(b.hash());
    });
  });
});
