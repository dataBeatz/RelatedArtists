let startTime = Date.now();

for (let i = 0; i < 1000000; i++) {
  let insertCount = 0;
  let uniqueIdArr = [];
  let k = 0;
  while (k < 10) {
    let randomId = Math.floor (Math.random () * Math.floor (100));
    if (randomId === i) {
      continue;
    } else {
      k++;
      uniqueIdArr.push (randomId);
    }
  }
}

let endTime = (Date.now() - startTime) / 1000
console.log('Completed looping in : ' + endTime + ' seconds.');