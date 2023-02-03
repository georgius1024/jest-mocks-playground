/**
 * Эта функция вычисляет факториал целого числа от 0 до 100
 * https://ru.wikipedia.org/wiki/Факториал
 * @param x
 */
export default function factorial(x) {
  return new Promise((resolve, reject) => {
    if (typeof x !== "number") {
      return reject("X must be number");
    }
    if (x < 0 || x > 100) {
      return reject("X must be in range of 0..100");
    }
    if (Math.ceil(x) !== x) {
      return reject("X must be integer");
    }
    if (x === 0) {
      resolve(1);
    } else if (x === 1) {
      resolve(1);
    } else {
      factorial(x - 1).then((int) => resolve(x * int));
    }
  });
}
