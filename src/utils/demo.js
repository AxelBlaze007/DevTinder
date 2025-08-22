const arr = [1, 3, 4, 6];

const newArr = arr.map((v) => (v > 5 ? v + 5 : v));

console.log(newArr);

const filArr = arr.filter((v) => v > 5);

console.log(filArr);

const redArr = arr.reduce((acc, current) => {
  acc = current + acc;
  return acc;
});

console.log(redArr);
