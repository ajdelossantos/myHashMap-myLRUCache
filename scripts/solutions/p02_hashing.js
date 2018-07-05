Number.prototype.hash = function () {
  return this.toString().hash();
}

// Hashes an array of integers
Array.prototype.hash = function () {
  let result = '';

  this.forEach(el => {
    let hashed = (el.hash() % this.length).toString();
    result += hashed;
  });

  return result.hash();
}

String.prototype.hash = function () {
  let str = this;
  let hash = 5381;

  let i = str.length;
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
  * integers. Since we want the results to be always positive, convert the
  * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

Object.prototype.hash = function () {

  return 0;
}
